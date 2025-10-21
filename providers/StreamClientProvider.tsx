'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

interface StreamClientProviderProps {
  children: ReactNode;
}

const StreamClientProvider = ({ children }: StreamClientProviderProps) => {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) {
      console.error('Stream API key is missing');
      return;
    }

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider: async () => {
        try {
          const response = await fetch('/api/get-token', {
            method: 'POST',
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

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
