import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBanner } from "@/components/top-banner";
import { StickyHeader } from "@/components/sticky-header";
import { Chatbot } from "@/components/chatbot";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataStack - Financial Market Data API",
  description: "Real-time and historical financial market data APIs for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <StickyHeader>
                <TopBanner />
              </StickyHeader>
              <main className="flex-1">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Chatbot />
        </TooltipProvider>
      </body>
    </html>
  );
}
