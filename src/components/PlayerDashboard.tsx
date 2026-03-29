import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Award, Zap, Trophy, TrendingUp, Medal, Shield, X, Target, CheckCircle2, Lock } from 'lucide-react';

interface PlayerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  xp: number;
  completedSubChapters: string[];
  totalSubChapters: number;
  streak: number;
  modulesWon: number;
  skillTreeMastery: { name: string, progress: number, isLocked: boolean }[];
}

const getRank = (xp: number) => {
  if (xp < 200) return "Ground Observer";
  if (xp < 500) return "Drone Novice";
  if (xp < 1000) return "Flight Cadet";
  if (xp < 2000) return "Part 107 Apprentice";
  if (xp < 3000) return "Unmanned Operator";
  if (xp < 5000) return "Commercial Aviator";
  if (xp < 8000) return "Lead Pilot";
  if (xp < 10000) return "Systems Engineer";
  return "SkyMaster Architect";
};

const getLevel = (xp: number) => {
  return Math.min(50, Math.floor(xp / 200) + 1);
};

export const PlayerDashboard = ({ 
  isOpen, 
  onClose, 
  xp, 
  completedSubChapters, 
  totalSubChapters,
  streak,
  modulesWon,
  skillTreeMastery
}: PlayerDashboardProps) => {
  if (!isOpen) return null;

  const level = getLevel(xp);
  const nextLevelXp = level * 200;
  const currentLevelXp = (level - 1) * 200;
  const progressPercent = Math.min(100, ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative w-full max-w-2xl bg-background-secondary border border-border-dim rounded-3xl shadow-2xl p-8 overflow-hidden"
        >
          {/* Background FX */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <button onClick={onClose} className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors z-10">
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative z-10 space-y-8">
            {/* Header Profile */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1 shadow-xl shadow-orange-500/20">
                  <div className="w-full h-full bg-background-secondary rounded-xl flex items-center justify-center">
                    <User className="w-12 h-12 text-orange-500" />
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full border-2 border-zinc-950 bg-amber-400 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black">{level}</span>
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold tracking-tight mb-1">{getRank(xp)}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-text-secondary font-mono text-sm uppercase mb-4">
                  <Medal className="w-4 h-4 text-text-secondary" />
                  Pilot Profile
                </div>
                
                {/* XP Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-text-secondary">
                    <span>Lvl {level}</span>
                    <span className="text-orange-400">{xp} / {nextLevelXp} XP</span>
                  </div>
                  <div className="w-full h-2 bg-background-primary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background-primary/50 border border-border-dim rounded-2xl p-4 text-center">
                <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">{modulesWon}</div>
                <div className="text-[10px] text-text-secondary uppercase font-mono mt-1">Modules Won</div>
              </div>
              <div className="bg-background-primary/50 border border-border-dim rounded-2xl p-4 text-center">
                <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">{((completedSubChapters.length / totalSubChapters) * 100).toFixed(0)}%</div>
                <div className="text-[10px] text-text-secondary uppercase font-mono mt-1">Completion</div>
              </div>
              <div className="bg-background-primary/50 border border-border-dim rounded-2xl p-4 text-center">
                <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2 fill-orange-400/20" />
                <div className="text-2xl font-bold text-text-primary">{streak}</div>
                <div className="text-[10px] text-text-secondary uppercase font-mono mt-1">Day Streak</div>
              </div>
              <div className="bg-background-primary/50 border border-border-dim rounded-2xl p-4 text-center">
                <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">Pro</div>
                <div className="text-[10px] text-text-secondary uppercase font-mono mt-1">License Tier</div>
              </div>
            </div>

            {/* Path tracking */}
            <div className="border border-border-dim rounded-2xl p-6 bg-background-primary/50">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-text-secondary" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-text-primary">Skill Tree Mastery</h3>
              </div>
              <div className="space-y-4">
                {skillTreeMastery.map((track) => (
                  <div key={track.name} className={`flex items-center gap-4 ${track.isLocked ? 'opacity-40' : ''}`}>
                    <div className="w-8 flex justify-center">
                      {track.progress === 100 ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : track.isLocked ? (
                        <Lock className="w-4 h-4 text-text-secondary" />
                      ) : (
                        <Award className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-bold ${track.isLocked ? 'text-text-secondary' : 'text-text-primary'}`}>{track.name}</div>
                      <div className="w-full h-1 bg-background-primary rounded-full mt-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${track.progress}%` }}
                          className={`h-full ${track.progress === 100 ? 'bg-green-500' : 'bg-orange-500'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
