import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, Copy, Check, Bot, User } from "lucide-react";
import GlassCard from "../components/GlassCard";

const mockMessages = [
  {
    role: "bot",
    text: "Hi! I am CUTU Bot. Send me an image or type a message and I will help you.",
  },
];

export default function BotChat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState(null);
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

  const copyResponse = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-dvh bg-cutu-bg flex flex-col pb-20">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold font-display text-cutu-text">
            Bot Chat
          </h1>
          <p className="text-xs text-cutu-text-secondary mt-0.5">
            Upload or take images, send to AI
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
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
                    ? "bg-cutu-primary-soft text-cutu-primary"
                    : "bg-cutu-accent-pastel text-cutu-accent"
                }`}
              >
                {m.role === "bot" ? (
                  <Bot size={18} strokeWidth={1.8} />
                ) : (
                  <User size={18} strokeWidth={1.8} />
                )}
              </div>
              <GlassCard animate={false} className={`max-w-[85%] p-3 ${m.role === "user" ? "bg-cutu-primary-soft/60 text-cutu-text" : ""}`}>
                <p className="text-sm text-cutu-text">{m.text}</p>
                {m.role === "bot" && (
                  <button
                    onClick={() => copyResponse(m.text, i)}
                    className="mt-2 flex items-center gap-1.5 text-xs text-cutu-muted hover:text-cutu-primary"
                  >
                    {copiedId === i ? <Check size={12} /> : <Copy size={12} />}{" "}
                    {copiedId === i ? "Copied" : "Save response"}
                  </button>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-glass p-2 flex gap-2">
          <label className="flex items-center justify-center w-10 h-10 rounded-xl bg-cutu-sky/60 text-cutu-primary shrink-0 active:scale-95">
            <ImageIcon size={20} />
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message or upload image..."
            className="flex-1 bg-transparent outline-none text-cutu-text placeholder:text-cutu-muted text-sm py-2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-cutu-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
