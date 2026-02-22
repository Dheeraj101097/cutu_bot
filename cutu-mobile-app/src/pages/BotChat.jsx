import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, Sparkles } from "lucide-react";

const mockMessages = [
  {
    role: "bot",
    text: "Hi! I am CUTU Bot. Send me an image or type a message and I will help you.",
  },
  {
    role: "user",
    text: "Hello, what's our next message?",
  },
  {
    role: "bot",
    text: "Hello message as can market a really accent builders.",
  },
  {
    role: "user",
    text: "Hello, son me next meme!",
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
    <div className="min-h-screen flex flex-col pb-36">
      <header className="px-6 pt-12 pb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[--text-primary] tracking-tight">Bot Chat</h1>
          <p className="text-[10px] font-bold text-[--text-secondary] opacity-50 tracking-widest uppercase">Always active</p>
        </div>
        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[--text-primary] shadow-inner">
          <Sparkles size={20} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 space-y-8">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "glass-card bg-gradient-to-br from-mint-glow/40 to-mint-glow/10 rounded-[2.5rem] rounded-br-none shadow-xl border-emerald-500/20"
                    : "glass rounded-[2.5rem] rounded-bl-none shadow-lg"
                } text-[--text-primary] font-medium`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-32 left-6 right-6 z-30 max-w-lg mx-auto">
        <div className="glass-pill p-2 flex items-center gap-3 shadow-2xl bg-white/5 dark:bg-white/[0.02]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[--text-primary] placeholder:text-[--text-secondary]/30 font-medium pl-5 py-4"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-mint-glow to-emerald-400 flex items-center justify-center shrink-0 disabled:opacity-30 transition-all active:scale-90 shadow-xl shadow-emerald-900/10 text-forest-dark"
          >
            <Send size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
