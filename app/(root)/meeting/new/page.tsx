'use client';

import { useState } from 'react';
import { useSafeUser as useUser } from '@/lib/clerk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const NewMeetingPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const meetingType = searchParams.get('type');

  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [selectedType, setSelectedType] = useState(meetingType || 'instant');
  const [enableWaitingRoom, setEnableWaitingRoom] = useState(true);
  const [requirePassword, setRequirePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateMeeting = async () => {
    if (!client || !user) {
      toast({
        title: "Error",
        description: "You must be signed in to create a meeting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      const meetingId = selectedType === 'personal' ? user.id : uuidv4();
      const call = client.call('default', meetingId);
      
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            title: meetingTitle || 'Untitled Meeting',
            description: meetingDescription,
            waitingRoom: enableWaitingRoom,
            hasPassword: requirePassword,
            password: requirePassword ? password : '',
          }
        }
      });

      router.push(`/meeting/${meetingId}`);
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast({
        title: "Error",
        description: "Failed to create meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Meeting</h1>
      
      <Card className="bg-secondary-900 border-secondary-800 p-6 mb-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              placeholder="Enter meeting title"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="bg-secondary-800 border-secondary-700 mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Enter meeting description"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              className="bg-secondary-800 border-secondary-700 mt-2"
            />
          </div>
          
          <div>
            <Label>Meeting Type</Label>
            <RadioGroup 
              value={selectedType} 
              onValueChange={setSelectedType}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
            >
              <MeetingTypeOption 
                value="instant" 
                title="Instant Meeting" 
                description="Start right now"
                icon="/icons/video.svg"
                selectedValue={selectedType}
              />
              <MeetingTypeOption 
                value="scheduled" 
                title="Schedule Meeting" 
                description="Plan for later"
                icon="/icons/calendar.svg"
                selectedValue={selectedType}
              />
              <MeetingTypeOption 
                value="personal" 
                title="Personal Room" 
                description="Use your personal ID"
                icon="/icons/user.svg"
                selectedValue={selectedType}
              />
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <Label>Meeting Options</Label>
            
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
              <Switch 
                checked={enableWaitingRoom}
                onCheckedChange={setEnableWaitingRoom}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
                  <Image src="/icons/password.svg" width={20} height={20} alt="Password" />
                </div>
                <div>
                  <p className="font-medium">Require Password</p>
                  <p className="text-sm text-secondary-400">Add password protection</p>
                </div>
              </div>
              <Switch 
                checked={requirePassword}
                onCheckedChange={setRequirePassword}
              />
            </div>
            
            {requirePassword && (
              <div className="p-4 bg-secondary-800 rounded-lg">
                <Label htmlFor="password">Meeting Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary-700 border-secondary-600 mt-2"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleCreateMeeting}
          disabled={isCreating}
          className="bg-primary-600 hover:bg-primary-700 text-white"
        >
          {isCreating ? 'Creating...' : 'Create Meeting'}
        </Button>
      </div>
    </div>
  );
};

interface MeetingTypeOptionProps {
  value: string;
  title: string;
  description: string;
  icon: string;
  selectedValue: string;
}

const MeetingTypeOption = ({ value, title, description, icon, selectedValue }: MeetingTypeOptionProps) => {
  const isSelected = selectedValue === value;
  
  return (
    <label className={`relative flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all ${
      isSelected ? 'bg-primary-600/20 border-primary-500' : 'bg-secondary-800 border-secondary-700 hover:bg-secondary-750'
    }`}>
      <RadioGroupItem value={value} id={value} className="sr-only" />
      <div className="size-12 rounded-full bg-secondary-700 flex items-center justify-center mb-3">
        <Image src={icon} width={24} height={24} alt={title} />
      </div>
      <h3 className="font-medium text-center">{title}</h3>
      <p className="text-xs text-secondary-400 text-center mt-1">{description}</p>
      
      {isSelected && (
        <div className="absolute top-2 right-2 size-4 rounded-full bg-primary-500 flex items-center justify-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </label>
  );
};

export default NewMeetingPage;