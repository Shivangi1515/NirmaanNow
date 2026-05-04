import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity, Target, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';

const mockProductivityData = [
  { name: 'Mon', tasks: 4, habits: 3 },
  { name: 'Tue', tasks: 3, habits: 4 },
  { name: 'Wed', tasks: 5, habits: 4 },
  { name: 'Thu', tasks: 2, habits: 5 },
  { name: 'Fri', tasks: 6, habits: 4 },
  { name: 'Sat', tasks: 1, habits: 2 },
  { name: 'Sun', tasks: 0, habits: 3 },
];

const mockMoodData = [
  { name: 'Week 1', avg: 1.2 },
  { name: 'Week 2', avg: 1.5 },
  { name: 'Week 3', avg: 0.8 },
  { name: 'Week 4', avg: 2.1 },
];

const Analytics = () => {
  return (
    <div className="space-y-8 relative z-10">
      <PageHeader 
        title="Analytics" 
        subtitle="Your progress in numbers. See how far you've come." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-full blur-[40px] group-hover:bg-mint/20 transition-colors duration-500 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 bg-surface border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-mint/30 transition-colors">
              <Activity className="w-7 h-7 text-mint" />
            </div>
            <div>
              <p className="text-text-muted text-sm font-semibold uppercase tracking-wider">Habit Consistency</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-mint" />
                <span className="text-mint text-sm font-medium">+5% from last week</span>
              </div>
            </div>
          </div>
          <h3 className="text-5xl font-bold text-white mb-2 relative z-10 tracking-tight">85%</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full blur-[40px] group-hover:bg-electric/20 transition-colors duration-500 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 bg-surface border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-electric/30 transition-colors">
              <Zap className="w-7 h-7 text-electric" />
            </div>
            <div>
              <p className="text-text-muted text-sm font-semibold uppercase tracking-wider">Tasks Completed</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-electric" />
                <span className="text-electric text-sm font-medium">On fire today</span>
              </div>
            </div>
          </div>
          <h3 className="text-5xl font-bold text-white mb-2 relative z-10 tracking-tight">12</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet/10 rounded-full blur-[40px] group-hover:bg-violet/20 transition-colors duration-500 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 bg-surface border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-violet/30 transition-colors">
              <Target className="w-7 h-7 text-violet" />
            </div>
            <div>
              <p className="text-text-muted text-sm font-semibold uppercase tracking-wider">Goals Reached</p>
              <div className="flex items-center gap-2">
                <span className="text-violet text-sm font-medium">Keep it up!</span>
              </div>
            </div>
          </div>
          <h3 className="text-5xl font-bold text-white mb-2 relative z-10 tracking-tight">2</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-xl font-bold mb-8 text-white relative z-10">Weekly Activity</h3>
          <div className="h-[300px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockProductivityData}>
                <XAxis dataKey="name" stroke="#94A3B8" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(9, 14, 36, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="tasks" fill="#3B82F6" radius={[6, 6, 6, 6]} name="Tasks" maxBarSize={30} />
                <Bar dataKey="habits" fill="#10B981" radius={[6, 6, 6, 6]} name="Habits" maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet/5 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-xl font-bold mb-8 text-white relative z-10">Mood Trend (Monthly)</h3>
          <div className="h-[300px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMoodData}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94A3B8" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(9, 14, 36, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="avg" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorAvg)" name="Mood Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
