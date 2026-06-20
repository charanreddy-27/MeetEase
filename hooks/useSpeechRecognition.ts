'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSpeechRecognitionOptions {
  /** BCP-47 language tag, e.g. "en-US". */
  lang?: string;
  /** Called whenever an utterance is finalized. */
  onFinalResult?: (text: string) => void;
}

interface UseSpeechRecognitionReturn {
  /** Whether the current browser supports the Web Speech API. */
  isSupported: boolean;
  /** Whether recognition is actively listening. */
  isListening: boolean;
  /** The not-yet-finalized text currently being spoken. */
  interimText: string;
  error: string | null;
  start: () => void;
  stop: () => void;
}

const getSpeechRecognition = (): typeof SpeechRecognition | undefined => {
  if (typeof window === 'undefined') return undefined;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
};

/**
 * Real, key-free speech-to-text powered by the browser's Web Speech API
 * (Chrome/Edge/Safari). Replaces the old hard-coded transcript simulation.
 */
export const useSpeechRecognition = ({
  lang = 'en-US',
  onFinalResult,
}: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const shouldListenRef = useRef(false);
  // Keep the latest callback without re-creating the recognition instance.
  const onFinalRef = useRef(onFinalResult);
  onFinalRef.current = onFinalResult;

  useEffect(() => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? '';
        if (result.isFinal) {
          const finalText = transcript.trim();
          if (finalText) onFinalRef.current?.(finalText);
        } else {
          interim += transcript;
        }
      }
      setInterimText(interim);
    };

    recognition.onerror = (event) => {
      // "no-speech" and "aborted" are routine; don't surface them as errors.
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone access was blocked. Please allow it to transcribe.');
        shouldListenRef.current = false;
        setIsListening(false);
        return;
      }
      setError(event.message || `Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setInterimText('');
      // The API stops on its own periodically; restart while we still want it.
      if (shouldListenRef.current) {
        try {
          recognition.start();
        } catch {
          /* already starting — ignore */
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldListenRef.current = false;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      try {
        recognition.stop();
      } catch {
        /* noop */
      }
      recognitionRef.current = null;
    };
  }, [lang]);

  const start = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    setError(null);
    shouldListenRef.current = true;
    try {
      recognition.start();
      setIsListening(true);
    } catch {
      /* start() throws if already started — safe to ignore */
    }
  }, []);

  const stop = useCallback(() => {
    const recognition = recognitionRef.current;
    shouldListenRef.current = false;
    setIsListening(false);
    setInterimText('');
    try {
      recognition?.stop();
    } catch {
      /* noop */
    }
  }, []);

  return { isSupported, isListening, interimText, error, start, stop };
};
