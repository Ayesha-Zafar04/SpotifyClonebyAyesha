"use client";

import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-zinc-900/90 px-6 py-4 rounded-t-lg shrink-0">
      {/* Navigation Arrows & App Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center size-8 rounded-full bg-black text-neutral-400 hover:text-white transition duration-200 cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center size-8 rounded-full bg-black text-neutral-400 hover:text-white transition duration-200 cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight hidden sm:block">
          Spotify Clone
        </h1>
      </div>

      {/* User Profile Action */}
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="default"
          className="rounded-full bg-black text-white hover:bg-neutral-800 border-none font-bold text-sm py-2 px-4 gap-2 flex items-center cursor-pointer"
        >
          <User className="size-4" />
          <span>Profile</span>
        </Button>
      </div>
    </header>
  );
}
