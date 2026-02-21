import { Link } from "react-router-dom";
import { ChevronLeft, HelpCircle } from "lucide-react";
const sections = [
  { title: "Getting started", desc: "Connect your CUTU Bot device and link your account." },
  { title: "Image to AI", desc: "Upload or capture images and send them to the bot for analysis." },
  { title: "Stocks", desc: "Add symbols to track and view live quotes." },
  { title: "Music", desc: "Create playlists and control playback." },
];

export default function Help() {
  return (
    <div className="min-h-dvh bg-app">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-5 py-4 flex items-center gap-3">
          <Link to="/app/profile" className="p-2 -m-2 min-h-tap">
            <ChevronLeft size={20} className="text-[var(--text-primary)]" />
          </Link>
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            Help & Tutorials
          </h1>
        </div>
      </header>
      <div className="px-5 py-6 space-y-4">
        <div className="glass-card p-6 text-center">
          <HelpCircle size={40} className="mx-auto text-primary mb-3" />
          <p className="text-[var(--text-secondary)] text-sm">
            Learn how to use CUTU Bot effectively
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title} className="glass-card p-4">
            <h3 className="font-semibold text-[var(--text-primary)] text-sm">{s.title}</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
