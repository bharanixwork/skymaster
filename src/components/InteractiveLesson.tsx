import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { 
  Bot, 
  ChevronDown, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  BrainCircuit, 
  Lightbulb, 
  Navigation,
  MessageCircle,
  Sparkles,
  User
} from 'lucide-react';
import { ConceptVisualizer, ConceptType } from './ConceptVisualizer';
import { CoachIrisIcon } from './CoachIrisIcon';

interface InteractiveLessonProps {
  content: string;
  components: any;
  onComplete: () => void;
  voiceEnabled?: boolean;
  coachSettings?: {
    volume: number;
    rate: number;
    pitch: number;
    personality: string;
  };
}

const getConceptForText = (text: string): ConceptType => {
  const lower = text.toLowerCase();
  if (lower.includes('aerodynamics') || lower.includes('lift') || lower.includes('thrust') || lower.includes('propeller')) return 'aerodynamics';
  if (lower.includes('radio') || lower.includes('transmitter') || lower.includes('receiver') || lower.includes('frequency') || lower.includes('signal')) return 'radio';
  if (lower.includes('battery') || lower.includes('power') || lower.includes('voltage') || lower.includes('current') || lower.includes('lipo')) return 'battery';
  return 'default';
};

const IRIS_PERSONALITY = {
  name: "Coach Iris",
  role: "Senior UAS Research Engineer",
  trait: "Deep technical insight with pilot-focused practicality."
};

export const InteractiveLesson = ({ 
  content, 
  components, 
  onComplete, 
  voiceEnabled = true,
  coachSettings = { volume: 1, rate: 1, pitch: 1.1, personality: 'professional' }
}: InteractiveLessonProps) => {
  const [chunks, setChunks] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interactingChunk, setInteractingChunk] = useState<number | null>(null);
  const [extraInsights, setExtraInsights] = useState<Record<number, Record<string, string>>>({});
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const rawChunks = content.split('\n\n').filter(c => c.trim().length > 0);
    setChunks(rawChunks);
    setCurrentIndex(0);
    setExtraInsights({});
  }, [content]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Auto-read if enabled
    if (voiceEnabled && chunks[currentIndex]) {
      speak(chunks[currentIndex]);
    }
  }, [currentIndex, chunks]);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Clean markdown for speech
    const cleanText = text.replace(/[#*`]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const checkAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes('female') || 
               name.includes('google uk english female') || 
               name.includes('samantha') || 
               name.includes('zira') || 
               name.includes('hazel') ||
               name.includes('susan') ||
               name.includes('karen') ||
               name.includes('monica') ||
               name.includes('vicki') ||
               name.includes('fiona') ||
               name.includes('moira');
      });

      if (femaleVoice) {
         utterance.voice = femaleVoice;
         utterance.pitch = 1.1; 
      } else {
         // Fallback to explicitly english voices and bump pitch to sound more feminine
         const enVoice = voices.find(v => v.lang.toLowerCase().startsWith('en-'));
         if (enVoice) utterance.voice = enVoice;
         utterance.pitch = 1.3; // Higher pitch compensates for male-coded system defaults
      }
      
      utterance.volume = coachSettings.volume;
      utterance.rate = 1; 
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', checkAndSpeak, { once: true });
    } else {
      checkAndSpeak();
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleNext = () => {
    stopSpeaking();
    if (currentIndex < chunks.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      onComplete();
    }
  };

  const generateExtraInsight = (idx: number, type: 'deep' | 'simple' | 'tip') => {
    const chunk = chunks[idx];
    let insight = "";
    
    if (type === 'deep') {
      insight = `### 🧠 Technical Deep Dive\nMathematically, this concept relates to the Reynolds number ($Re = \\frac{\\rho v L}{\\mu}$), which determines the transition from laminar to turbulent flow. In UAS engineering, we optimize for performance by minimizing skin friction drag through composite material selection.`;
    } else if (type === 'simple') {
      insight = `### 💡 Simple Analogy\nImagine putting your hand out of a moving car window and tilting it. It's all about how the air molecules interact with the solid surfaces of your drone.`;
    } else {
      insight = `### 🚁 Pilot Pro-Tip\nWhen you're in the field, remember that humidity increases air density altitude. You'll notice your motors working about 5-10% harder to maintain hover in these conditions. Always check your telemetry for current draw spikes!`;
    }
    
    setExtraInsights(prev => ({ 
      ...prev, 
      [idx]: { 
        ...(prev[idx] || {}),
        [type]: insight 
      } 
    }));
    if (voiceEnabled) speak(insight.replace(/#+ /g, '').replace(/\*\*.*?\*\*/g, ''));
  };

  if (chunks.length === 0) return null;

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center justify-between bg-accent/5 border border-accent/20 px-6 py-4 rounded-2xl mb-12">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-background-primary flex items-center justify-center border-2 border-accent shadow-lg shadow-accent/20">
              <CoachIrisIcon className="w-10 h-10" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background-primary rounded-full" 
            />
          </div>
          <div>
            <h4 className="text-accent font-bold font-mono text-sm tracking-tighter uppercase">{IRIS_PERSONALITY.name}</h4>
            <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest leading-none mt-1">
              Mode: <span className="text-accent">{coachSettings.personality}</span> | Online
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {isSpeaking ? (
            <button onClick={stopSpeaking} className="p-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors">
              <VolumeX className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={() => speak(chunks[currentIndex])} className="p-2 hover:bg-background-secondary text-text-secondary rounded-lg transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-16">
        <AnimatePresence initial={false}>
          {chunks.slice(0, currentIndex + 1).map((chunk, idx) => {
            const concept = getConceptForText(chunk);
            const isLatest = idx === currentIndex;
            const insight = extraInsights[idx];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`relative flex gap-6 ${isLatest ? '' : 'opacity-40 grayscale-[0.5] blur-[0.5px]'}`}
              >
                {/* Content Bubble */}
                <div className="flex-1 space-y-4">
                  <div className={`relative bg-background-secondary/80 backdrop-blur-sm border ${isLatest ? 'border-accent/50 shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)]' : 'border-border-dim'} rounded-3xl p-6 md:p-8 transition-all duration-500`}>
                    
                    {/* Iris Badge */}
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-accent rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                       Instruction
                    </div>

                    <div className="prose prose-headings:text-text-primary prose-p:text-text-primary/90 max-w-none text-lg leading-relaxed">
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={components}
                      >
                        {chunk}
                      </ReactMarkdown>
                    </div>

                    {/* Interactive Actions */}
                    {isLatest && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 pt-6 border-t border-border-dim/50 flex flex-wrap gap-3"
                      >
                        <button 
                          onClick={() => generateExtraInsight(idx, 'deep')}
                          disabled={!!(extraInsights[idx]?.['deep'])}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 ${
                            extraInsights[idx]?.['deep'] ? 'bg-accent/40 text-white cursor-default' : 'bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent'
                          }`}
                        >
                          <BrainCircuit className="w-4 h-4" />
                          Deep Dive
                        </button>
                        <button 
                          onClick={() => generateExtraInsight(idx, 'simple')}
                          disabled={!!(extraInsights[idx]?.['simple'])}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 ${
                            extraInsights[idx]?.['simple'] ? 'bg-purple-500/40 text-white cursor-default' : 'bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400'
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Simpler Please
                        </button>
                        <button 
                          onClick={() => generateExtraInsight(idx, 'tip')}
                          disabled={!!(extraInsights[idx]?.['tip'])}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 ${
                            extraInsights[idx]?.['tip'] ? 'bg-amber-500/40 text-white cursor-default' : 'bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500'
                          }`}
                        >
                          <Navigation className="w-4 h-4" />
                          Pilot Pro-Tip
                        </button>
                      </motion.div>
                    )}

                    {/* Multiple Insight Reveals */}
                    <div className="space-y-4">
                      {insight && Object.entries(insight).map(([type, text]) => (
                        <motion.div
                          key={type}
                          initial={{ opacity: 0.8, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-4 p-5 rounded-2xl border ${
                            type === 'deep' ? 'bg-accent/5 border-accent/20 shadow-lg' : 
                            type === 'simple' ? 'bg-purple-500/5 border-purple-500/20 shadow-lg' : 
                            'bg-amber-500/5 border-amber-500/20 shadow-lg'
                          }`}
                        >
                          <style dangerouslySetInnerHTML={{ __html: `
                            .katex-display { margin: 1em 0; overflow-x: auto; overflow-y: hidden; text-align: center; }
                          ` }} />
                          <div className={`prose prose-sm max-w-none prose-headings:text-text-primary prose-p:text-text-primary/90`}>
                            <ReactMarkdown 
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                            >
                              {text}
                            </ReactMarkdown>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Concept Visualizer Overlay */}
                  {concept !== 'default' && isLatest && (
                    <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                       className="p-1 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-3xl border border-white/5"
                    >
                       <ConceptVisualizer concept={concept} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div ref={bottomRef} className="pt-12 flex justify-between items-center">
        <div className="flex items-center gap-3 bg-background-secondary px-4 py-2 rounded-xl text-text-secondary text-xs font-mono uppercase tracking-widest border border-border-dim">
           <MessageCircle className="w-4 h-4" />
           Chunk {currentIndex + 1} of {chunks.length}
        </div>

        {currentIndex < chunks.length - 1 ? (
          <button
            onClick={handleNext}
            className="group relative px-8 py-4 bg-accent text-white font-bold rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)] flex items-center gap-3"
          >
            <span className="relative z-10 font-mono uppercase tracking-widest text-sm">Continue Instruction</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform relative z-10" />
          </button>
        ) : (
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onComplete}
            className="flex items-center gap-3 text-white font-bold uppercase tracking-widest bg-green-600 hover:bg-green-500 px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            Finish Lesson
          </motion.button>
        )}
      </div>
    </div>
  );
};
