import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Montserrat } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MeetingIntelligenceProvider } from "@/providers/MeetingIntelligenceProvider";

// Optimize font loading — Inter for body copy, Montserrat for headings.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://meet-ease-charan.vercel.app/";
const description =
  "An AI-native video conferencing app: HD calls, live in-browser transcription, and a Claude-powered copilot that summarizes meetings and extracts action items in real time.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MeetEase — Smarter Meetings, Beautifully Simple",
    template: "%s · MeetEase",
  },
  description,
  applicationName: "MeetEase",
  keywords: [
    "video conferencing",
    "AI meeting assistant",
    "live transcription",
    "meeting summaries",
    "action items",
    "Next.js",
    "Stream video",
    "Claude",
  ],
  authors: [{ name: "Chanda Charan Reddy", url: "https://www.charanreddy.dev" }],
  creator: "Chanda Charan Reddy",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icons/logo.svg", type: "image/svg+xml" }],
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "MeetEase",
    title: "MeetEase — Smarter Meetings, Beautifully Simple",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetEase — Smarter Meetings, Beautifully Simple",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0c0a09",
};

// Clerk only renders when configured — see lib/clerk.tsx for the full rationale.
// Without a publishable key the app runs in guest-only "explore mode" instead of
// crashing on render.
const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const clerkAppearance = {
  layout: {
    socialButtonsVariant: "iconButton" as const,
    logoImageUrl: "/icons/logo.svg",
  },
  variables: {
    colorPrimary: "hsl(346.8, 77.2%, 49.8%)",
    colorBackground: "hsl(24, 9.8%, 10%)",
    colorInputBackground: "hsl(240, 3.7%, 15.9%)",
    colorInputText: "hsl(0, 0%, 95%)",
    colorText: "hsl(0, 0%, 95%)",
    borderRadius: "0.75rem",
  },
  elements: {
    formButtonPrimary:
      "bg-gradient-to-r from-primary-600 to-accent-600 shadow-md hover:shadow-glow transition-all duration-200",
    card: "shadow-lg bg-secondary-900/95 border border-secondary-800/60 backdrop-blur-xl",
    formFieldInput:
      "transition-all duration-200 focus:shadow-md focus:border-primary-500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const body = (
    <body className="min-h-screen antialiased font-sans">
      <ThemeProvider>
        <MeetingIntelligenceProvider>
          <Toaster />
          <main className="animate-fade">{children}</main>
        </MeetingIntelligenceProvider>
      </ThemeProvider>
    </body>
  );

  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} dark`}
      suppressHydrationWarning
    >
      {clerkEnabled ? (
        <ClerkProvider appearance={clerkAppearance}>{body}</ClerkProvider>
      ) : (
        body
      )}
    </html>
  );
}
