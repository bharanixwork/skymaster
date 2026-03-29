import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fan, Radio, Battery, Zap, Plane, Wind, Activity, Gauge, Cpu, SignalHigh } from 'lucide-react';

export type ConceptType = 'aerodynamics' | 'radio' | 'battery' | 'physics' | 'telemetry' | 'default';

export const ConceptVisualizer = ({ concept }: { concept: ConceptType }) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(50);

  const containerStyles = "relative w-full min-h-[220px] md:h-64 bg-background-primary rounded-3xl overflow-hidden border border-border-dim shadow-inner group cursor-pointer transition-all hover:border-accent/40";

  switch (concept) {
    case 'aerodynamics':
      return (
        <div 
          className={containerStyles}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
          onMouseLeave={() => setActive(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-blue-500/5" />
          
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Wind className="w-5 h-5" />
             </div>
             <div>
                <h4 className="text-[10px] font-mono text-text-secondary uppercase tracking-widest leading-none mb-1">Aerodynamic Flow</h4>
                <div className="text-xs font-bold text-text-primary uppercase tracking-tighter">Propulsion Physics</div>
             </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <motion.div 
               animate={{ 
                 rotate: active ? 1080 : 360,
                 scale: active ? 1.1 : 1
               }}
               transition={{ repeat: Infinity, duration: active ? 0.3 : 1.5, ease: "linear" }}
               className={`transition-colors duration-500 ${active ? 'text-accent' : 'text-text-secondary'}`}
            >
               <Fan className="w-24 h-24 md:w-32 md:h-32" />
            </motion.div>
          </div>

          {/* Interactive Wind Particles */}
          <AnimatePresence>
            {[...Array(active ? 12 : 6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: -100, y: Math.random() * 200, opacity: 0 }}
                animate={{ 
                  x: 600, 
                  opacity: [0, 0.4, 0],
                  y: (i * 20) + (active ? Math.sin(i) * 30 : 0)
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: active ? 0.8 : 2, 
                  delay: i * 0.1, 
                  ease: "linear" 
                }}
                className={`absolute h-[1px] ${active ? 'w-24 bg-accent' : 'w-12 bg-text-secondary/20'}`}
              />
            ))}
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-text-secondary">
             <div className="flex flex-col items-end">
                <span>Velocity</span>
                <span className={`font-bold ${active ? 'text-accent' : 'text-text-primary'}`}>{active ? 'MAX' : 'NOMINAL'}</span>
             </div>
             <Activity className={`w-4 h-4 ${active ? 'animate-pulse text-accent' : ''}`} />
          </div>
          
          <div className="absolute bottom-6 left-6 text-[8px] font-mono text-text-secondary/50 uppercase italic">
             Hold click to increase RPM
          </div>
        </div>
      );

    case 'radio':
      return (
        <div className={containerStyles} onClick={() => setValue(prev => (prev + 10) % 100)}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
          
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <SignalHigh className="w-5 h-5" />
             </div>
             <div>
                <h4 className="text-[10px] font-mono text-text-secondary uppercase tracking-widest leading-none mb-1">RF Spectrum</h4>
                <div className="text-xs font-bold text-text-primary uppercase tracking-tighter">ELRS / Crossfire Link</div>
             </div>
          </div>

          <div className="flex items-center justify-center h-full gap-12 md:gap-20">
            <div className="text-center group-hover:scale-110 transition-transform">
               <Radio className="w-12 h-12 text-text-secondary mb-2" />
               <div className="text-[8px] font-mono text-text-secondary uppercase tracking-[0.2em]">Ground Station</div>
            </div>

            <div className="relative w-32 h-20 overflow-hidden flex items-center">
               <svg className="w-full h-full text-orange-400 opacity-40">
                  <motion.path
                    d={`M 0 40 Q 20 ${40 - value} 40 40 T 80 40 T 120 40`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      d: `M 0 40 Q 20 ${40 - value} 40 40 T 80 40 T 120 40`
                    }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
               </svg>
               <motion.div 
                 animate={{ x: [-20, 140] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full blur-md"
               />
            </div>

            <div className="text-center group-hover:scale-110 transition-transform">
               <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                 <Plane className="w-12 h-12 text-orange-500 transform -rotate-45 mb-2" />
               </motion.div>
               <div className="text-[8px] font-mono text-orange-500 uppercase tracking-[0.2em]">UAS Receiver</div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-2 font-mono text-[10px] text-orange-500 font-bold tracking-widest">
             <Activity className="w-4 h-4" />
             RSSI: -{40 + Math.floor(value/2)} dBm
          </div>
        </div>
      );

    case 'battery':
      return (
        <div className={containerStyles} onClick={() => setValue(prev => Math.max(0, prev - 15))}>
           <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Battery className="w-5 h-5" />
             </div>
             <div>
                <h4 className="text-[10px] font-mono text-text-secondary uppercase tracking-widest leading-none mb-1">Power Management</h4>
                <div className="text-xs font-bold text-text-primary uppercase tracking-tighter">LiPo Discharge Curve</div>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center h-full pt-8">
             <div className="relative">
                <Battery className={`w-32 h-32 transition-colors duration-500 ${value > 40 ? 'text-green-500' : 'text-red-500'}`} />
                <motion.div 
                   animate={{ 
                     opacity: [0.2, 0.8, 0.2],
                     scale: value > 0 ? 1 : 0.8
                   }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <Zap className={`w-10 h-10 ${value > 0 ? 'text-yellow-400' : 'text-text-secondary'} drop-shadow-xl`} />
                </motion.div>
             </div>
             
             <div className="mt-4 w-48 h-2 bg-border-dim rounded-full overflow-hidden">
                <motion.div 
                   animate={{ width: `${value}%` }}
                   className={`h-full ${value > 40 ? 'bg-green-500' : 'bg-red-500'}`}
                />
             </div>
          </div>

          <div className="absolute bottom-6 right-6 text-[10px] font-mono font-bold tracking-widest uppercase text-text-primary">
             Voltage: {(3.7 + (value/100 * 0.5)).toFixed(2)}V
          </div>
        </div>
      );

    default:
      return (
        <div className={containerStyles}>
           <div className="flex items-center justify-center h-full opacity-20">
              <Cpu className="w-24 h-24 text-text-secondary" />
           </div>
           <div className="absolute bottom-6 left-6 text-xs font-mono text-text-secondary font-bold uppercase tracking-widest">
             Systems Analytics v1.0
           </div>
        </div>
      );
  }
};
