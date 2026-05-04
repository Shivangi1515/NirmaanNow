import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { generateAIResponse } from '../utils/ai';
import api from '../utils/api';

export const OmniAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I am Nirmaan. How can I help you right now?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchContext = async () => {
        try {
          const [habitsRes, moodRes] = await Promise.all([
            api.get('/habits').catch(() => ({ data: [] })),
            api.get('/moods').catch(() => ({ data: [] }))
          ]);
          setUserContext({ activeHabits: habitsRes.data.length, recentMoods: moodRes.data.slice(0, 3) });
        } catch (error) {}
      };
      fetchContext();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await generateAIResponse(updatedMessages, userContext);
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my neural core right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] glass-panel rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-violet/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet/20 to-electric/20 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet/20 flex items-center justify-center border border-violet/30">
                  <Bot className="w-4 h-4 text-violet" />
                </div>
                <span className="font-bold text-white text-sm tracking-wide">Nirmaan AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-navy/80">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-electric/20 border border-electric/30 text-white rounded-tr-sm' 
                      : 'bg-surface border border-white/10 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-surface border border-white/10 rounded-tl-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-violet/80 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-violet/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-violet/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-navy-light/90 border-t border-white/10 backdrop-blur-xl">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-navy border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1 p-1.5 bg-violet text-white rounded-lg disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-violet to-electric flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-white/20 relative"
      >
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-full transition-opacity" />
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
      </motion.button>
    </div>
  );
};
