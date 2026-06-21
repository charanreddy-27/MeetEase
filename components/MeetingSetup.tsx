'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-4 text-foreground">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          Ready to <span className="gradient-text">join?</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Check your camera and mic before you go in.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
        <VideoPreview />
      </div>

      <div className="flex h-16 items-center justify-center gap-4">
        <label className="flex cursor-pointer items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
            className="size-4 accent-primary-600"
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <Button variant="gradient" size="lg" onClick={() => { call.join(); setIsSetupComplete(true); }}>
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
