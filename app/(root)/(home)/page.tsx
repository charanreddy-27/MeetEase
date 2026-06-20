'use client';

import MeetingTypeList from '@/components/MeetingTypeList';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="pb-16">
      {/* Header section */}
      <section className="relative pt-8 pb-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-600/20 text-primary-400 text-sm">
              <span className="size-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
              Next-Generation Video Conferencing
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">MeetEase</span> <br />
              <span className="text-white">Smarter Meetings.</span>
            </h1>
            <p className="text-base md:text-lg text-secondary-300 max-w-lg">
              Experience seamless collaboration with AI-powered features, real-time tools, and superior performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/meeting/new" className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all text-center font-medium">
                Start New Meeting
              </Link>
              <Link href="/meeting/join" className="px-5 py-2.5 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all group flex items-center justify-center font-medium">
                Join Meeting
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="relative h-[280px] md:h-[360px]">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="bg-secondary-900/80 backdrop-blur-md rounded-2xl p-5 w-full max-w-md border border-secondary-800/50 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-lg text-white">Today</h2>
                  <span className="text-primary-400">{time}</span>
                </div>
                <p className="text-secondary-300 mb-4 text-sm">{date}</p>
                
                <div className="space-y-3">
                  <div className="bg-secondary-800/50 p-3 rounded-lg border border-secondary-700/50 hover:bg-secondary-800/70 transition-colors">
                    <div className="flex justify-between items-center mb-1.5">
                      <h3 className="font-medium">Weekly Team Sync</h3>
                      <span className="text-sm text-primary-400">12:30 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary-400">
                      <span>4 participants</span>
                      <span className="size-1 rounded-full bg-secondary-500"></span>
                      <span>30 min</span>
                    </div>
                  </div>
                  
                  <div className="bg-secondary-800/50 p-3 rounded-lg border border-secondary-700/50 hover:bg-secondary-800/70 transition-colors">
                    <div className="flex justify-between items-center mb-1.5">
                      <h3 className="font-medium">Product Review</h3>
                      <span className="text-sm text-primary-400">3:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary-400">
                      <span>6 participants</span>
                      <span className="size-1 rounded-full bg-secondary-500"></span>
                      <span>45 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meeting options section */}
      <section className="py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Quick Actions</h2>
        <MeetingTypeList />
      </section>
      
      {/* Features section with tabs */}
      <section className="py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-center">Why Choose MeetEase?</h2>
        <p className="text-center text-secondary-400 max-w-2xl mx-auto mb-6 text-sm md:text-base">Discover how our platform transforms your meeting experience with cutting-edge features</p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </TabButton>
          <TabButton 
            active={activeTab === 'ai'} 
            onClick={() => setActiveTab('ai')}
          >
            AI Features
          </TabButton>
          <TabButton 
            active={activeTab === 'collaboration'} 
            onClick={() => setActiveTab('collaboration')}
          >
            Collaboration
          </TabButton>
          <TabButton 
            active={activeTab === 'security'} 
            onClick={() => setActiveTab('security')}
          >
            Security
          </TabButton>
        </div>
        
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <FeatureCard 
                icon="/icons/ai-assistant.svg"
                title="AI Meeting Assistant"
                description="Get real-time meeting summaries, action items, and smart suggestions."
              />
              <FeatureCard 
                icon="/icons/whiteboard.svg"
                title="Collaborative Whiteboard"
                description="Draw and collaborate in real-time with your team."
              />
              <FeatureCard 
                icon="/icons/transcription.svg"
                title="Live Transcription"
                description="Automatic speech-to-text with multiple language support."
              />
              <FeatureCard 
                icon="/icons/background.svg"
                title="Virtual Backgrounds"
                description="Choose from a variety of backgrounds or upload your own."
              />
              <FeatureCard 
                icon="/icons/reactions.svg"
                title="Live Reactions"
                description="Express yourself with animated emoji reactions."
              />
              <FeatureCard 
                icon="/icons/recording.svg"
                title="Cloud Recording"
                description="Record meetings and access them anytime."
              />
            </div>
          )}
          
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="md:col-span-2 bg-gradient-to-r from-secondary-800 to-secondary-900 p-5 rounded-lg border border-secondary-700">
                <h3 className="text-lg font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">AI-Powered Meeting Experience</h3>
                <p className="text-secondary-300 mb-4 text-sm md:text-base">Our advanced AI features transform how you conduct and follow up on meetings.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <AIFeatureItem title="Smart Summaries" description="AI automatically creates concise meeting summaries" />
                  <AIFeatureItem title="Action Item Detection" description="Identifies and tracks tasks mentioned during meetings" />
                  <AIFeatureItem title="Sentiment Analysis" description="Understands meeting mood and participant engagement" />
                  <AIFeatureItem title="Voice Commands" description="Control meetings with natural language instructions" />
                </div>
              </div>
              <FeatureCard 
                icon="/icons/ai-assistant.svg"
                title="AI Meeting Assistant"
                description="Your personal meeting copilot that helps organize, summarize and extract key information."
              />
              <FeatureCard 
                icon="/icons/transcription.svg"
                title="Multilingual Transcription"
                description="Real-time transcription with support for over 30 languages and dialects."
              />
            </div>
          )}
          
          {activeTab === 'collaboration' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FeatureCard 
                icon="/icons/whiteboard.svg"
                title="Interactive Whiteboard"
                description="Collaborate with multiple drawing tools, templates, and real-time editing."
              />
              <FeatureCard 
                icon="/icons/document.svg"
                title="Document Collaboration"
                description="Edit documents together during meetings with version history."
              />
              <FeatureCard 
                icon="/icons/polls.svg"
                title="Live Polls & Surveys"
                description="Gather feedback and make decisions with interactive polls."
              />
              <FeatureCard 
                icon="/icons/breakout.svg"
                title="Breakout Rooms"
                description="Split into smaller groups for focused discussions."
              />
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="md:col-span-2 bg-gradient-to-r from-secondary-800 to-secondary-900 p-5 rounded-lg border border-secondary-700">
                <h3 className="text-lg font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">Enterprise-Grade Security</h3>
                <p className="text-secondary-300 mb-4 text-sm md:text-base">MeetEase provides end-to-end encryption and advanced security features to keep your meetings private and secure.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-xs">End-to-End Encryption</span>
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-xs">SOC 2 Compliant</span>
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-xs">GDPR Compliant</span>
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-xs">HIPAA Compliant</span>
                </div>
              </div>
              <FeatureCard 
                icon="/icons/lock.svg"
                title="Meeting Access Control"
                description="Waiting rooms, password protection, and host controls."
              />
              <FeatureCard 
                icon="/icons/shield.svg"
                title="Data Protection"
                description="Your meeting data is encrypted at rest and in transit."
              />
            </div>
          )}
        </div>
      </section>
      
      {/* Quick access section */}
      <section className="py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAccessCard 
            icon="/icons/room.svg"
            title="Personal Room"
            description="Your dedicated meeting space"
            link="/personal-room"
          />
          <QuickAccessCard 
            icon="/icons/calendar.svg"
            title="Upcoming Meetings"
            description="View your scheduled meetings"
            link="/upcoming"
          />
          <QuickAccessCard 
            icon="/icons/recording.svg"
            title="Recordings"
            description="Access your meeting recordings"
            link="/recordings"
          />
          <QuickAccessCard 
            icon="/icons/settings.svg"
            title="Settings"
            description="Configure your preferences"
            link="/settings"
          />
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-secondary-800/50 p-4 rounded-lg border border-secondary-700/50 hover:bg-secondary-800/80 transition-colors h-full">
      <div className="size-10 rounded-lg bg-primary-600/20 flex items-center justify-center mb-3">
        <Image src={icon} width={20} height={20} alt={title} />
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm text-secondary-300">{description}</p>
    </div>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ children, active, onClick }: TabButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg transition-colors",
        active ? "bg-primary-600 text-white" : "bg-secondary-800 text-secondary-300 hover:bg-secondary-700 hover:text-white"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface AIFeatureItemProps {
  title: string;
  description: string;
}

const AIFeatureItem = ({ title, description }: AIFeatureItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="size-8 rounded-full bg-primary-600/30 flex items-center justify-center mt-0.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-sm text-secondary-300">{description}</p>
      </div>
    </div>
  );
};

interface QuickAccessCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const QuickAccessCard = ({ icon, title, description, link }: QuickAccessCardProps) => {
  return (
    <Link 
      href={link}
      className="bg-secondary-800/50 p-4 rounded-lg border border-secondary-700/50 hover:bg-secondary-800/80 transition-colors flex flex-col items-center text-center"
    >
      <div className="size-12 rounded-full bg-primary-600/20 flex items-center justify-center mb-3">
        <Image src={icon} width={24} height={24} alt={title} />
      </div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-xs text-secondary-400">{description}</p>
    </Link>
  );
};

export default Home;
