'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

// Sample recording data (in a real app, this would come from an API)
const recordingData = {
  '123': {
    id: '123',
    title: 'Weekly Team Standup',
    date: 'June 8, 2023',
    time: '10:00 AM',
    duration: '28:15',
    size: '42 MB',
    participants: [
      { id: '1', name: 'John Doe', avatar: '/images/avatar-1.jpg' },
      { id: '2', name: 'Sarah Johnson', avatar: '/images/avatar-2.jpg' },
      { id: '3', name: 'Mike Chen', avatar: '/images/avatar-3.jpg' },
      { id: '4', name: 'Emily Wong', avatar: '/images/avatar-4.jpg' },
      { id: '5', name: 'David Kim', avatar: '/images/avatar-5.jpg' },
    ],
    transcript: [
      { time: '00:01:15', speaker: 'John Doe', text: 'Let\'s start with updates from the design team.' },
      { time: '00:02:30', speaker: 'Sarah Johnson', text: 'We\'ve completed the wireframes for the new dashboard and are ready for feedback.' },
      { time: '00:04:45', speaker: 'Mike Chen', text: 'The user testing results came back positive, with a few suggestions for improvement.' },
      { time: '00:07:20', speaker: 'Emily Wong', text: 'I\'ve updated the color palette based on the brand guidelines.' },
      { time: '00:10:15', speaker: 'David Kim', text: 'The frontend team is ready to implement the new designs once they\'re finalized.' },
      { time: '00:12:40', speaker: 'John Doe', text: 'Great progress everyone. Let\'s move on to the development updates.' },
      { time: '00:15:10', speaker: 'Mike Chen', text: 'We\'ve resolved the performance issues on the dashboard and the load time is now under 2 seconds.' },
      { time: '00:18:25', speaker: 'David Kim', text: 'The new API endpoints are ready for integration.' },
      { time: '00:21:30', speaker: 'John Doe', text: 'Let\'s wrap up with action items for next week.' },
      { time: '00:24:15', speaker: 'Sarah Johnson', text: 'I\'ll finalize the designs by Wednesday.' },
      { time: '00:25:40', speaker: 'Mike Chen', text: 'We\'ll start the integration on Thursday.' },
      { time: '00:27:10', speaker: 'John Doe', text: 'Great meeting everyone. See you next week!' },
    ],
    summary: 'The team discussed design updates, with Sarah presenting completed wireframes for the new dashboard. User testing results were positive with minor improvement suggestions. Emily updated the color palette according to brand guidelines. The development team resolved performance issues, reducing dashboard load time to under 2 seconds. David completed the new API endpoints. Action items include finalizing designs by Wednesday and starting integration on Thursday.',
    actionItems: [
      { text: 'Sarah to finalize dashboard designs', assignee: 'Sarah Johnson', dueDate: 'Wednesday' },
      { text: 'Mike and David to begin API integration', assignee: 'Mike Chen, David Kim', dueDate: 'Thursday' },
      { text: 'Emily to update design system documentation', assignee: 'Emily Wong', dueDate: 'Friday' },
      { text: 'John to schedule client review meeting', assignee: 'John Doe', dueDate: 'Monday' },
    ]
  },
  '456': {
    id: '456',
    title: 'Client Presentation',
    date: 'June 5, 2023',
    time: '2:00 PM',
    duration: '45:20',
    size: '72 MB',
    participants: [
      { id: '1', name: 'John Doe', avatar: '/images/avatar-1.jpg' },
      { id: '6', name: 'Lisa Taylor', avatar: '/images/avatar-6.jpg' },
      { id: '7', name: 'Robert Brown', avatar: '/images/avatar-7.jpg' },
    ],
    transcript: [
      { time: '00:01:10', speaker: 'John Doe', text: 'Welcome to the presentation on our new product features.' },
      { time: '00:03:25', speaker: 'Lisa Taylor', text: 'We\'re excited to see what you\'ve been working on.' },
      { time: '00:05:40', speaker: 'John Doe', text: 'Let me walk you through the main highlights...' },
      // More transcript items would be here
    ],
    summary: 'John presented the new product features to Lisa and Robert. The clients were impressed with the progress and provided feedback on priority features for the next release.',
    actionItems: [
      { text: 'Send follow-up materials to clients', assignee: 'John Doe', dueDate: 'Tomorrow' },
      { text: 'Schedule technical deep dive', assignee: 'John Doe', dueDate: 'Next week' },
    ]
  }
};

const RecordingDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(true);
  
  // In a real app, you would fetch the recording data from an API
  const recording = recordingData[id as keyof typeof recordingData];
  
  if (!recording) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="size-16 bg-secondary-800 rounded-full mb-4 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Recording Not Found</h2>
        <p className="text-secondary-400 mb-6">The recording you&apos;re looking for doesn&apos;t exist or has been deleted</p>
        <Button 
          onClick={() => router.push('/recordings')}
          className="bg-primary-600 hover:bg-primary-700 text-white"
        >
          Back to Recordings
        </Button>
      </div>
    );
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert duration string to seconds for the progress bar
  const durationParts = recording.duration.split(':');
  const totalDurationSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  
  const progress = (currentTime / totalDurationSeconds) * 100;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.back()}
          className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Button>
        <h1 className="text-2xl font-bold">{recording.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-secondary-900 border-secondary-800 overflow-hidden">
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="size-16 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4H6V20H10V4Z" fill="white" />
                      <path d="M18 4H14V20H18V4Z" fill="white" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4L20 12L6 20V4Z" fill="white" />
                    </svg>
                  )}
                </Button>
              </div>
              
              {/* Video controls overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-white">{formatTime(currentTime)}</span>
                  <div className="relative flex-1 h-1 bg-secondary-700 rounded-full">
                    <div 
                      className="absolute h-full bg-primary-500 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-white">{recording.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33333 14V2M3.33333 2L7.33333 6M3.33333 2L7.33333 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.66667 14V2M8.66667 2L12.6667 6M8.66667 2L12.6667 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:bg-white/10"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.66667 3.33333H4V12.6667H6.66667V3.33333Z" fill="currentColor" />
                          <path d="M12 3.33333H9.33333V12.6667H12V3.33333Z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 3.33333L12.6667 8L4 12.6667V3.33333Z" fill="currentColor" />
                        </svg>
                      )}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6667 14V2M12.6667 2L8.66667 6M12.6667 2L8.66667 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.33333 14V2M7.33333 2L3.33333 6M7.33333 2L3.33333 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00001 3.33333V12.6667M3.33334 8H12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-white">{playbackSpeed}x</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33334 6.66667V9.33333C1.33334 9.33333 1.33334 10.6667 4.00001 10.6667C6.66668 10.6667 6.66668 9.33333 6.66668 9.33333V6.66667M1.33334 6.66667C1.33334 6.66667 1.33334 5.33333 4.00001 5.33333C6.66668 5.33333 6.66668 6.66667 6.66668 6.66667M1.33334 6.66667C1.33334 6.66667 1.33334 8 4.00001 8C6.66668 8 6.66668 6.66667 6.66668 6.66667M9.33334 10V12.6667C9.33334 12.6667 9.33334 14 12 14C14.6667 14 14.6667 12.6667 14.6667 12.6667V10M9.33334 10C9.33334 10 9.33334 8.66667 12 8.66667C14.6667 8.66667 14.6667 10 14.6667 10M9.33334 10C9.33334 10 9.33334 11.3333 12 11.3333C14.6667 11.3333 14.6667 10 14.6667 10M14.6667 6.66667C14.6667 7.40304 14.3857 8.10891 13.8856 8.60901C13.3855 9.10911 12.6797 9.39 12 9.39C11.3203 9.39 10.6145 9.10911 10.1144 8.60901C9.61425 8.10891 9.33334 7.40304 9.33334 6.66667C9.33334 5.93029 9.61425 5.22442 10.1144 4.72432C10.6145 4.22422 11.3203 3.94333 12 3.94333C12.6797 3.94333 13.3855 4.22422 13.8856 4.72432C14.3857 5.22442 14.6667 5.93029 14.6667 6.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-white">CC</span>
                    </div>
                    
                    <div className="flex items-center gap-2 min-w-20">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33333 3.33333L7.33333 12.6667M4 6L4 10M10.6667 4.66667L10.6667 11.3333M1.33333 8L1.33333 8.00667M13.3333 2.66667L13.3333 13.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="w-12">
                        <Slider
                          value={[volume]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setVolume(value[0])}
                          className="h-1"
                        />
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 2H9.33333V4.66667H12.6667L10 8L12.6667 11.3333H9.33333V14H6.66667V11.3333H3.33333L6 8L3.33333 4.66667H6.66667V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {showTranscript && (
              <div className="p-4 max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Transcript</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowTranscript(false)}
                    className="text-secondary-400 hover:text-secondary-300"
                  >
                    Hide
                  </Button>
                </div>
                <div className="space-y-4">
                  {recording.transcript.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="text-xs text-secondary-400 min-w-12">{item.time}</div>
                      <div>
                        <p className="text-sm font-medium">{item.speaker}</p>
                        <p className="text-sm text-secondary-300">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-secondary-900 border-secondary-800 p-4">
            <h3 className="font-medium mb-3">Recording Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-400">Date</span>
                <span>{recording.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Time</span>
                <span>{recording.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Duration</span>
                <span>{recording.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Size</span>
                <span>{recording.size}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-secondary-800">
              <h4 className="text-sm font-medium mb-2">Participants ({recording.participants.length})</h4>
              <div className="flex flex-wrap gap-2">
                {recording.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-2 bg-secondary-800 rounded-full py-1 px-3">
                    <div className="size-5 rounded-full bg-secondary-700"></div>
                    <span className="text-xs">{participant.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <Card className="bg-secondary-900 border-secondary-800 p-4">
            <Tabs defaultValue="summary">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="action-items">Action Items</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-0">
                <p className="text-sm text-secondary-300">{recording.summary}</p>
              </TabsContent>
              
              <TabsContent value="action-items" className="mt-0">
                <div className="space-y-3">
                  {recording.actionItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-secondary-800 p-3 rounded-lg">
                      <div className="size-5 rounded-full border-2 border-primary-500 mt-0.5"></div>
                      <div>
                        <p className="text-sm font-medium">{item.text}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-secondary-400">
                          <span>{item.assignee}</span>
                          <span className="size-1 rounded-full bg-secondary-500"></span>
                          <span>Due: {item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="flex flex-col gap-3">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white w-full">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M13.3334 6H8.00008V2L2.66675 8L8.00008 14V10H13.3334V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Share Recording
            </Button>
            
            <Button variant="outline" className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700 w-full">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M2 4L8 10L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingDetailPage;