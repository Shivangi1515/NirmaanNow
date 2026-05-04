import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Loader2, Sparkles, BookOpen } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';

const prompts = [
  "What is one thing you learned yesterday that you can apply today?",
  "What are you most grateful for right now?",
  "What is a challenge you overcame recently?",
  "Describe a moment that made you smile today.",
  "What do you need to forgive yourself for?"
];

const Journal = () => {
  const [journals, setJournals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  
  // New entry state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Neutral');
  const [prompt, setPrompt] = useState('');

  const fetchJournals = async () => {
    try {
      const { data } = await api.get('/journals');
      setJournals(data);
    } catch (error) {
      toast.error('Failed to load journals');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/journals', { title, content, mood, prompt });
      toast.success('Journal saved');
      setTitle('');
      setContent('');
      setIsWriting(false);
      fetchJournals();
    } catch (error) {
      toast.error('Failed to save journal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/journals/${id}`);
      setJournals(journals.filter((j: any) => j._id !== id));
      toast.success('Journal deleted');
    } catch (error) {
      toast.error('Failed to delete journal');
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-violet w-8 h-8" /></div>;

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <PageHeader 
          title="Journal" 
          subtitle="Reflect on your thoughts, preserve your memories." 
        />
        {!isWriting && (
          <button onClick={() => setIsWriting(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> New Entry
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isWriting && (
          <motion.div 
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="glass-card p-8 border-violet/30 bg-gradient-to-br from-navy-light to-navy shadow-[0_0_50px_rgba(139,92,246,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="mb-8 bg-surface border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-violet font-semibold flex items-center gap-2 mb-3 relative z-10">
                <Sparkles className="w-5 h-5"/> Daily Prompt
              </h3>
              <p className="text-text-primary text-lg font-light leading-relaxed relative z-10">"{prompt}"</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Title</label>
                  <input type="text" required className="input-field" placeholder="A meaningful day..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">How are you feeling?</label>
                  <select className="input-field appearance-none" value={mood} onChange={(e) => setMood(e.target.value)}>
                    <option value="Happy">Happy</option>
                    <option value="Calm">Calm</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Sad">Sad</option>
                    <option value="Tired">Tired</option>
                    <option value="Excited">Excited</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Content</label>
                <textarea required rows={8} className="input-field resize-none text-lg leading-relaxed" placeholder="Let your thoughts flow here..." value={content} onChange={(e) => setContent(e.target.value)} />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsWriting(false)} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Entry'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isWriting && journals.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass-card p-16 flex flex-col items-center justify-center text-center"
        >
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Your journal is empty</h3>
          <p className="text-text-muted max-w-md mx-auto mb-8">Start your reflection journey today. Writing down your thoughts helps clear your mind and track your personal growth over time.</p>
          <button onClick={() => setIsWriting(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> Start First Entry
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journals.map((journal: any, i) => (
            <motion.div 
              key={journal._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-violet/10 transition-colors duration-500 pointer-events-none"></div>
              
              <button 
                onClick={() => handleDelete(journal._id)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-surface/50 text-text-muted hover:text-rose hover:bg-rose/10 opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="text-sm font-medium text-text-muted mb-4 flex items-center gap-3">
                <span className="px-3 py-1 bg-surface rounded-full border border-white/5">
                  {new Date(journal.createdAt).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
                <span className={`px-3 py-1 rounded-full border ${
                  journal.mood === 'Happy' ? 'bg-mint/10 text-mint border-mint/20' :
                  journal.mood === 'Calm' ? 'bg-cyan/10 text-cyan border-cyan/20' :
                  journal.mood === 'Anxious' ? 'bg-rose/10 text-rose border-rose/20' :
                  'bg-violet/10 text-violet border-violet/20'
                }`}>
                  {journal.mood}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-violet transition-colors">{journal.title}</h3>
              <p className="text-text-muted line-clamp-3 leading-relaxed">{journal.content}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
