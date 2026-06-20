/**
 * Shared AI helpers for the MeetEase copilot.
 *
 * Used by both the client (to call the streaming endpoint) and the server
 * route (prompt construction + types). The Anthropic API key lives only on the
 * server — see app/api/ai/route.ts.
 */

export type AiMode = 'chat' | 'summary' | 'actions' | 'catchup';

export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiRequest {
  mode: AiMode;
  messages: AiChatMessage[];
  /** The live meeting transcript, if any, for grounding. */
  transcript?: string;
}

/** Languages offered for live transcription, mapped to BCP-47 tags. */
export const TRANSCRIPTION_LANGUAGES: { label: string; code: string }[] = [
  { label: 'English', code: 'en-US' },
  { label: 'Spanish', code: 'es-ES' },
  { label: 'French', code: 'fr-FR' },
  { label: 'German', code: 'de-DE' },
  { label: 'Hindi', code: 'hi-IN' },
  { label: 'Telugu', code: 'te-IN' },
  { label: 'Japanese', code: 'ja-JP' },
  { label: 'Chinese', code: 'zh-CN' },
  { label: 'Portuguese', code: 'pt-BR' },
  { label: 'Arabic', code: 'ar-SA' },
];

export const SYSTEM_PROMPT = `You are MeetEase Copilot, a sharp and concise meeting assistant embedded in a video conferencing app.

You help participants by working with the live meeting transcript that is provided to you. Be accurate, brief, and useful.

Guidelines:
- Ground every answer in the transcript. If the transcript is empty or doesn't contain the answer, say so plainly instead of inventing details.
- Prefer tight, skimmable formatting (short paragraphs, bullets) over long prose.
- When summarizing, lead with a one-line TL;DR, then key points and decisions.
- When extracting action items, list each as "- [ ] <task> — <owner if mentioned> (<due date if mentioned>)".
- Never fabricate names, numbers, decisions, or commitments that aren't in the transcript.`;

/** Builds the user-facing instruction for a given quick-action mode. */
export const buildModeInstruction = (mode: AiMode): string => {
  switch (mode) {
    case 'summary':
      return 'Summarize the meeting so far. Start with a one-line TL;DR, then list the key discussion points and any decisions made.';
    case 'actions':
      return 'Extract every action item from the meeting transcript as a checklist. Include the owner and due date when they are mentioned. If there are none, say so.';
    case 'catchup':
      return 'I just joined. In 3-5 sentences, catch me up on what I missed based on the transcript.';
    default:
      return '';
  }
};

/**
 * Calls the streaming /api/ai endpoint and yields text chunks as they arrive.
 * Works whether or not an API key is configured (the server degrades
 * gracefully and streams a helpful fallback).
 */
export async function* streamAi(
  request: AiRequest,
  signal?: AbortSignal,
): AsyncGenerator<string, void, unknown> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal,
  });

  if (!res.ok || !res.body) {
    const message = await res.text().catch(() => '');
    throw new Error(message || `AI request failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true });
  }
}
