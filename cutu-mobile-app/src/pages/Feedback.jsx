import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Send } from "lucide-react";
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
    <div className="min-h-dvh bg-app">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-5 py-4 flex items-center gap-3">
          <Link to="/app/profile" className="p-2 -m-2 min-h-tap">
            <ChevronLeft size={20} className="text-[var(--text-primary)]" />
          </Link>
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            Feedback & Support
          </h1>
        </div>
      </header>
      <div className="px-5 py-6">
        {sent ? (
          <div className="glass-card p-6 text-center">
            <p className="text-[var(--text-primary)] font-medium">Thank you!</p>
            <p className="text-[var(--text-secondary)] text-sm mt-2">
              We received your feedback.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="glass-card p-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Your feedback
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or suggestion..."
                rows={5}
                className="w-full bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-70 text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-full py-3.5 rounded-pill bg-gradient-to-r from-surface-light to-accent text-primary font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
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
