'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSafeUser as useUser } from '@/lib/clerk';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const JoinMeetingPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const [meetingId, setMeetingId] = useState('');
  const [password, setPassword] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [isCheckingMeeting, setIsCheckingMeeting] = useState(false);

  const handleCheckMeeting = async () => {
    if (!meetingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meeting ID",
        variant: "destructive",
      });
      return;
    }

    if (!client) {
      toast({
        title: "Error",
        description: "You must be signed in to join a meeting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCheckingMeeting(true);
      const call = client.call('default', meetingId.trim());
      const response = await call.get();
      
      // Check if meeting requires password
      const hasPassword = response.call.custom?.hasPassword;
      setRequiresPassword(!!hasPassword);
      
      if (!hasPassword) {
        handleJoinMeeting();
      }
    } catch (error) {
      console.error('Error checking meeting:', error);
      toast({
        title: "Error",
        description: "Meeting not found. Please check the ID and try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingMeeting(false);
    }
  };

  const handleJoinMeeting = async () => {
    if (!meetingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meeting ID",
        variant: "destructive",
      });
      return;
    }

    if (!client || !user) {
      toast({
        title: "Error",
        description: "You must be signed in to join a meeting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsJoining(true);
      const call = client.call('default', meetingId.trim());
      
      if (requiresPassword) {
        // Verify password (in a real app, this would be done server-side)
        const response = await call.get();
        if (response.call.custom?.password !== password) {
          toast({
            title: "Error",
            description: "Incorrect password. Please try again.",
            variant: "destructive",
          });
          setIsJoining(false);
          return;
        }
      }
      
      router.push(`/meeting/${meetingId.trim()}`);
    } catch (error) {
      console.error('Error joining meeting:', error);
      toast({
        title: "Error",
        description: "Failed to join meeting. Please check the ID and try again.",
        variant: "destructive",
      });
      setIsJoining(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="size-16 bg-primary-600/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Image src="/icons/join-meeting.svg" width={32} height={32} alt="" />
        </div>
        <h1 className="text-2xl font-bold">Join a Meeting</h1>
        <p className="text-secondary-400 mt-2">Enter the meeting ID to join an existing meeting</p>
      </div>
      
      <Card className="bg-secondary-900 border-secondary-800 p-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="meetingId">Meeting ID</Label>
            <Input
              id="meetingId"
              placeholder="Enter meeting ID"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="bg-secondary-800 border-secondary-700 mt-2"
              disabled={requiresPassword || isJoining}
            />
          </div>
          
          {requiresPassword && (
            <div>
              <Label htmlFor="password">Meeting Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter meeting password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary-800 border-secondary-700 mt-2"
                disabled={isJoining}
              />
            </div>
          )}
          
          <div className="pt-2">
            {!requiresPassword ? (
              <Button 
                onClick={handleCheckMeeting}
                disabled={isCheckingMeeting || !meetingId.trim()}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
              >
                {isCheckingMeeting ? 'Checking...' : 'Continue'}
              </Button>
            ) : (
              <Button 
                onClick={handleJoinMeeting}
                disabled={isJoining || !password.trim()}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
              >
                {isJoining ? 'Joining...' : 'Join Meeting'}
              </Button>
            )}
          </div>
          
          <div className="text-center text-sm text-secondary-400">
            <p>Don&apos;t have a meeting ID? <a href="/meeting/new" className="text-primary-400 hover:underline">Start a new meeting</a></p>
          </div>
        </div>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Recent Meetings</h2>
        <div className="space-y-3">
          <RecentMeetingItem 
            id="123456789"
            title="Weekly Team Standup"
            time="Yesterday, 10:00 AM"
          />
          <RecentMeetingItem 
            id="987654321"
            title="Product Review"
            time="Monday, 2:00 PM"
          />
        </div>
      </div>
    </div>
  );
};

interface RecentMeetingItemProps {
  id: string;
  title: string;
  time: string;
}

const RecentMeetingItem = ({ id, title, time }: RecentMeetingItemProps) => {
  const router = useRouter();
  
  return (
    <div 
      className="flex items-center justify-between p-3 bg-secondary-800 rounded-lg cursor-pointer hover:bg-secondary-750 transition-colors"
      onClick={() => router.push(`/meeting/${id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-secondary-700 flex items-center justify-center">
          <Image src="/icons/video.svg" width={16} height={16} alt="Meeting" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-secondary-400">{time} • ID: {id.substring(0, 6)}...</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        className="text-primary-400 hover:text-primary-300 hover:bg-secondary-700"
      >
        Join
      </Button>
    </div>
  );
};

export default JoinMeetingPage;