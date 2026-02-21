import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, Bot, User } from "lucide-react";

const mockMessages = [
  {
    role: "bot",
    text: "Hi! I am CUTU Bot. Send me an image or type a message and I will help you.",
  },
];

export default function BotChat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input.trim() }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I received your message. Connect to an AI backend for real responses.",
        },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-dvh bg-app flex flex-col pb-24">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-5 py-4">
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            Bot
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Chat with AI
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "bot"
                    ? "glass"
                    : "bg-gradient-to-br from-surface-light to-accent"
                }`}
              >
                {m.role === "bot" ? (
                  <Bot size={18} className="text-[var(--text-primary)]" strokeWidth={1.8} />
                ) : (
                  <User size={18} className="text-primary" strokeWidth={1.8} />
                )}
              </div>
              <div
                className={`max-w-[85%] p-4 rounded-card glass ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-surface-light/80 to-accent/60"
                    : ""
                }`}
              >
                <p className="text-sm text-[var(--text-primary)]">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-20 left-0 right-0 px-5 pb-2 z-20">
        <div className="glass rounded-pill p-2 flex gap-2 items-center max-w-lg mx-auto">
          <label className="flex items-center justify-center min-h-tap min-w-[44px] rounded-input glass shrink-0 text-[var(--text-primary)] active:scale-95 cursor-pointer">
            <ImageIcon size={20} />
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-70 text-sm py-2 min-w-0"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="min-h-[44px] min-w-[44px] rounded-full bg-gradient-to-br from-surface-light to-accent flex items-center justify-center shrink-0 disabled:opacity-50 active:scale-95 text-primary"
          >
            <Send size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
