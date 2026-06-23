import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export async function POST(request: Request) {
  try {
    // currentUser() throws if Clerk isn't configured — treat that as "no user"
    // so guests can still mint a token (explore mode).
    const user = await currentUser().catch(() => null);

    // EXPLORE MODE: fall back to a guest identity when nobody is signed in, so
    // unauthenticated visitors can still connect to Stream and explore.
    let userId = user?.id;
    if (!userId) {
      const body = await request.json().catch(() => ({}) as { guestId?: string });
      const guestId = (body as { guestId?: string })?.guestId;
      if (typeof guestId === 'string' && guestId.startsWith('guest-')) {
        userId = guestId;
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User is not authenticated' },
        { status: 401 }
      );
    }

    if (!STREAM_API_KEY || !STREAM_API_SECRET) {
      return NextResponse.json(
        { error: 'Stream API key or secret is missing' },
        { status: 500 }
      );
    }

    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(userId, expirationTime, issuedAt);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error generating Stream token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
