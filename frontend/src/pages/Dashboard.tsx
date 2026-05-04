import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, BookHeart, Smile, Target, Bot, Sparkles, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    habits: 0,
    journals: 0,
    tasks: 0,
    goals: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [habits, journals, tasks, goals] = await Promise.all([
          api.get('/habits'),
          api.get('/journals'),
          api.get('/tasks'),
          api.get('/goals')
        ]);
        
        setStats({
          habits: habits.data.length,
          journals: journals.data.length,
          tasks: tasks.data.filter((t: any) => t.status === 'Pending').length,
          goals: goals.data.length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    
    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as const }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <div className="glass-card relative overflow-hidden p-8 border-violet/20 bg-gradient-to-br from-navy-light to-navy">
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-violet/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-50%] left-[-10%] w-[200px] h-[200px] bg-electric/20 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              {getGreeting()}, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
            </h2>
            <p className="text-text-muted text-lg max-w-xl">
              "The secret of your future is hidden in your daily routine." Here is your progress today.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Habits"
          value={stats.habits.toString()}
          icon={<CheckSquare className="w-6 h-6 text-mint" />}
          trend="Manage in Habits"
        />
        <StatCard 
          title="Journal Entries"
          value={stats.journals.toString()}
          icon={<BookHeart className="w-6 h-6 text-violet" />}
          trend="View reflections"
        />
        <StatCard 
          title="Pending Tasks"
          value={stats.tasks.toString()}
          icon={<Target className="w-6 h-6 text-electric" />}
          trend="View planner"
        />
        <StatCard 
          title="Goals Tracking"
          value={stats.goals.toString()}
          icon={<Smile className="w-6 h-6 text-rose" />}
          trend="On track"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-8 group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-cyan/10 transition-colors duration-500"></div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-surface rounded-xl border border-white/10">
                <Sparkles className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white">Daily Prompt</h3>
            </div>
            <p className="text-2xl font-light text-white leading-relaxed mb-8">
              "What is one thing you learned yesterday that you can apply today?"
            </p>
          </div>
          <button className="btn-secondary w-full group-hover:border-cyan/50 flex items-center justify-between">
            <span>Write Reflection</span>
            <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-cyan transition-colors" />
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 relative overflow-hidden glowing-border flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-electric/5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-violet/20 rounded-xl border border-violet/30">
                  <Bot className="w-5 h-5 text-violet" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Insight</h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet/20 text-violet border border-violet/30">
                JUST NOW
              </span>
            </div>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              Based on your recent logs, you seem most productive in the mornings. Consider tackling your High Priority tasks before 11 AM today to maximize your energy.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-3 text-sm text-text-muted mt-auto pt-4 border-t border-white/5">
            <div className="w-2 h-2 rounded-full bg-mint animate-pulse"></div>
            Analyzing your patterns
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-6 flex flex-col relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-[30px] group-hover:bg-white/10 transition-colors duration-500"></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="p-3 bg-surface border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors">
        {icon}
      </div>
    </div>
    <div className="relative z-10">
      <h4 className="text-text-muted text-sm font-medium mb-2 tracking-wide uppercase">{title}</h4>
      <div className="text-4xl font-extrabold text-white mb-2 tracking-tight">{value}</div>
      <div className="flex items-center gap-1 text-sm text-text-muted">
        <span>{trend}</span>
      </div>
    </div>
  </motion.div>
);

export default Dashboard;
