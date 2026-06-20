'use client';

/**
 * MeetingIntelligenceProvider
 * ---------------------------
 * A single source of truth for everything the meeting "understands": the live
 * transcript captured by LiveTranscription and consumed by the AI copilot.
 *
 * This is what turns two previously-disconnected, faked components into one
 * real pipeline:  microphone → transcript → Claude.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  /** Epoch ms when the utterance was finalized. */
  at: number;
}

interface MeetingIntelligenceValue {
  entries: TranscriptEntry[];
  /** Whether transcription is currently capturing audio. */
  isCapturing: boolean;
  setIsCapturing: (capturing: boolean) => void;
  addEntry: (entry: Omit<TranscriptEntry, 'id' | 'at'> & { at?: number }) => void;
  clear: () => void;
  /** The full transcript as plain text, ready to feed an LLM. */
  getTranscriptText: () => string;
  hasTranscript: boolean;
}

const MeetingIntelligenceContext = createContext<MeetingIntelligenceValue | null>(
  null,
);

export const MeetingIntelligenceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const addEntry = useCallback<MeetingIntelligenceValue['addEntry']>((entry) => {
    const text = entry.text.trim();
    if (!text) return;
    setEntries((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        speaker: entry.speaker,
        text,
        at: entry.at ?? Date.now(),
      },
    ]);
  }, []);

  const clear = useCallback(() => setEntries([]), []);

  const getTranscriptText = useCallback(
    () =>
      entries
        .map((e) => {
          const time = new Date(e.at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          return `[${time}] ${e.speaker}: ${e.text}`;
        })
        .join('\n'),
    [entries],
  );

  const value = useMemo<MeetingIntelligenceValue>(
    () => ({
      entries,
      isCapturing,
      setIsCapturing,
      addEntry,
      clear,
      getTranscriptText,
      hasTranscript: entries.length > 0,
    }),
    [entries, isCapturing, addEntry, clear, getTranscriptText],
  );

  return (
    <MeetingIntelligenceContext.Provider value={value}>
      {children}
    </MeetingIntelligenceContext.Provider>
  );
};

export const useMeetingIntelligence = () => {
  const ctx = useContext(MeetingIntelligenceContext);
  if (!ctx) {
    throw new Error(
      'useMeetingIntelligence must be used within a MeetingIntelligenceProvider',
    );
  }
  return ctx;
};
