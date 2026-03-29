import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Brain, RotateCcw, CheckCircle2, Award, Zap, Sparkles } from 'lucide-react';

interface Flashcard {
  term: string;
  definition: string;
}

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studyList: Flashcard[];
  onRemoveItem: (term: string) => void;
}

export const FlashcardsModal = ({ isOpen, onClose, studyList, onRemoveItem }: FlashcardsModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionMastered, setSessionMastered] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentCard = studyList[currentIndex];
  const isLastCard = currentIndex === studyList.length - 1;

  const handleNext = () => {
    if (currentIndex < studyList.length - 1) {
      setCurrentIndex(c => c + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
      setIsFlipped(false);
    }
  };

  const handleMastered = () => {
    setSessionMastered(prev => [...prev, currentCard.term]);
    onRemoveItem(currentCard.term);
    if (isLastCard && currentIndex > 0) {
      handlePrev();
    } else if (!isLastCard) {
      handleNext();
    }
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionMastered([]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-background-primary/90 backdrop-blur-xl" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-2xl flex flex-col items-center gap-12"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary tracking-tight">Active Recall Drill</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded uppercase tracking-widest border border-purple-500/20">
                    Flashcards
                  </span>
                  <span className="text-[10px] text-text-secondary font-mono">
                    {studyList.length > 0 ? `${currentIndex + 1} / ${studyList.length}` : 'Empty'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 bg-background-secondary border border-border-dim rounded-full text-text-secondary hover:text-text-primary transition-all hover:scale-110 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Flashcard */}
          {studyList.length > 0 ? (
            <div className="w-full h-96 [perspective:1000px] relative group">
              <motion.div
                className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front */}
                <div className="absolute inset-0 bg-background-secondary border-2 border-border-dim rounded-[40px] flex flex-col items-center justify-center p-12 [backface-visibility:hidden] shadow-2xl overflow-hidden group-hover:border-accent/40 transition-colors">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Sparkles className="w-48 h-48 text-accent" />
                  </div>
                  <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-8 font-bold">Question / Term</span>
                  <h3 className="text-4xl md:text-5xl font-black text-center text-text-primary uppercase tracking-tight leading-tight">
                    {currentCard.term}
                  </h3>
                  <div className="mt-12 flex items-center gap-2 text-text-secondary text-sm font-medium">
                    <RotateCcw className="w-4 h-4" />
                    Click to flip
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-background-secondary border-2 border-accent/40 rounded-[40px] flex flex-col items-center justify-center p-12 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)]">
                   <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4 font-bold">Mastery Definition</span>
                   <p className="text-xl md:text-2xl text-text-primary text-center leading-relaxed">
                    {currentCard.definition}
                   </p>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="w-full h-96 bg-background-secondary border-2 border-border-dim border-dashed rounded-[40px] flex flex-col items-center justify-center p-12">
               <Award className="w-20 h-20 text-accent mb-6 animate-bounce" />
               <h3 className="text-2xl font-bold text-text-primary mb-2">Mastery Complete!</h3>
               <p className="text-text-secondary text-center mb-8">You've cleared your study list. Keep adding terms from lessons to build your repository.</p>
               <button 
                onClick={onClose}
                className="px-8 py-3 bg-accent text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-widest"
               >
                 Return to Hangar
               </button>
            </div>
          )}

          {/* Controls */}
          {studyList.length > 0 && (
            <div className="w-full flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-5 bg-background-secondary border border-border-dim rounded-2xl text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentIndex === studyList.length - 1}
                  className="p-5 bg-background-secondary border border-border-dim rounded-2xl text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex justify-center">
                 <button 
                  onClick={handleMastered}
                  className="flex items-center gap-3 px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(22,163,74,0.3)] transition-all active:scale-95 group"
                 >
                   <CheckCircle2 className="w-6 h-6 group-hover:scale-125 transition-transform" />
                   <span className="uppercase tracking-widest text-sm">Got it, Mastered!</span>
                   <Zap className="w-5 h-5 text-yellow-300" />
                 </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
