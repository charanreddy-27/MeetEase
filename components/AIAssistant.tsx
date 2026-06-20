'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';
import {
  streamAi,
  buildModeInstruction,
  type AiChatMessage,
  type AiMode,
} from '@/lib/ai';
import { useMeetingIntelligence } from '@/providers/MeetingIntelligenceProvider';

type AIAssistantProps = {
  isInMeeting?: boolean;
};

type Message = {
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
};

const quickActions: { label: string; mode: AiMode; display: string }[] = [
  { label: 'Summarize', mode: 'summary', display: '📝 Summarize the meeting' },
  { label: 'Action items', mode: 'actions', display: '✅ List action items' },
  { label: 'Catch me up', mode: 'catchup', display: '⏩ Catch me up' },
];

const WELCOME =
  "👋 Hi! I'm your MeetEase copilot. Turn on Live Transcription and I can summarize the conversation, pull out action items, or answer questions about what was said.";

const AIAssistant = ({ isInMeeting = false }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { getTranscriptText, hasTranscript, isCapturing } =
    useMeetingIntelligence();

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing, isOpen]);

  useEffect(() => () => abortRef.current?.abort(), []);

  /** Runs an AI turn: appends the user bubble, then streams the AI reply. */
  const runTurn = async (displayText: string, instruction: string, mode: AiMode) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMessage: Message = { type: 'user', text: displayText, timestamp: new Date() };

    // Build the API conversation from prior turns + this instruction.
    const history: AiChatMessage[] = messages
      .filter((m) => m.text.trim())
      .map((m) => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }));
    const apiMessages: AiChatMessage[] = [...history, { role: 'user', content: instruction }];

    setMessages((prev) => [...prev, userMessage, { type: 'ai', text: '', timestamp: new Date() }]);
    setIsProcessing(true);

    try {
      let acc = '';
      for await (const chunk of streamAi(
        { mode, messages: apiMessages, transcript: getTranscriptText() },
        controller.signal,
      )) {
        acc += chunk;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { type: 'ai', text: acc, timestamp: new Date() };
          return next;
        });
      }
      if (!acc.trim()) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            type: 'ai',
            text: 'I didn’t get a response. Please try again.',
            timestamp: new Date(),
          };
          return next;
        });
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          type: 'ai',
          text: '⚠️ Something went wrong reaching the assistant. Please try again.',
          timestamp: new Date(),
        };
        return next;
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isProcessing) return;
    setQuery('');
    runTurn(trimmed, trimmed, 'chat');
  };

  const handleQuickAction = (action: (typeof quickActions)[number]) => {
    if (isProcessing) return;
    runTurn(action.display, buildModeInstruction(action.mode), action.mode);
  };

  const toggleAssistant = () => {
    setIsOpen((open) => !open);
    if (!isOpen && messages.length === 0) {
      setMessages([{ type: 'ai', text: WELCOME, timestamp: new Date() }]);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col items-end',
        isInMeeting && 'bottom-24',
      )}
    >
      {isOpen && (
        <Card className="animate-scale mb-4 flex max-h-[520px] w-[360px] flex-col overflow-hidden border border-secondary-800 bg-secondary-900">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary-600 to-accent-600 p-3">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-white/20">
                <Image src="/icons/ai-assistant.svg" width={16} height={16} alt="AI" />
              </div>
              <h3 className="font-semibold text-white">AI Copilot</h3>
            </div>
            <span
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium',
                isCapturing ? 'bg-white/20 text-white' : 'bg-black/20 text-white/80',
              )}
              title={hasTranscript ? 'Working from the live transcript' : 'No transcript yet'}
            >
              {isCapturing && <span className="size-1.5 animate-pulse rounded-full bg-success-400" />}
              {isCapturing ? 'Listening' : hasTranscript ? 'Transcript ready' : 'No transcript'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full bg-white/10 hover:bg-white/20"
              onClick={toggleAssistant}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>

          {/* Messages */}
          <div className="flex max-h-[300px] flex-1 flex-col gap-4 overflow-y-auto p-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  'relative max-w-[90%] whitespace-pre-wrap rounded-xl p-3 text-sm',
                  message.type === 'user'
                    ? 'self-end bg-primary-600 text-white'
                    : 'self-start bg-secondary-800 text-white',
                )}
              >
                <p>{message.text || '…'}</p>
                <div className="absolute -bottom-2 right-2 text-[10px] text-secondary-400">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex items-center gap-2 self-start rounded-xl bg-secondary-800 p-3">
                <div className="flex gap-1">
                  <span className="size-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '0ms' }} />
                  <span className="size-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '150ms' }} />
                  <span className="size-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2 border-t border-secondary-800 px-3 pt-3">
            {quickActions.map((action) => (
              <button
                key={action.mode}
                onClick={() => handleQuickAction(action)}
                disabled={isProcessing}
                className="rounded-full border border-secondary-700 px-3 py-1 text-xs text-secondary-200 transition-colors hover:bg-secondary-800 disabled:opacity-50"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2 p-3">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask about the meeting…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-secondary-700 bg-secondary-800"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isProcessing || !query.trim()}
              className="bg-primary-600 text-white hover:bg-primary-700"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 8L1 15L3 8L1 1L15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </form>
        </Card>
      )}

      <Button
        onClick={toggleAssistant}
        className={cn(
          'flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-accent-600 p-0 transition-all hover:shadow-glow',
          isOpen && 'bg-secondary-800',
        )}
      >
        <Image src="/icons/ai-assistant.svg" width={28} height={28} alt="AI Assistant" />
      </Button>
    </div>
  );
};

export default AIAssistant;
