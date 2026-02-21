import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Send } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  };

  return (
    <div className="min-h-dvh bg-cutu-bg">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link to="/app/more" className="p-2 -m-2">
            <ChevronLeft size={20} className="text-cutu-text" />
          </Link>
          <h1 className="text-lg font-semibold font-display text-cutu-text">
            Feedback & Support
          </h1>
        </div>
      </header>
      <div className="px-4 py-6">
        {sent ? (
          <GlassCard className="p-6 text-center">
            <p className="text-cutu-text font-medium">Thank you!</p>
            <p className="text-cutu-text-secondary text-sm mt-2">
              We received your feedback.
            </p>
          </GlassCard>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <GlassCard animate={false} className="p-4">
              <label className="block text-sm font-medium text-cutu-text mb-2">
                Your feedback
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or suggestion..."
                rows={5}
                className="w-full bg-transparent outline-none text-cutu-text placeholder:text-cutu-muted text-sm resize-none"
              />
            </GlassCard>
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-full py-3.5 rounded-2xl bg-cutu-primary text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={18} />
              Send feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
