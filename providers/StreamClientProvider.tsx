'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useSafeUser as useUser } from '@/lib/clerk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

interface StreamClientProviderProps {
  children: ReactNode;
}

/**
 * Stable guest identity so unauthenticated visitors can still explore the app
 * (and use video, once Stream keys are configured) without signing in.
 */
const getGuestId = () => {
  if (typeof window === 'undefined') return 'guest';
  const KEY = 'meetease-guest-id';
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = `guest-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(KEY, id);
  }
  return id;
};

const StreamClientProvider = ({ children }: StreamClientProviderProps) => {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    // Wait for Clerk to resolve whether someone is signed in.
    if (!isLoaded) return;
    // No Stream key configured → skip video init; the app stays explorable.
    if (!apiKey) return;

    const isGuest = !user;
    const guestId = getGuestId();
    const streamUser = isGuest
      ? { id: guestId, name: 'Guest' }
      : { id: user.id, name: user.username || user.id, image: user.imageUrl };

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: async () => {
        try {
          const response = await fetch('/api/get-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Guests send their generated id so the server can mint a token.
            body: JSON.stringify(isGuest ? { guestId } : {}),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch token');
          }

          const data = await response.json();
          return data.token;
        } catch (error) {
          console.error('Error fetching token:', error);
          throw error;
        }
      },
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser().catch((error) => {
        console.error('Error disconnecting user:', error);
      });
      setVideoClient(undefined);
    };
  }, [user, isLoaded]);

  // EXPLORE MODE: never block the whole app on auth or Stream init. Render the
  // app immediately; once a video client is ready (real user or guest, with
  // Stream keys configured) we transparently wrap children with <StreamVideo>.
  if (!videoClient) return <>{children}</>;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
