import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { FloatingOrb } from '../components/FloatingOrb';
import { generateAIResponse } from '../utils/ai';
import api from '../utils/api';
import toast from 'react-hot-toast';

const SUGGESTIONS = [
  "Help me reflect on today",
  "Plan my week",
  "Suggest habits for my goals",
  "Summarize my mood pattern"
];

// Typewriter Effect Component
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20); // typing speed
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const AiCompanion = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello there. I am Nirmaan, your AI companion. How can I support you today?', isTypingComplete: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userContext, setUserContext] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Speech Recognition setup
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setInput(finalTranscript || interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        if (event.error !== 'no-speech') {
          toast.error("Microphone error. Please check permissions.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    // Fetch user context quietly in the background
    const fetchContext = async () => {
      try {
        const [habitsRes, moodRes, journalsRes] = await Promise.all([
          api.get('/habits').catch(() => ({ data: [] })),
          api.get('/moods').catch(() => ({ data: [] })),
          api.get('/journals').catch(() => ({ data: [] }))
        ]);
        
        setUserContext({
          activeHabits: habitsRes.data.length,
          recentMoods: moodRes.data.slice(0, 5), // last 5 moods
          journalEntriesCount: journalsRes.data.length
        });
      } catch (error) {
        console.error("Failed to load user context for AI", error);
      }
    };
    fetchContext();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    if (isListening && recognition) {
      recognition.stop();
      setIsListening(false);
    }
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text, isTypingComplete: true }]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await generateAIResponse(text, userContext);
      setMessages(prev => [...prev, { role: 'assistant', content: responseText, isTypingComplete: false }]);
    } catch (error) {
      toast.error("Failed to connect to Nirmaan AI.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col relative z-10">
      <PageHeader 
        title="AI Companion" 
        subtitle="Your calm, intelligent guide for reflection and planning." 
      />

      <div className="flex-1 glass-card flex flex-col overflow-hidden relative shadow-[0_0_40px_rgba(139,92,246,0.1)]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
          <div className="flex justify-center mb-10 mt-4">
            <FloatingOrb color="violet" />
          </div>
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[85%] lg:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' 
                    ? 'bg-electric border-electric/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'bg-surface border-white/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-violet" />}
                </div>
                <div className={`p-5 rounded-3xl ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-electric/20 to-electric/10 border border-electric/20 text-white rounded-tr-sm' 
                    : 'bg-surface border border-white/10 text-text-primary rounded-tl-sm backdrop-blur-md shadow-lg'
                }`}>
                  <p className="leading-relaxed">
                    {msg.role === 'assistant' && !msg.isTypingComplete ? (
                      <TypewriterText text={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-surface border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  <Bot className="w-5 h-5 text-violet" />
                </div>
                <div className="p-5 rounded-3xl bg-surface border border-white/10 rounded-tl-sm flex items-center gap-2 backdrop-blur-md">
                  <div className="w-2 h-2 bg-violet/80 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-violet/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-violet/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/5 bg-navy/40 backdrop-blur-xl relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTIONS.map(s => (
              <button 
                key={s} 
                onClick={() => handleSend(s)}
                className="text-xs font-medium text-text-lavender px-4 py-2 rounded-full border border-violet/20 hover:bg-violet/20 hover:border-violet/40 transition-all duration-300"
              >
                {s}
              </button>
            ))}
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-4 relative"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your thoughts..." 
              className="w-full bg-navy border border-white/10 rounded-2xl pl-6 pr-16 py-4 text-white placeholder-text-muted focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/30 transition-all shadow-inner"
            />
            <div className="absolute right-2 top-2 bottom-2 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                  isListening 
                    ? 'bg-rose/20 text-rose border border-rose/30 shadow-[0_0_15px_rgba(244,114,182,0.5)] animate-pulse' 
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="bg-violet hover:bg-violet/90 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiCompanion;
