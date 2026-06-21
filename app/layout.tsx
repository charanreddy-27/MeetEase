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

export const metadata: Metadata = {
  title: "MeetEase",
  description: "Next-generation video conferencing platform",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0c0a09",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} dark`}
      suppressHydrationWarning
    >
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
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
        }}
      >
        <body className="min-h-screen antialiased font-sans">
          <ThemeProvider>
            <MeetingIntelligenceProvider>
              <Toaster />
              <main className="animate-fade">{children}</main>
            </MeetingIntelligenceProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
