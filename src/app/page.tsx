import { Play } from "lucide-react";

export default function Home() {
  // Static placeholders to make the layout feel like Spotify
  const recentPlaylists = [
    { id: 1, title: "Liked Songs", description: "Your favorite songs", gradient: "from-indigo-600 to-purple-800" },
    { id: 2, title: "Daily Mix 1", description: "Discover Weekly vibes", gradient: "from-emerald-600 to-teal-800" },
    { id: 3, title: "Discover Weekly", description: "Your weekly music mixtape", gradient: "from-sky-600 to-blue-800" },
    { id: 4, title: "Release Radar", description: "New music from artists you follow", gradient: "from-rose-600 to-orange-800" },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-zinc-800/40 p-8 sm:p-10">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Sprint 2 Complete
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome to Spotify Clone
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            The UI foundation for the Spotify Clone application has been completed.
            You can navigate through the search and library placeholder sections using the sidebar,
            and explore the responsive panels of this dark-themed app shell.
          </p>
        </div>
      </div>

      {/* Recommended Playlists Placeholders */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white tracking-tight">
          Jump Back In
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="group relative flex flex-col bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-900 hover:border-zinc-800/80 rounded-lg p-4 transition-all duration-300 ease-in-out cursor-pointer"
            >
              {/* Card Artwork Placeholder */}
              <div className={`aspect-square w-full rounded-md bg-gradient-to-br ${playlist.gradient} mb-4 relative overflow-hidden flex items-center justify-center shadow-lg`}>
                <span className="text-3xl font-extrabold text-white/40 tracking-tighter uppercase select-none">
                  Music
                </span>
                
                {/* Play Button Hover Effect */}
                <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 scale-90 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
                  <button className="flex items-center justify-center size-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl cursor-pointer">
                    <Play className="fill-black size-6 ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Title & Desc */}
              <span className="font-bold text-white text-sm truncate mb-1">
                {playlist.title}
              </span>
              <span className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {playlist.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
