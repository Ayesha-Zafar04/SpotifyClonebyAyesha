"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
  ];

  return (
    <aside className="hidden md:flex flex-col gap-2 w-64 h-full bg-black text-neutral-400 p-2 shrink-0">
      {/* Navigation Card */}
      <div className="flex flex-col gap-4 bg-zinc-900/90 rounded-lg px-5 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-5 font-semibold text-sm transition duration-200 hover:text-white ease-in-out",
                isActive ? "text-white" : "text-neutral-400"
              )}
            >
              <Icon className="size-6" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Library Card */}
      <div className="flex-1 flex flex-col bg-zinc-900/90 rounded-lg overflow-hidden">
        {/* Library Header */}
        <div className="flex items-center justify-between px-5 py-4 text-neutral-400">
          <Link
            href="/library"
            className={cn(
              "flex items-center gap-3 font-semibold text-sm transition duration-200 hover:text-white ease-in-out",
              pathname === "/library" ? "text-white" : "text-neutral-400"
            )}
          >
            <Library className="size-6" />
            <span>Your Library</span>
          </Link>
          <button className="text-neutral-400 hover:text-white transition duration-200">
            <Plus className="size-5" />
          </button>
        </div>

        {/* Library Content Placeholder */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <div className="flex flex-col gap-4">
            <div className="bg-zinc-800/50 rounded-lg p-4 flex flex-col gap-3 mx-2">
              <span className="font-semibold text-white text-sm">Create your first playlist</span>
              <span className="text-xs text-neutral-400">{"It's easy, we'll help you"}</span>
              <button className="w-fit bg-white text-black text-xs font-bold rounded-full px-4 py-2 hover:scale-105 transition duration-100 mt-1 cursor-pointer">
                Create playlist
              </button>
            </div>
            
            <div className="bg-zinc-800/50 rounded-lg p-4 flex flex-col gap-3 mx-2">
              <span className="font-semibold text-white text-sm">{"Let's find some podcasts to follow"}</span>
              <span className="text-xs text-neutral-400">{"We'll keep you updated on new episodes"}</span>
              <button className="w-fit bg-white text-black text-xs font-bold rounded-full px-4 py-2 hover:scale-105 transition duration-100 mt-1 cursor-pointer">
                Browse podcasts
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
