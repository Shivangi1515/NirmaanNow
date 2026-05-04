import React, { useState } from 'react';
import { User, Bell, Shield, Moon, Sun, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/PageHeader';

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    toast.success('Settings saved successfully');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 relative z-10">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account preferences and customize your experience." 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden border-white/5 relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 relative z-10">
          {/* Settings Nav */}
          <div className="border-r border-white/5 p-6 bg-surface/30 backdrop-blur-md">
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-violet/10 text-violet border border-violet/20 font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <User className="w-5 h-5" /> Account Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-white hover:bg-white/5 border border-transparent transition-colors">
                <Bell className="w-5 h-5" /> Notifications
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-white hover:bg-white/5 border border-transparent transition-colors">
                <Shield className="w-5 h-5" /> Privacy & Security
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3 p-8 lg:p-12 bg-gradient-to-br from-surface/50 to-transparent">
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet" /> Profile Information
            </h3>
            <form onSubmit={handleSave} className="space-y-8 max-w-xl">
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Display Name</label>
                <input 
                  type="text" 
                  className="input-field text-lg" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  disabled
                  className="input-field text-lg opacity-50 cursor-not-allowed bg-surface border-white/5" 
                  value={user?.email || ''} 
                />
                <p className="text-xs text-text-muted mt-2">Email cannot be changed directly. Contact support if needed.</p>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h3 className="text-2xl font-bold mb-6 text-white">Preferences</h3>
                
                <div className="flex items-center justify-between bg-surface border border-white/5 p-5 rounded-2xl">
                  <div>
                    <h4 className="text-white font-medium text-lg">Daily Reminders</h4>
                    <p className="text-sm text-text-muted mt-1">Receive notifications to log your mood and habits.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                    <div className="w-14 h-7 bg-navy border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-violet peer-checked:after:bg-white peer-checked:border-violet"></div>
                  </label>
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" className="btn-primary w-full md:w-auto px-8 py-3 text-lg">Save All Changes</button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
