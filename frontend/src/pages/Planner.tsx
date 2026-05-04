import React, { useState, useEffect } from 'react';
import { Plus, Check, Loader2, Trash2, Calendar, Target, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';

const Planner = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, priority, date });
      toast.success('Task added');
      setTitle('');
      setDescription('');
      setIsAdding(false);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t: any) => t._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
      const { data } = await api.put(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map((t: any) => (t._id === id ? data : t)));
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-violet w-8 h-8" /></div>;

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <PageHeader 
          title="Gentle Planner" 
          subtitle="Organize your days and priorities with intention." 
        />
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Intentions
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="glass-card p-8 border-electric/30 bg-gradient-to-br from-navy-light to-navy relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric/10 rounded-full blur-[80px] pointer-events-none"></div>
            <form onSubmit={handleAdd} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Task Title</label>
                  <input type="text" required className="input-field" placeholder="Review project..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Date</label>
                  <input type="date" required className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Description (Optional)</label>
                  <input type="text" className="input-field" placeholder="Add some details..." value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Priority</label>
                  <select className="input-field appearance-none" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Task</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-white"><Calendar className="w-5 h-5 text-electric"/> All Tasks</h3>
          {tasks.map((task: any, i) => {
            const isCompleted = task.status === 'Completed';
            return (
              <motion.div 
                key={task._id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-card p-5 flex gap-5 transition-all duration-300 group ${isCompleted ? 'opacity-60 bg-surface/50 border-white/5' : 'hover:border-electric/30 hover:-translate-y-1'}`}
              >
                <button 
                  onClick={() => handleToggle(task._id, task.status)}
                  className={`w-7 h-7 shrink-0 rounded-lg border-2 mt-1 flex items-center justify-center transition-all duration-300 ${
                    isCompleted ? 'bg-electric border-electric text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-white/20 text-transparent hover:border-electric hover:bg-electric/10'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
                <div className="flex-1">
                  <h4 className={`text-xl font-bold mb-1 transition-colors ${isCompleted ? 'line-through text-text-muted' : 'text-white'}`}>{task.title}</h4>
                  {task.description && <p className="text-text-muted leading-relaxed mb-3">{task.description}</p>}
                  <div className="flex flex-wrap gap-3 mt-3 text-xs font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-white/5 text-text-muted">
                      <Clock className="w-3 h-3" /> {new Date(task.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                      task.priority === 'High' ? 'bg-rose/10 text-rose border-rose/20' :
                      task.priority === 'Medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      'bg-mint/10 text-mint border-mint/20'
                    }`}>
                      {task.priority === 'High' && <AlertCircle className="w-3 h-3" />}
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(task._id)} 
                  className="p-2 rounded-xl text-text-muted hover:text-rose hover:bg-rose/10 self-start opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            )
          })}
          {tasks.length === 0 && !isAdding && (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 border border-white/5">
                <Calendar className="w-8 h-8 text-text-muted" />
              </div>
              <p className="text-text-muted">Your planner is clear. Take a breath, or add a new task.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 bg-gradient-to-br from-electric/10 to-transparent border-electric/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full blur-[40px] pointer-events-none"></div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-white relative z-10">
              <Target className="w-5 h-5 text-electric"/> Focus on High Priority
            </h3>
            <div className="space-y-4 relative z-10">
              {tasks.filter((t: any) => t.priority === 'High' && t.status === 'Pending').map((t: any) => (
                <div key={t._id} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-white/5 hover:border-electric/30 transition-colors cursor-pointer group">
                  <div className="w-2 h-2 rounded-full bg-rose mt-2 shrink-0 group-hover:shadow-[0_0_10px_rgba(244,114,182,0.8)] transition-shadow" />
                  <span className="text-white font-medium">{t.title}</span>
                </div>
              ))}
              {tasks.filter((t: any) => t.priority === 'High' && t.status === 'Pending').length === 0 && (
                <div className="p-4 rounded-xl bg-surface border border-white/5 text-center">
                  <p className="text-sm text-text-muted">You're all caught up on critical tasks!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
