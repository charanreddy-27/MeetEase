'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList, Captions } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import LiveTranscription from './LiveTranscription';
import AIAssistant from './AIAssistant';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/70 px-3 py-2 shadow-2xl backdrop-blur-xl">
        <CallControls onLeave={() => router.push(`/`)} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger
              className="cursor-pointer rounded-xl bg-secondary-800/70 px-4 py-2 text-foreground transition-colors hover:bg-secondary-700"
              title="Change layout"
            >
              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
                {index < 2 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          title="Participants"
          className={cn(
            'cursor-pointer rounded-xl px-4 py-2 text-foreground transition-colors',
            showParticipants
              ? 'bg-primary-600 hover:bg-primary-700'
              : 'bg-secondary-800/70 hover:bg-secondary-700',
          )}
        >
          <Users size={20} />
        </button>

        <button
          onClick={() => setShowCaptions((prev) => !prev)}
          title="Live captions"
          className={cn(
            'cursor-pointer rounded-xl px-4 py-2 text-foreground transition-colors',
            showCaptions
              ? 'bg-primary-600 hover:bg-primary-700'
              : 'bg-secondary-800/70 hover:bg-secondary-700',
          )}
        >
          <Captions size={20} />
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>

      {/* AI-native meeting features */}
      <LiveTranscription isOpen={showCaptions} onClose={() => setShowCaptions(false)} />
      <AIAssistant isInMeeting />
    </section>
  );
};

export default MeetingRoom;
