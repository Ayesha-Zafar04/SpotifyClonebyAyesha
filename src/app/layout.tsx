import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "A Spotify clone built with Next.js, Tailwind CSS, and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-full bg-black text-white flex flex-col overflow-hidden">
        {/* Main section: Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 p-2 md:pl-0 gap-2">
            <Header />
            <main className="flex-1 bg-zinc-900/50 rounded-b-lg overflow-y-auto min-h-0">
              {children}
            </main>
          </div>
        </div>

        {/* Reserved Bottom Section */}
        <div className="h-20 bg-black border-t border-zinc-900/80 flex items-center justify-center text-xs text-neutral-500 select-none">
          Music Player Placeholder (Future Feature)
        </div>
      </body>
    </html>
  );
}
