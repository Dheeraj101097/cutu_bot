import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

export function ChatScreen() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello message us are unknoevijcoum messagis your accounts, oenestfiir and mece?', sender: 'bot' },
    { id: 2, text: 'Hello, soon mm\'s next message?', sender: 'user' },
    { id: 3, text: 'Hello message as can markete a mehily accent bulbiers.', sender: 'bot' },
    { id: 4, text: 'Hello, sun me nnxt mene!', sender: 'user' },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newUserMsg = { id: Date.now(), text: input, sender: 'user' };
      setMessages([...messages, newUserMsg]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, text: 'I understand. Let me help you with that!', sender: 'bot' }
        ]);
      }, 1000);
    }
  };

  const bubbleVariants = {
    initial: { scale: 0.8, opacity: 0, y: 20 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }
    },
    float: {
      y: [0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--bg-glow)_0%,var(--bg-base)_100%)] text-[var(--text-main)] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 px-6 pt-8 pb-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/home')} className="p-2 opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">AI Bot</h1>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 px-6 pt-24 pb-32 overflow-y-auto space-y-6 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              variants={bubbleVariants}
              initial="initial"
              animate={["animate", "float"]}
              className={`flex items-end space-x-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full border-2 border-mint bg-mint/10 flex items-center justify-center flex-shrink-0 mb-1">
                  <div className="w-4 h-4 rounded-full bg-mint shadow-[0_0_8px_rgba(190,231,211,0.5)]" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                <GlassCard 
                  className={`p-4 rounded-3xl ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-[var(--mint)] to-[var(--gold)] text-[#1A2822] shadow-lg shadow-[var(--mint)]/10' 
                      : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] opacity-90'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{message.text}</p>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Bar Section */}
      <div className="fixed bottom-8 left-6 right-6 z-20">
        <div className="flex items-center space-x-3">
          <div className="flex-1 h-14 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-2xl px-6 flex items-center shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-main)] placeholder:opacity-30 text-base"
            />
          </div>
          <button
            onClick={handleSend}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-mint to-gold flex items-center justify-center shadow-lg shadow-mint/20 active:scale-95 transition-all group"
          >
            <Send className="w-6 h-6 text-[#1A2822] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}