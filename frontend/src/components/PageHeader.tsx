import { motion } from 'framer-motion';

export const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">{title}</h1>
      {subtitle && <p className="text-text-muted text-lg">{subtitle}</p>}
    </motion.div>
  );
};
