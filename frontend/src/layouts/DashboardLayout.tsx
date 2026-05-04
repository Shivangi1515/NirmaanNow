import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, LayoutDashboard, BookHeart, Smile, CheckSquare, Calendar, Target, Bot, BarChart2, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { OmniAssistant } from '../components/OmniAssistant';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Journal', path: '/dashboard/journal', icon: <BookHeart className="w-5 h-5" /> },
    { name: 'Mood', path: '/dashboard/mood', icon: <Smile className="w-5 h-5" /> },
    { name: 'Habits', path: '/dashboard/habits', icon: <CheckSquare className="w-5 h-5" /> },
    { name: 'Planner', path: '/dashboard/planner', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Goals', path: '/dashboard/goals', icon: <Target className="w-5 h-5" /> },
    { name: 'AI Companion', path: '/dashboard/ai-companion', icon: <Bot className="w-5 h-5" /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart2 className="w-5 h-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-navy flex relative font-sans text-text-primary selection:bg-violet/30 overflow-hidden">
      <AnimatedBackground />
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 glass-card rounded-lg"
        >
          {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 lg:m-4 lg:rounded-3xl glass-panel transform transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-center h-24 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-violet blur-md opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <Brain className="h-8 w-8 text-violet relative z-10" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">NirmaanNow</span>
          </Link>
        </div>

        <div className="p-4 flex flex-col h-[calc(100vh-8rem)] justify-between">
          <nav className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
                    isActive 
                      ? 'text-white' 
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-violet/20 to-transparent border-l-2 border-violet"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">{item.icon}</span>
                  <span className={`relative z-10 font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 mt-auto">
            <div className="glass-card p-4 rounded-2xl mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet blur-md opacity-50 rounded-full"></div>
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-violet to-electric flex items-center justify-center text-white font-bold border border-white/20">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-text-muted truncate">Premium Plan</p>
                </div>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-rose hover:text-white hover:bg-rose/10 rounded-2xl transition-colors cursor-pointer font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative z-10">
        <header className="h-24 flex items-center px-8 shrink-0 lg:mt-4 lg:mr-4 lg:rounded-3xl glass-panel justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-navy-lighter/50 px-4 py-2 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-mint animate-pulse"></div>
              <span className="text-sm text-text-muted">System Operational</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 overflow-y-auto custom-scrollbar">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto h-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      {/* OmniAssistant Floating Widget */}
      <OmniAssistant />
    </div>
  );
};

export default DashboardLayout;
