'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { TRANSCRIPTION_LANGUAGES } from '@/lib/ai';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useMeetingIntelligence } from '@/providers/MeetingIntelligenceProvider';

interface LiveTranscriptionProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Real-time transcription powered by the browser's Web Speech API.
 * Captured speech is written to the shared MeetingIntelligence context so the
 * AI copilot can summarize / answer questions about the actual conversation.
 */
const LiveTranscription = ({ isOpen, onClose }: LiveTranscriptionProps) => {
  const [isActive, setIsActive] = useState(true);
  const [langCode, setLangCode] = useState('en-US');
  const { entries, addEntry, setIsCapturing, getTranscriptText } =
    useMeetingIntelligence();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isSupported, isListening, interimText, error, start, stop } =
    useSpeechRecognition({
      lang: langCode,
      onFinalResult: (text) => addEntry({ speaker: 'You', text }),
    });

  // Start/stop recognition based on panel + toggle state.
  useEffect(() => {
    if (isOpen && isActive && isSupported) {
      start();
    } else {
      stop();
    }
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isActive, isSupported, langCode]);

  // Mirror capture state into the shared context (drives AI "listening" badge).
  useEffect(() => {
    setIsCapturing(isListening);
  }, [isListening, setIsCapturing]);

  // Auto-scroll to the newest line.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [entries, interimText]);

  const hasContent = entries.length > 0 || interimText.length > 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getTranscriptText());
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleDownload = () => {
    const blob = new Blob([getTranscriptText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meetease-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusLabel = useMemo(() => {
    if (!isSupported) return 'Unsupported';
    if (!isActive) return 'Paused';
    return isListening ? 'Listening' : 'Starting…';
  }, [isSupported, isActive, isListening]);

  if (!isOpen) return null;

  return (
    <div className="animate-scale fixed bottom-24 right-6 z-40 flex max-h-[520px] w-[400px] flex-col overflow-hidden rounded-2xl border border-secondary-800 bg-secondary-900 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-primary-600 to-accent-600 p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white">Live Transcription</h3>
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium',
              isListening ? 'bg-white/20 text-white' : 'bg-black/20 text-white/80',
            )}
          >
            {isListening && (
              <span className="size-1.5 animate-pulse rounded-full bg-success-400" />
            )}
            {statusLabel}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              disabled={!isSupported}
              className="data-[state=checked]:bg-success-500"
            />
            <Label className="text-sm text-white">{isActive ? 'On' : 'Off'}</Label>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full bg-white/10 hover:bg-white/20"
            onClick={onClose}
          >
            <Image src="/icons/close.svg" width={16} height={16} alt="Close" />
          </Button>
        </div>
      </div>

      {/* Language selector */}
      <div className="flex items-center justify-between bg-secondary-800/60 px-4 py-2">
        <span className="text-sm text-secondary-300">Language</span>
        <select
          value={langCode}
          onChange={(e) => setLangCode(e.target.value)}
          className="rounded-md border-none bg-secondary-700 px-2 py-1 text-sm text-white focus:ring-1 focus:ring-primary-500"
        >
          {TRANSCRIPTION_LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Body */}
      <div ref={scrollRef} className="flex max-h-[300px] flex-1 flex-col gap-4 overflow-y-auto p-4">
        {!isSupported ? (
          <div className="py-8 text-center text-sm text-secondary-400">
            <p className="mb-1 font-medium text-secondary-200">
              Live transcription isn’t supported in this browser.
            </p>
            <p>Try Google Chrome or Microsoft Edge for real-time speech-to-text.</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-sm text-danger-300">{error}</div>
        ) : !hasContent ? (
          <div className="py-8 text-center text-sm text-secondary-400">
            <p>{isActive ? 'Listening… start speaking and your words will appear here.' : 'Transcription is paused.'}</p>
          </div>
        ) : (
          <>
            {entries.map((entry) => (
              <div key={entry.id} className="flex gap-3">
                <Image
                  src="/icons/avatar.svg"
                  width={32}
                  height={32}
                  alt={entry.speaker}
                  className="size-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-white">{entry.speaker}</span>
                    <span className="text-xs text-secondary-400">
                      {new Date(entry.at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-secondary-200">{entry.text}</p>
                </div>
              </div>
            ))}
            {interimText && (
              <p className="pl-11 italic text-secondary-400">{interimText}…</p>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between border-t border-secondary-800 p-4">
        <Button
          variant="outline"
          size="sm"
          disabled={entries.length === 0}
          onClick={handleDownload}
          className="border-secondary-700 text-xs hover:bg-secondary-800"
        >
          <Image src="/icons/download.svg" width={14} height={14} alt="" className="mr-1" />
          Save Transcript
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={entries.length === 0}
          onClick={handleCopy}
          className="border-secondary-700 text-xs hover:bg-secondary-800"
        >
          <Image src="/icons/copy.svg" width={14} height={14} alt="" className="mr-1" />
          Copy All
        </Button>
      </div>
    </div>
  );
};

export default LiveTranscription;
