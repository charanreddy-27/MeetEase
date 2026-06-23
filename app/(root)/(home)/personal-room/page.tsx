"use client";

import { useSafeUser as useUser } from "@/lib/clerk";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useGetCallById } from "@/hooks/useGetCallById";
import { useToast } from "@/components/ui/use-toast";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const [roomLink, setRoomLink] = useState(meetingLink);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Personal Meeting Room</h1>
          <p className="text-secondary-400 mt-1">Your dedicated space for instant meetings</p>
        </div>
        <Button 
          className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-2"
          onClick={() => window.location.href = '/meeting/new?type=personal'}
        >
          <Image src="/icons/video.svg" width={18} height={18} alt="Start" />
          Start Meeting
        </Button>
      </div>

      <Card className="p-6 bg-secondary-900 border-secondary-800">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Room Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-secondary-400 mb-1 block">Room Link</label>
                <div className="flex">
                  <Input 
                    value={roomLink} 
                    readOnly 
                    className="rounded-r-none bg-secondary-800 border-secondary-700"
                  />
                  <Button 
                    onClick={handleCopy} 
                    className={`rounded-l-none ${copied ? 'bg-green-600' : 'bg-secondary-700'}`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm text-secondary-400 mb-1 block">Room ID</label>
                <Input 
                  value={meetingId} 
                  readOnly 
                  className="bg-secondary-800 border-secondary-700"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Room Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-secondary-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
                    <Image src="/icons/lock.svg" width={20} height={20} alt="Waiting Room" />
                  </div>
                  <div>
                    <p className="font-medium">Waiting Room</p>
                    <p className="text-sm text-secondary-400">Control who enters your meeting</p>
                  </div>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-secondary-700">
                  <span className="absolute size-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-secondary-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
                    <Image src="/icons/password.svg" width={20} height={20} alt="Password" />
                  </div>
                  <div>
                    <p className="font-medium">Room Password</p>
                    <p className="text-sm text-secondary-400">Require password to join</p>
                  </div>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-secondary-700">
                  <span className="absolute size-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-secondary-900 border-secondary-800">
        <h2 className="text-lg font-medium mb-4">Recent Room Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-secondary-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-secondary-700 flex items-center justify-center">
                <span className="text-sm font-medium">TS</span>
              </div>
              <div>
                <p className="font-medium">Team Sync Meeting</p>
                <p className="text-sm text-secondary-400">Yesterday, 2:30 PM • 45 minutes</p>
              </div>
            </div>
            <Link href="/recordings/123" className="text-primary-400 hover:text-primary-300 text-sm">
              View Recording
            </Link>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-secondary-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-secondary-700 flex items-center justify-center">
                <span className="text-sm font-medium">CM</span>
              </div>
              <div>
                <p className="font-medium">Client Meeting</p>
                <p className="text-sm text-secondary-400">Monday, 10:00 AM • 30 minutes</p>
              </div>
            </div>
            <Link href="/recordings/456" className="text-primary-400 hover:text-primary-300 text-sm">
              View Recording
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PersonalRoom;
