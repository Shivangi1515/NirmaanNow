import React, { useState, useEffect } from 'react';
import { Plus, Check, Loader2, Trash2, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';

const Habits = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Health');

  const fetchHabits = async () => {
    try {
      const { data } = await api.get('/habits');
      setHabits(data);
    } catch (error) {
      toast.error('Failed to load habits');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/habits', { name, category, frequency: 'Daily' });
      toast.success('Habit added');
      setName('');
      setIsAdding(false);
      fetchHabits();
    } catch (error) {
      toast.error('Failed to add habit');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/habits/${id}`);
      setHabits(habits.filter((h: any) => h._id !== id));
      toast.success('Habit deleted');
    } catch (error) {
      toast.error('Failed to delete habit');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await api.patch(`/habits/${id}/toggle`, { date: today });
      setHabits(habits.map((h: any) => (h._id === id ? data : h)));
    } catch (error) {
      toast.error('Failed to toggle habit');
    }
  };

  const isCompletedToday = (completedDates: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    return completedDates.includes(today);
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-violet w-8 h-8" /></div>;

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <PageHeader 
          title="Habits" 
          subtitle="Build consistency, one day at a time." 
        />
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Habit
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="glass-card p-8 border-violet/30 bg-gradient-to-br from-navy-light to-navy relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet/10 rounded-full blur-[80px] pointer-events-none"></div>
          <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-6 items-end relative z-10">
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Habit Name</label>
              <input type="text" required className="input-field" placeholder="E.g. Drink 2L water..." value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="w-full md:w-64">
              <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Category</label>
              <select className="input-field appearance-none" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Health">Health</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Fitness">Fitness</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary flex-1 md:flex-none">Cancel</button>
              <button type="submit" className="btn-primary flex-1 md:flex-none">Save Habit</button>
            </div>
          </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit: any, i) => {
          const completed = isCompletedToday(habit.completedDates);
          return (
            <motion.div 
              key={habit._id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-6 flex flex-col justify-between transition-all duration-500 group relative overflow-hidden ${completed ? 'border-mint/30 bg-mint/5' : 'hover:border-violet/30'}`}
            >
              {completed && <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-full blur-[40px] pointer-events-none"></div>}
              {!completed && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-violet/10 transition-colors duration-500 pointer-events-none"></div>}
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-lg border ${completed ? 'bg-mint/10 text-mint border-mint/20' : 'bg-surface text-text-muted border-white/10 group-hover:bg-violet/10 group-hover:text-violet group-hover:border-violet/20'} transition-colors`}>
                  {habit.category}
                </div>
                <button 
                  onClick={() => handleDelete(habit._id)}
                  className="text-text-muted hover:text-rose p-2 rounded-xl hover:bg-rose/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6 relative z-10">
                <h3 className={`text-2xl font-bold mb-2 transition-colors ${completed ? 'text-text-muted line-through' : 'text-white'}`}>{habit.name}</h3>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Target className="w-4 h-4" />
                  <span>{habit.completedDates.length} total completions</span>
                </div>
              </div>
              
              <div className="flex justify-end relative z-10 border-t border-white/5 pt-4">
                <button 
                  onClick={() => handleToggle(habit._id)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    completed 
                      ? 'bg-mint text-navy shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-105' 
                      : 'bg-surface text-text-muted hover:bg-violet hover:text-white border border-white/10 hover:border-violet hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  }`}
                >
                  <Check className={`w-7 h-7 ${completed ? 'stroke-[3]' : ''}`} />
                </button>
              </div>
            </motion.div>
          );
        })}
        {habits.length === 0 && !isAdding && (
          <div className="col-span-full text-center py-20">
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
              <Target className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No habits yet</h3>
            <p className="text-text-muted max-w-md mx-auto">Start small. Add a simple daily habit to build momentum.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Habits;
