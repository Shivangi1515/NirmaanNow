import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Trash2, Target, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';

const Goals = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  const [deadline, setDeadline] = useState('');
  const [progress, setProgress] = useState(0);

  const fetchGoals = async () => {
    try {
      const { data } = await api.get('/goals');
      setGoals(data);
    } catch (error) {
      toast.error('Failed to load goals');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/goals', { title, description, category, deadline, progress });
      toast.success('Goal added');
      setTitle('');
      setDescription('');
      setProgress(0);
      setIsAdding(false);
      fetchGoals();
    } catch (error) {
      toast.error('Failed to add goal');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter((g: any) => g._id !== id));
      toast.success('Goal deleted');
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  const handleUpdateProgress = async (id: string, _currentGoal: any, newProgress: number) => {
    try {
      const { data } = await api.put(`/goals/${id}`, { progress: newProgress });
      setGoals(goals.map((g: any) => (g._id === id ? data : g)));
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-violet w-8 h-8" /></div>;

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <PageHeader 
          title="Goals" 
          subtitle="Track your big milestones and celebrate progress." 
        />
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Goal
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="glass-card p-8 border-rose/30 bg-gradient-to-br from-navy-light to-navy relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose/10 rounded-full blur-[80px] pointer-events-none"></div>
          <form onSubmit={handleAdd} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Goal Title</label>
                <input type="text" required className="input-field" placeholder="E.g. Read 20 books..." value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Category</label>
                <select className="input-field appearance-none" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Personal">Personal</option>
                  <option value="Career">Career</option>
                  <option value="Financial">Financial</option>
                  <option value="Health">Health</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Deadline</label>
                <input type="date" className="input-field" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Starting Progress (%)</label>
                <input type="number" min="0" max="100" className="input-field" value={progress} onChange={(e) => setProgress(Number(e.target.value))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Description</label>
              <textarea className="input-field resize-none" rows={3} placeholder="Why is this important to you?" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
              <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary">Save Goal</button>
            </div>
          </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal: any, i) => (
          <motion.div 
            key={goal._id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-6 relative group overflow-hidden transition-all duration-500 ${goal.progress >= 100 ? 'border-mint/30 bg-mint/5' : 'hover:border-rose/30'}`}
          >
            {goal.progress >= 100 && <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-full blur-[40px] pointer-events-none"></div>}
            {goal.progress < 100 && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-rose/10 transition-colors duration-500 pointer-events-none"></div>}
            
            <button 
              onClick={() => handleDelete(goal._id)}
              className="absolute top-4 right-4 p-2 rounded-xl text-text-muted hover:text-rose hover:bg-rose/10 opacity-0 group-hover:opacity-100 transition-all z-10"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-lg border inline-flex items-center gap-1.5 mb-4 relative z-10 transition-colors ${
              goal.progress >= 100 ? 'bg-mint/10 text-mint border-mint/20' : 'bg-surface text-text-muted border-white/10 group-hover:text-rose group-hover:border-rose/20 group-hover:bg-rose/10'
            }`}>
              {goal.progress >= 100 ? <Trophy className="w-3 h-3" /> : <Target className="w-3 h-3" />} 
              {goal.category}
            </div>
            
            <div className="relative z-10">
              <h3 className={`text-2xl font-bold mb-2 transition-colors ${goal.progress >= 100 ? 'text-mint' : 'text-white'}`}>{goal.title}</h3>
              {goal.description && <p className="text-text-muted text-sm mb-6 leading-relaxed line-clamp-2">{goal.description}</p>}
              
              <div className="mt-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted font-medium">Progress</span>
                  <span className={`font-bold ${goal.progress >= 100 ? 'text-mint' : 'text-white'}`}>{goal.progress}%</span>
                </div>
                <div className="w-full bg-surface border border-white/5 rounded-full h-3 mb-5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${goal.progress >= 100 ? 'bg-mint' : 'bg-gradient-to-r from-rose to-violet'}`}
                    style={{ width: `${goal.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    <Clock className="w-3.5 h-3.5" />
                    {goal.deadline ? new Date(goal.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'No deadline'}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUpdateProgress(goal._id, goal, Math.max(0, goal.progress - 10))}
                      disabled={goal.progress <= 0}
                      className="w-8 h-8 rounded-lg bg-surface border border-white/10 hover:border-white/30 hover:bg-white/10 text-text-primary flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => handleUpdateProgress(goal._id, goal, Math.min(100, goal.progress + 10))}
                      disabled={goal.progress >= 100}
                      className={`w-8 h-8 rounded-lg bg-surface border hover:border-white/30 hover:bg-white/10 text-text-primary flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${goal.progress >= 100 ? 'border-mint/50 text-mint' : 'border-white/10'}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {goals.length === 0 && !isAdding && (
          <div className="col-span-full glass-card p-16 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 border border-white/5">
              <Trophy className="w-10 h-10 text-text-muted" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No goals added yet</h3>
            <p className="text-text-muted max-w-md mx-auto">Dream big. Break your ambitions into actionable milestones.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
