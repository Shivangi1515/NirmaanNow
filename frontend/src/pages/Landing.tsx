import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Activity, Calendar, Sparkles, Target, ChevronDown, CheckCircle2 } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      <AnimatedBackground />
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-navy/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-violet blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                <Brain className="h-8 w-8 text-violet relative z-10" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">NirmaanNow</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-text-muted hover:text-white transition-colors font-medium">Log in</Link>
              <Link to="/signup" className="btn-primary py-2.5 px-6 text-sm">Start Free</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-violet" />
            <span className="text-sm font-medium text-text-lavender">Introducing NirmaanNow AI 2.0</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight text-white"
          >
            Build your better self,<br />
            <span className="gradient-text">one calm step</span> at a time.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-4 max-w-3xl text-xl md:text-2xl text-text-muted mx-auto mb-12 font-light"
          >
            NirmaanNow is your AI-powered life operating system for reflection, habits, mood tracking, and intentional planning.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/signup" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
              Start Building Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4">
              Explore Demo
            </Link>
          </motion.div>
        </div>


      </div>

      {/* Features Grid */}
      <div className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Everything you need to <span className="gradient-text-cool">grow</span></h2>
            <p className="text-xl text-text-muted">A unified workspace for your mind and goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Activity className="w-8 h-8 text-mint" />}
              title="Habit & Mood Tracking"
              description="Build consistency and understand your emotional patterns with beautiful charts."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Brain className="w-8 h-8 text-violet" />}
              title="AI Companion"
              description="Your personal guide to reflect on your day and plan your tomorrow."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Calendar className="w-8 h-8 text-electric" />}
              title="Gentle Planning"
              description="Organize your tasks and goals without the overwhelming clutter."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-rose" />}
              title="Goal Alignment"
              description="Break massive dreams into small, achievable daily intentions."
              delay={0.4}
            />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-32 relative z-10 bg-navy-lighter/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-text-muted">Start for free, upgrade when you need to.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard 
              title="Starter"
              price="Free"
              description="Perfect for getting started with gentle reflection."
              features={["Basic Habit Tracking", "Daily Mood Log", "Simple Task Planner", "Community Support"]}
              buttonText="Start Free"
              isPopular={false}
            />
            <PricingCard 
              title="Pro"
              price="$8/mo"
              description="For those who want deep AI insights and analytics."
              features={["Unlimited Habit Tracking", "Advanced AI Companion", "Detailed Analytics", "Priority Support"]}
              buttonText="Upgrade to Pro"
              isPopular={true}
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-32 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <FaqItem question="Is NirmaanNow really free?" answer="Yes! Our core features will always be free. The Pro plan just adds advanced AI insights and extended analytics for power users." />
            <FaqItem question="How is my data stored?" answer="Your data is securely encrypted and stored in the cloud. We never sell your personal data or journal entries to third parties." />
            <FaqItem question="Can I use it on mobile?" answer="Absolutely! NirmaanNow is built as a progressive web app, meaning it looks and feels like a native app on your phone." />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-violet to-transparent opacity-50"></div>
        <div className="flex justify-center items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-violet/50" />
          <span className="font-bold text-xl text-white/50 tracking-tight">NirmaanNow</span>
        </div>
        <p className="text-text-muted">© 2026 NirmaanNow. Build Better. Start Now.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5 }}
    className="glass-card p-8 group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-violet/10 transition-colors duration-500"></div>
    <div className="mb-6 bg-surface border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white relative z-10">{title}</h3>
    <p className="text-text-muted relative z-10 leading-relaxed">{description}</p>
  </motion.div>
);

const PricingCard = ({ title, price, description, features, buttonText, isPopular }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`glass-card p-8 relative ${isPopular ? 'glowing-border' : ''}`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet to-electric text-white text-xs font-bold px-4 py-1 rounded-full">
        MOST POPULAR
      </div>
    )}
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <div className="text-4xl font-extrabold text-white mb-4">{price}</div>
    <p className="text-text-muted mb-8">{description}</p>
    <ul className="space-y-4 mb-8">
      {features.map((feature: string, idx: number) => (
        <li key={idx} className="flex items-center gap-3 text-white">
          <CheckCircle2 className="w-5 h-5 text-mint" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Link to="/signup" className={`w-full block text-center ${isPopular ? 'btn-primary' : 'btn-secondary'}`}>
      {buttonText}
    </Link>
  </motion.div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="p-6 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-white">{question}</h4>
        <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 text-text-muted"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
