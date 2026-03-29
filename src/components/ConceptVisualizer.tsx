import React from 'react';
import { motion } from 'motion/react';
import { Fan, Radio, Battery, Zap, Plane, Wind } from 'lucide-react';

export type ConceptType = 'aerodynamics' | 'radio' | 'battery' | 'physics' | 'default';

export const ConceptVisualizer = ({ concept }: { concept: ConceptType }) => {
  switch (concept) {
    case 'aerodynamics':
      return (
        <div className="relative w-full h-48 bg-background-secondary rounded-xl overflow-hidden border border-border-dim flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-blue-500"
          >
            <Fan className="w-24 h-24" />
          </motion.div>
          {/* Airflow particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0, x: (i - 2) * 20 }}
              animate={{ y: -100, opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
              className="absolute text-blue-400/50"
            >
              <Wind className="w-6 h-6" />
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-4 text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
            Aerodynamics (Lift)
          </div>
        </div>
      );
    case 'radio':
      return (
        <div className="relative w-full h-48 bg-background-secondary rounded-xl overflow-hidden border border-border-dim flex items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <Radio className="w-12 h-12 text-text-secondary" />
            <span className="text-[10px] font-mono text-text-secondary">TX</span>
          </div>
          <div className="flex relative items-center justify-center w-24 h-8 overflow-hidden">
            <motion.div
               animate={{ x: [-100, 100] }}
               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
               className="h-1 w-8 bg-orange-500 rounded-full shadow-[0_0_15px_#f97316]"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
             <Plane className="w-12 h-12 text-orange-500 transform -rotate-45" />
             <span className="text-[10px] font-mono text-orange-500">RX</span>
          </div>
          <div className="absolute bottom-4 left-4 text-xs font-mono text-orange-400 font-bold uppercase tracking-widest">
            Radio Transmission
          </div>
        </div>
      );
    case 'battery':
      return (
        <div className="relative w-full h-48 bg-background-secondary rounded-xl overflow-hidden border border-border-dim flex items-center justify-center">
          <div className="flex items-center gap-4">
             <div className="relative">
                <Battery className="w-24 h-24 text-green-500" />
                <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ repeat: Infinity, duration: 1.5 }}
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <Zap className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                </motion.div>
             </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs font-mono text-green-400 font-bold uppercase tracking-widest">
            Energy & Power
          </div>
        </div>
      );
    default:
      return null;
  }
};
