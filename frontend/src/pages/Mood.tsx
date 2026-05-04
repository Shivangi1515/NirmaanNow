import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smile, Loader2, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';

const moodsList = [
  { name: 'Happy', color: 'text-mint', value: 3 },
  { name: 'Excited', color: 'text-electric', value: 3 },
  { name: 'Calm', color: 'text-violet', value: 2 },
  { name: 'Neutral', color: 'text-gray-400', value: 1 },
  { name: 'Tired', color: 'text-yellow-500', value: 0 },
  { name: 'Anxious', color: 'text-orange-500', value: -1 },
  { name: 'Sad', color: 'text-red-500', value: -2 },
];

const Mood = () => {
  const [moods, setMoods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedMood, setSelectedMood] = useState('Neutral');
  const [note, setNote] = useState('');

  const fetchMoods = async () => {
    try {
      const { data } = await api.get('/moods');
      setMoods(data);
    } catch (error) {
      toast.error('Failed to load moods');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/moods', { mood: selectedMood, note });
      toast.success('Mood logged');
      setNote('');
      fetchMoods();
    } catch (error) {
      toast.error('Failed to log mood');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare chart data (simple example: last 7 moods)
  const chartData = moods.slice(0, 7).reverse().map((m: any) => {
    const moodObj = moodsList.find(x => x.name === m.mood);
    return {
      date: new Date(m.createdAt).toLocaleDateString(undefined, { weekday: 'short' }),
      value: moodObj ? moodObj.value : 0,
      mood: m.mood
    };
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-violet w-8 h-8" /></div>;

  return (
    <div className="space-y-8 relative z-10">
      <PageHeader 
        title="Mood Tracker" 
        subtitle="Log how you're feeling and discover patterns." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 border-violet/20 bg-gradient-to-b from-navy-light to-navy shadow-[0_0_50px_rgba(139,92,246,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <h3 className="text-xl font-bold mb-6 text-white relative z-10">How are you feeling?</h3>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-3 gap-3">
                {moodsList.map((m) => (
                  <button
                    type="button"
                    key={m.name}
                    onClick={() => setSelectedMood(m.name)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                      selectedMood === m.name 
                        ? 'border-violet bg-violet/20 shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-105' 
                        : 'border-white/5 bg-surface hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <Smile className={`w-8 h-8 mb-2 ${m.color}`} />
                    <span className="text-xs font-medium text-text-primary">{m.name}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Note (Optional)</label>
                <textarea 
                  rows={3} 
                  className="input-field resize-none text-lg" 
                  placeholder="Why do you feel this way?" 
                  value={note} 
                  onChange={(e) => setNote(e.target.value)} 
                />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex justify-center py-4">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log Mood'}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 h-[350px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric/10 rounded-full blur-[80px] pointer-events-none"></div>
            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2 relative z-10">
              <BarChart2 className="w-5 h-5 text-electric" /> Recent Trend
            </h3>
            {chartData.length > 0 ? (
              <div className="h-[200px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="date" stroke="#94A3B8" tick={{ fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(9, 14, 36, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 6, 6]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-text-muted relative z-10">No data available yet</div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
             <h3 className="text-xl font-bold mb-6 text-white">Recent Logs</h3>
             <div className="space-y-4">
               {moods.slice(0, 5).map((m: any) => (
                 <div key={m._id} className="flex items-start gap-4 p-5 bg-surface border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                   <div className="mt-1 p-2 bg-navy-light rounded-xl border border-white/5">
                     <Smile className={`w-6 h-6 ${moodsList.find(x => x.name === m.mood)?.color || 'text-white'}`} />
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center justify-between mb-1">
                       <span className="font-bold text-white text-lg">{m.mood}</span>
                       <span className="text-xs font-medium text-text-muted px-2 py-1 bg-navy rounded-lg border border-white/5">
                         {new Date(m.createdAt).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' })}
                       </span>
                     </div>
                     {m.note && <p className="text-text-muted leading-relaxed mt-2">{m.note}</p>}
                   </div>
                 </div>
               ))}
               {moods.length === 0 && <p className="text-text-muted text-center py-8">No logs yet. Start tracking to see patterns.</p>}
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Mood;
