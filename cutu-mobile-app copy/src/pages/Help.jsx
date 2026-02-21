import { Link } from "react-router-dom";
import { ChevronLeft, HelpCircle } from "lucide-react";
import GlassCard from "../components/GlassCard";

const sections = [
  { title: "Getting started", desc: "Connect your CUTU Bot device and link your account." },
  { title: "Image to AI", desc: "Upload or capture images and send them to the bot for analysis." },
  { title: "Stocks", desc: "Add symbols to track and view live quotes." },
  { title: "Music", desc: "Create playlists and control playback." },
];

export default function Help() {
  return (
    <div className="min-h-dvh bg-cutu-bg">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link to="/app/more" className="p-2 -m-2">
            <ChevronLeft size={20} className="text-cutu-text" />
          </Link>
          <h1 className="text-lg font-semibold font-display text-cutu-text">
            Help & Tutorials
          </h1>
        </div>
      </header>
      <div className="px-4 py-6 space-y-4">
        <GlassCard animate={false} className="p-6 text-center">
          <HelpCircle size={40} className="mx-auto text-cutu-primary mb-3" />
          <p className="text-cutu-text-secondary text-sm">
            Learn how to use CUTU Bot effectively
          </p>
        </GlassCard>
        {sections.map((s) => (
          <GlassCard key={s.title} animate={false} className="p-4">
            <h3 className="font-semibold text-cutu-text text-sm">{s.title}</h3>
            <p className="text-xs text-cutu-text-secondary mt-1">{s.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
