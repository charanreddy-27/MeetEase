# 🎥 MeetSync - Next-Generation Video Conferencing Platform

![MeetSync Banner](public/images/banner.png)

## 📋 Overview

MeetSync is a modern, feature-rich video conferencing application built as a comprehensive Zoom clone with enhanced AI capabilities. It's a full-stack web application developed using Next.js 14, React 18, and TypeScript, providing users with a seamless video conferencing experience enhanced by cutting-edge features.

## ✨ Key Features

### 🎯 Core Video Conferencing
- **Instant Meetings** - Start video calls immediately without scheduling
- **Personal Meeting Rooms** - Permanent, persistent meeting spaces with unique IDs
- **Join via Link/Code** - Easy meeting access through shared links or codes
- **Meeting Scheduling** - Plan meetings for future dates and times
- **Multiple Layouts** - Grid view, speaker-left, and speaker-right layouts
- **Meeting Controls** - Mute/unmute, video on/off, screen sharing
- **Participant Management** - See all participants and manage permissions
- **Cloud Recording** - Record meetings and access them later

### 🤖 AI-Enhanced Features
- **AI Meeting Assistant** - Get real-time meeting summaries and action items
- **Live Transcription** - Automatic speech-to-text with multi-language support (30+ languages)
- **Sentiment Analysis** - Understand meeting mood and participant engagement
- **Voice Commands** - Control meetings with natural language instructions
- **Smart Summaries** - AI-generated concise meeting summaries
- **Action Item Detection** - Automatically identify and track tasks

### 🎨 Collaboration Tools
- **Collaborative Whiteboard** - Real-time drawing and collaboration
- **Document Sharing** - Edit documents together during meetings
- **Live Polls & Surveys** - Gather feedback with interactive polls
- **Breakout Rooms** - Split into smaller groups for focused discussions
- **Live Reactions** - Express yourself with animated emoji reactions
- **Virtual Backgrounds** - Choose from various backgrounds or upload your own

### 🔒 Security & Privacy
- **End-to-End Encryption** - All meetings are encrypted
- **Waiting Rooms** - Control who enters your meeting
- **Password Protection** - Add password protection to meetings
- **SOC 2, GDPR, HIPAA Compliant** - Enterprise-grade security standards

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library

### Backend & Services
- **Clerk** - Authentication and user management
- **Stream Video SDK** - Real-time video conferencing
- **Next.js API Routes** - Serverless API endpoints
- **Node SDK** - Server-side Stream integration

### Deployment
- **Vercel** - Optimized deployment platform
- **Environment Variables** - Secure configuration management

## 📁 Project Structure

```
zoomApp-clone/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/              # Protected routes
│   │   ├── (home)/          # Home dashboard
│   │   ├── meeting/         # Meeting pages
│   │   │   ├── [id]/        # Meeting room
│   │   │   ├── new/         # Create new meeting
│   │   │   └── join/        # Join existing meeting
│   │   ├── settings/        # User settings
│   │   └── support/         # Support page
│   ├── api/                 # API routes
│   │   └── get-token/       # Stream token generation
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── AIAssistant.tsx      # AI meeting assistant
│   ├── LiveTranscription.tsx # Real-time transcription
│   ├── VirtualBackgrounds.tsx # Background selection
│   ├── CollaborativeWhiteboard.tsx # Drawing tool
│   ├── MeetingRoom.tsx      # Main meeting interface
│   ├── MeetingSetup.tsx     # Pre-meeting setup
│   ├── MeetingTypeList.tsx  # Meeting type selector
│   ├── Navbar.tsx           # Navigation bar
│   ├── Sidebar.tsx          # Sidebar navigation
│   └── Footer.tsx           # Footer component
├── providers/
│   ├── StreamClientProvider.tsx # Stream SDK wrapper
│   └── ThemeProvider.tsx    # Theme management
├── hooks/
│   ├── useGetCallById.ts    # Fetch call by ID
│   └── useGetCalls.ts       # Fetch user calls
├── actions/
│   └── stream.actions.ts    # Server actions
├── lib/
│   └── utils.ts             # Utility functions
├── constants/
│   └── index.ts             # App constants
├── public/
│   ├── icons/               # SVG icons
│   └── images/              # Static images
├── middleware.ts            # Auth middleware
├── next.config.mjs          # Next.js config
├── tailwind.config.ts       # Tailwind config
└── package.json             # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- Clerk account (for authentication)
- Stream account (for video SDK)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/meetsync.git
cd meetsync
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stream Video SDK
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for client-side | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key for server-side | Yes |
| `NEXT_PUBLIC_STREAM_API_KEY` | Stream Video API key | Yes |
| `STREAM_SECRET_KEY` | Stream Video secret key | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL of your application | Yes |

### Getting API Keys

#### Clerk
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys from the dashboard

#### Stream
1. Sign up at [getstream.io](https://getstream.io)
2. Create a new app
3. Enable Video & Audio calling
4. Copy the API keys from the dashboard

## 📖 Usage Guide

### Starting a Meeting
1. Click "Start New Meeting" on the home page
2. Choose meeting type (Instant, Scheduled, or Personal Room)
3. Configure meeting options (waiting room, password)
4. Click "Create Meeting"
5. Share the meeting link with participants

### Joining a Meeting
1. Click "Join Meeting"
2. Enter the meeting link or code
3. Enter password if required
4. Click "Join"
5. Allow camera/microphone permissions

### Using AI Features
- **AI Assistant**: Click the floating AI button during meetings
- **Live Transcription**: Enable from meeting controls
- **Virtual Backgrounds**: Select from settings before joining

### Collaborative Tools
- **Whiteboard**: Click whiteboard icon in meeting
- **Screen Share**: Use screen share button in controls
- **Reactions**: Click emoji icon to send reactions

## 🎨 Customization

### Theming
The app uses Tailwind CSS with custom color schemes. Modify `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: {
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
  },
  // Add your custom colors
}
```

### Adding Features
1. Create new components in `components/`
2. Add API routes in `app/api/`
3. Update types in relevant `.tsx` files

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Performance Optimizations

- **Memoized Components** - Reduces unnecessary re-renders
- **Lazy Loading** - Components load on demand
- **Image Optimization** - Next.js Image component
- **Route Prefetching** - Faster navigation
- **Code Splitting** - Smaller bundle sizes

## 🐛 Troubleshooting

### Common Issues

**Video not working:**
- Check browser permissions for camera/microphone
- Verify Stream API keys are correct
- Ensure you're using HTTPS in production

**Authentication errors:**
- Verify Clerk API keys
- Check if middleware is properly configured
- Clear browser cache and cookies

**Build errors:**
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Check Node.js version (18+)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- Stream Video SDK for excellent video infrastructure
- Clerk for seamless authentication
- Next.js team for the amazing framework
- shadcn for beautiful UI components

## 📞 Support

For support, email support@meetsync.com or join our Discord community.

---

**Built with ❤️ using Next.js, React, and TypeScript**
