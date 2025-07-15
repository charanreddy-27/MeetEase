import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "MeetSync",
  description: "Next-generation video conferencing platform",
  icons: {
    icon: "/icons/logo.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/logo.svg",
          },
          variables: {
            colorPrimary: "hsl(270, 95%, 60%)",
            colorBackground: "hsl(222.2, 84%, 4.9%)",
            colorInputBackground: "hsl(217.2, 32.6%, 17.5%)",
            colorInputText: "hsl(210, 40%, 98%)",
            colorText: "hsl(210, 40%, 98%)",
          },
          elements: {
            formButtonPrimary: "bg-gradient-to-r from-purple-600 to-accent-600 shadow-md hover:shadow-lg transition-all duration-200",
            card: "shadow-lg bg-secondary-900/95 border border-secondary-800/50",
            formFieldInput: "transition-all duration-200 focus:shadow-md focus:border-purple-500",
          },
        }}
      >
        <body className="min-h-screen antialiased">
          <ThemeProvider>
            <Toaster />
            <main className="animate-fade">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
