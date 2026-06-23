'use client';

import { useState } from 'react';
import { useSafeUser as useUser } from '@/lib/clerk';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const { user } = useUser();
  const { toast } = useToast();
  
  const [displayName, setDisplayName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '');
  const [isLoading, setIsLoading] = useState(false);
  
  // Meeting preferences
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [muteOnEntry, setMuteOnEntry] = useState(true);
  const [videoOnJoin, setVideoOnJoin] = useState(false);
  const [recordMeetings, setRecordMeetings] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(true);
  const [recordingNotifications, setRecordingNotifications] = useState(true);
  
  // Audio/Video settings
  const [preferredCamera, setPreferredCamera] = useState('default');
  const [preferredMicrophone, setPreferredMicrophone] = useState('default');
  const [preferredSpeakers, setPreferredSpeakers] = useState('default');
  const [noiseSuppressionEnabled, setNoiseSuppressionEnabled] = useState(true);
  const [echoSuppressionEnabled, setEchoSuppressionEnabled] = useState(true);
  
  // Appearance settings
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [timeFormat, setTimeFormat] = useState('12h');
  
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you would update the user profile here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSavePreferences = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you would update the user preferences here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Preferences saved",
        description: "Your meeting preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="audio-video">Audio/Video</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center gap-3">
                <div className="size-24 rounded-full bg-secondary-800 relative">
                  {user?.imageUrl && (
                    <Image 
                      src={user.imageUrl} 
                      alt="Profile" 
                      fill 
                      className="rounded-full object-cover"
                    />
                  )}
                  <button className="absolute bottom-0 right-0 size-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4.00001V12C2 12.7364 2.59695 13.3333 3.33333 13.3333H12.6667C13.403 13.3333 14 12.7364 14 12V4.00001C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.33334 6.66667C6.06973 6.66667 6.66668 6.06971 6.66668 5.33333C6.66668 4.59695 6.06973 4 5.33334 4C4.59696 4 4 4.59695 4 5.33333C4 6.06971 4.59696 6.66667 5.33334 6.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.0001 9.99999L10.6667 6.66666L3.33342 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
                >
                  Change Photo
                </Button>
              </div>
              
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="bg-secondary-800 border-secondary-700 mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary-800 border-secondary-700 mt-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-secondary-800">
              <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-secondary-400">Receive meeting invites and updates via email</p>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Meeting Reminders</p>
                    <p className="text-sm text-secondary-400">Get notified before your scheduled meetings</p>
                  </div>
                  <Switch 
                    checked={meetingReminders}
                    onCheckedChange={setMeetingReminders}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recording Notifications</p>
                    <p className="text-sm text-secondary-400">Get notified when recordings are ready</p>
                  </div>
                  <Switch 
                    checked={recordingNotifications}
                    onCheckedChange={setRecordingNotifications}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="meetings" className="space-y-6">
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <h3 className="text-lg font-medium mb-4">Meeting Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Waiting Room</p>
                  <p className="text-sm text-secondary-400">Participants must be admitted to join meetings</p>
                </div>
                <Switch 
                  checked={waitingRoom}
                  onCheckedChange={setWaitingRoom}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mute Participants on Entry</p>
                  <p className="text-sm text-secondary-400">Automatically mute participants when they join</p>
                </div>
                <Switch 
                  checked={muteOnEntry}
                  onCheckedChange={setMuteOnEntry}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Start Video When Joining</p>
                  <p className="text-sm text-secondary-400">Automatically turn on your camera when joining meetings</p>
                </div>
                <Switch 
                  checked={videoOnJoin}
                  onCheckedChange={setVideoOnJoin}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Record All Meetings</p>
                  <p className="text-sm text-secondary-400">Automatically record meetings you host</p>
                </div>
                <Switch 
                  checked={recordMeetings}
                  onCheckedChange={setRecordMeetings}
                />
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-secondary-800">
              <h3 className="text-lg font-medium mb-4">Personal Meeting ID</h3>
              
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <Input
                  value={user?.id || ''}
                  readOnly
                  className="bg-secondary-800 border-secondary-700"
                />
                <Button 
                  variant="outline"
                  className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
                >
                  Copy
                </Button>
              </div>
              <p className="text-sm text-secondary-400 mt-2">Your personal meeting ID is a permanent meeting link that you can use at any time.</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="audio-video" className="space-y-6">
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <h3 className="text-lg font-medium mb-4">Audio/Video Settings</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="camera">Camera</Label>
                <Select value={preferredCamera} onValueChange={setPreferredCamera}>
                  <SelectTrigger className="bg-secondary-800 border-secondary-700 mt-2">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary-800 border-secondary-700">
                    <SelectItem value="default">Default Camera</SelectItem>
                    <SelectItem value="camera1">FaceTime HD Camera</SelectItem>
                    <SelectItem value="camera2">External Webcam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="microphone">Microphone</Label>
                <Select value={preferredMicrophone} onValueChange={setPreferredMicrophone}>
                  <SelectTrigger className="bg-secondary-800 border-secondary-700 mt-2">
                    <SelectValue placeholder="Select microphone" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary-800 border-secondary-700">
                    <SelectItem value="default">Default Microphone</SelectItem>
                    <SelectItem value="mic1">Built-in Microphone</SelectItem>
                    <SelectItem value="mic2">Headset Microphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="speakers">Speakers</Label>
                <Select value={preferredSpeakers} onValueChange={setPreferredSpeakers}>
                  <SelectTrigger className="bg-secondary-800 border-secondary-700 mt-2">
                    <SelectValue placeholder="Select speakers" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary-800 border-secondary-700">
                    <SelectItem value="default">Default Speakers</SelectItem>
                    <SelectItem value="speaker1">Built-in Speakers</SelectItem>
                    <SelectItem value="speaker2">External Speakers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-secondary-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Noise Suppression</p>
                    <p className="text-sm text-secondary-400">Reduce background noise during meetings</p>
                  </div>
                  <Switch 
                    checked={noiseSuppressionEnabled}
                    onCheckedChange={setNoiseSuppressionEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Echo Cancellation</p>
                    <p className="text-sm text-secondary-400">Prevent audio echo during meetings</p>
                  </div>
                  <Switch 
                    checked={echoSuppressionEnabled}
                    onCheckedChange={setEchoSuppressionEnabled}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <h3 className="text-lg font-medium mb-4">Appearance Settings</h3>
            
            <div className="space-y-6">
              <div>
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div 
                    className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
                      theme === 'dark' ? 'bg-primary-600/20 border-primary-500' : 'bg-secondary-800 border-secondary-700'
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="size-12 rounded-lg bg-secondary-900 mb-3"></div>
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
                      theme === 'light' ? 'bg-primary-600/20 border-primary-500' : 'bg-secondary-800 border-secondary-700'
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="size-12 rounded-lg bg-white mb-3"></div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
                      theme === 'system' ? 'bg-primary-600/20 border-primary-500' : 'bg-secondary-800 border-secondary-700'
                    }`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="size-12 rounded-lg bg-gradient-to-r from-secondary-900 to-white mb-3"></div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-secondary-800 border-secondary-700 mt-2">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary-800 border-secondary-700">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Time Format</Label>
                <div className="flex gap-4 mt-2">
                  <div 
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                      timeFormat === '12h' ? 'bg-primary-600/20 border-primary-500' : 'bg-secondary-800 border-secondary-700'
                    }`}
                    onClick={() => setTimeFormat('12h')}
                  >
                    <div className={`size-4 rounded-full ${timeFormat === '12h' ? 'bg-primary-500' : 'bg-secondary-700'}`}></div>
                    <span>12-hour (1:30 PM)</span>
                  </div>
                  
                  <div 
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                      timeFormat === '24h' ? 'bg-primary-600/20 border-primary-500' : 'bg-secondary-800 border-secondary-700'
                    }`}
                    onClick={() => setTimeFormat('24h')}
                  >
                    <div className={`size-4 rounded-full ${timeFormat === '24h' ? 'bg-primary-500' : 'bg-secondary-700'}`}></div>
                    <span>24-hour (13:30)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;