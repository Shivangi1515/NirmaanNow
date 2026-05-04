import { motion } from 'framer-motion';

export const FloatingOrb = ({ color = "violet" }: { color?: "violet" | "cyan" | "rose" }) => {
  const colorMap = {
    violet: "bg-violet shadow-[0_0_50px_rgba(139,92,246,0.6)]",
    cyan: "bg-cyan shadow-[0_0_50px_rgba(6,182,212,0.6)]",
    rose: "bg-rose shadow-[0_0_50px_rgba(244,114,182,0.6)]",
  };

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute w-32 h-32 rounded-full blur-[40px] ${colorMap[color]}`}
      />
      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`relative z-10 w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md ${colorMap[color].split(' ')[0]}`}
      >
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30" />
      </motion.div>
    </div>
  );
};
