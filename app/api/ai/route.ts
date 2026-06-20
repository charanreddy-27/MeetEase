import { NextRequest } from 'next/server';
import {
  SYSTEM_PROMPT,
  type AiMode,
  type AiChatMessage,
} from '@/lib/ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AI_MODEL = process.env.AI_MODEL || 'claude-sonnet-4-6';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

interface AiRouteBody {
  mode?: AiMode;
  messages?: AiChatMessage[];
  transcript?: string;
}

/** Wraps a string into a one-shot text stream (used for fallbacks/errors). */
const textStream = (text: string) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });

const streamResponse = (stream: ReadableStream<Uint8Array>) =>
  new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  });

/**
 * When no API key is configured we still try to be useful: produce a simple
 * local result from the transcript so the feature degrades gracefully instead
 * of dying. Honest about the fact that full AI is not enabled.
 */
function localFallback(mode: AiMode, transcript?: string): string {
  const banner =
    '⚠️ AI is running in offline mode (no ANTHROPIC_API_KEY set). ' +
    'Here is a basic local result — add a key to enable full Claude-powered answers.\n\n';

  if (!transcript?.trim()) {
    return (
      banner +
      "There's no transcript yet. Turn on Live Transcription and start speaking, " +
      'then ask me to summarize or extract action items.'
    );
  }

  const lines = transcript
    .split('\n')
    .map((l) => l.replace(/^\[[^\]]*\]\s*/, '').trim())
    .filter(Boolean);

  if (mode === 'actions') {
    const cues = /\b(will|need to|should|let's|action|todo|follow up|by (monday|tuesday|wednesday|thursday|friday|next week|tomorrow))\b/i;
    const items = lines.filter((l) => cues.test(l)).slice(0, 8);
    if (items.length === 0) return banner + 'No clear action items detected in the transcript yet.';
    return banner + 'Possible action items:\n' + items.map((i) => `- [ ] ${i}`).join('\n');
  }

  // summary / catchup / chat
  const points = lines.slice(-8);
  return (
    banner +
    `TL;DR: ${lines.length} lines captured so far.\n\nRecent discussion:\n` +
    points.map((p) => `• ${p}`).join('\n')
  );
}

/** Parses Anthropic's SSE stream and re-emits only the text deltas. */
function parseAnthropicStream(
  upstream: ReadableStream<Uint8Array>,
): ReadableStream<Uint8Array> {
  const reader = upstream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const json = JSON.parse(data);
          if (
            json.type === 'content_block_delta' &&
            json.delta?.type === 'text_delta' &&
            json.delta.text
          ) {
            controller.enqueue(encoder.encode(json.delta.text));
          }
        } catch {
          /* partial/non-JSON line — skip */
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });
}

export async function POST(req: NextRequest) {
  // EXPLORE MODE: the auth check is disabled so guests can use the copilot
  // without signing in. To re-enable, restore:
  //   import { auth } from '@clerk/nextjs/server';
  //   const { userId } = auth();
  //   if (!userId) return new Response('Unauthorized', { status: 401 });

  let body: AiRouteBody;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const mode: AiMode = body.mode ?? 'chat';
  const transcript = body.transcript?.trim();
  const messages = (body.messages ?? []).filter(
    (m) => m && (m.role === 'user' || m.role === 'assistant') && m.content?.trim(),
  );

  if (messages.length === 0) {
    return new Response('No messages provided', { status: 400 });
  }

  // No key → graceful local fallback (still streamed for a uniform client).
  if (!ANTHROPIC_API_KEY) {
    return streamResponse(textStream(localFallback(mode, transcript)));
  }

  const system = transcript
    ? `${SYSTEM_PROMPT}\n\n--- LIVE MEETING TRANSCRIPT ---\n${transcript}\n--- END TRANSCRIPT ---`
    : `${SYSTEM_PROMPT}\n\n(No transcript has been captured yet.)`;

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        max_tokens: 1024,
        system,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => '');
      console.error('Anthropic API error:', upstream.status, detail);
      return streamResponse(
        textStream(
          '⚠️ The AI service returned an error. Please verify your ANTHROPIC_API_KEY and try again.',
        ),
      );
    }

    return streamResponse(parseAnthropicStream(upstream.body));
  } catch (error) {
    console.error('AI route error:', error);
    return streamResponse(
      textStream('⚠️ Could not reach the AI service. Check your connection and try again.'),
    );
  }
}
