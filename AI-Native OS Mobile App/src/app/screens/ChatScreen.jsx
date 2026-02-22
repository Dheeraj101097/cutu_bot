import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Send } from 'lucide-react';

export function ChatScreen() {
  const navigate = useNavigate();
  // Removed the <Message[]> type annotation
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
    { id: 2, text: 'Tell me about the weather', sender: 'user' },
    { id: 3, text: 'The weather today is sunny with a temperature of 72°F. Perfect for outdoor activities!', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now(), text: 'I understand. Let me help you with that!', sender: 'bot' }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-8 pb-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/home')} className="nav-icon">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">AI Bot</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="px-6 pt-24 pb-32 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <GlassCard className={`chat-bubble ${message.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
              <p className="text-sm">{message.text}</p>
            </GlassCard>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-6 left-6 right-6">
        <GlassCard className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none placeholder:opacity-50"
            />
            <button
              onClick={handleSend}
              className="icon-wrapper p-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}