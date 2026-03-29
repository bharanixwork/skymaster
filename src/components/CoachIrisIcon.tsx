import React from 'react';
import { motion } from 'motion/react';

export const CoachIrisIcon = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center group`}>
      {/* Dynamic Aura Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-indigo-500 blur-2xl rounded-full" 
      />
      
      {/* High-Tech Female Bot Vector Icon */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
      >
        {/* Abstract Feminine Bob/Helmet Shell */}
        <path
          d="M20 55 C 20 15, 80 15, 80 55 C 80 85, 65 95, 50 95 C 35 95, 20 85, 20 55 Z"
          fill="url(#iris-shell-grad)"
          stroke="url(#iris-border-grad)"
          strokeWidth="1"
        />
        
        {/* Sleek Cyber Visor */}
        <path 
          d="M 25 48 C 40 60, 60 60, 75 48 C 75 42, 60 45, 50 45 C 40 45, 25 42, 25 48 Z" 
          fill="url(#iris-eye-ring)" 
          opacity="0.9"
        />

        {/* Central Optic Sensor */}
        <circle cx="50" cy="50" r="3" fill="#ffffff" />
        <circle cx="50" cy="50" r="8" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Synthwave Cheek/Jaw Markings */}
        <path d="M 35 70 L 45 78" stroke="url(#iris-border-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <path d="M 65 70 L 55 78" stroke="url(#iris-border-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        
        {/* Data Stream Lines */}
        <path d="M 50 15 V 35 M 40 20 V 30 M 60 20 V 30" stroke="white" strokeWidth="0.5" opacity="0.2" />

        <defs>
          <linearGradient id="iris-shell-grad" x1="50" y1="15" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1E2E" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="iris-border-grad" x1="20" y1="15" x2="80" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f472b6" /> {/* Pinkish accent for feminine energy */}
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="iris-eye-ring" x1="25" y1="42" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818CF8" />
            <stop offset="1" stopColor="#fce7f3" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating Data Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [-10, -30], 
            x: [0, (i - 1) * 10],
            opacity: [0, 1, 0],
            scale: [0, 1, 0] 
          }}
          transition={{ 
            duration: 2 + i, 
            repeat: Infinity, 
            delay: i * 0.8,
            ease: "easeOut"
          }}
          className="absolute w-1 h-1 bg-indigo-400 rounded-full z-20"
        />
      ))}
    </div>
  );
};
