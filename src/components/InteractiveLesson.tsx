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
  showIris?: boolean;
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
  voiceEnabled = false,
  coachSettings = { volume: 1, rate: 1, pitch: 1.1, personality: 'professional' },
  showIris = false
}: InteractiveLessonProps) => {
  const [chunks, setChunks] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [extraInsights, setExtraInsights] = useState<Record<string, string>>({});
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()?.toString().trim();
      if (selection && selection.length > 0) {
        setSelectedText(selection);
      } else {
        setSelectedText('');
      }
    };
    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, []);

  useEffect(() => {
    // Split by double newline and filter empty
    let rawChunks = content.split('\n\n').filter(c => c.trim().length > 0);
    
    // If the first chunk is just a heading, merge it into the second or skip it to avoid "Title only" chunks
    if (rawChunks.length > 1 && (rawChunks[0].startsWith('#') || rawChunks[0].length < 40)) {
       const title = rawChunks.shift();
       rawChunks[0] = `## ${title?.replace(/#+ /g, '')}\n\n${rawChunks[0]}`;
    }

    setChunks(rawChunks);
    setExtraInsights({});
  }, [content]);

  const speakAll = () => {
    speak(content);
  };

  const speakSelection = () => {
    if (selectedText) speak(selectedText);
  };

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
    onComplete();
  };

  const generateExtraInsight = (type: 'deep' | 'simple' | 'tip') => {
    let insight = "";
    
    if (type === 'deep') {
      insight = `### 🧠 Master Technical Detail\nFor this entire session, keep in mind that UAS performance is often limited by the Reynolds number transition. Mathematically, $Re = \\frac{\\rho v L}{\\mu}$ determines flow efficiency. Mastery of these physics allows for superior airframe optimization and endurance.`;
    } else if (type === 'simple') {
      insight = `### 💡 Unified Analogy\nIf you find these concepts complex, just think of a drone as a high-precision digital bird. Every motor pulse and sensor reading mimics the micro-adjustments a kestrel makes to stay perfectly stationary in the wind.`;
    } else {
      insight = `### 🚁 Advanced Pilot Pro-Tip\nRegardless of the specific technical chapter, always remember: flight telemetry is the language of your drone. If you see current draw spikes without an increase in altitude, check for motor heat or propeller fatigue immediately.`;
    }
    
    setExtraInsights(prev => ({ 
      ...prev, 
      [type]: insight 
    }));
    if (voiceEnabled) speak(insight.replace(/#+ /g, '').replace(/\*\*.*?\*\*/g, ''));
  };

  if (chunks.length === 0) return null;

  return (
    <div className="space-y-6 md:space-y-8 pb-32">
      {showIris && (
        <div className="flex items-center justify-between bg-accent/5 border border-accent/20 px-4 md:px-6 py-3 md:py-4 rounded-2xl mb-8 md:mb-12">
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
            {selectedText && (
              <button 
                onClick={speakSelection}
                className="flex items-center gap-2 px-3 py-1.5 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-all border border-accent/30 text-[10px] font-bold uppercase tracking-widest"
                title="Read selected text"
              >
                <MessageCircle className="w-4 h-4" />
                Read Selection
              </button>
            )}

            {isSpeaking ? (
              <button onClick={stopSpeaking} className="p-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors">
                <VolumeX className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={speakAll} className="p-2 hover:bg-background-secondary text-accent border border-accent/20 rounded-lg transition-colors flex items-center gap-2 px-3">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Read Full</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-0 selection:bg-accent/20">
        <AnimatePresence initial={false}>
          {chunks.map((chunk, idx) => {
            const concept = getConceptForText(chunk);
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                {/* Seamless Content Flow */}
                <div className="space-y-6">
                  <div className="prose prose-headings:text-text-primary prose-p:text-text-primary/90 max-w-none text-lg md:text-xl leading-relaxed">
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={components}
                      >
                        {chunk}
                      </ReactMarkdown>
                  </div>

                  {/* Embedded Concept Visualizers */}
                  {concept !== 'default' && (
                    <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       className="my-10 p-1 bg-background-secondary rounded-3xl border border-border-dim shadow-sm grayscale-[0.2] hover:grayscale-0 transition-all"
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

      {/* Unique Study Enhancements at the End of the Flow */}
      <div className="mt-16 pt-8 border-t border-border-dim space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary">Lesson Mastery Tools</h3>
                <p className="text-xs text-text-secondary">Summon Iris for a unique perspective on this chapter.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => generateExtraInsight('deep')}
                  disabled={!!(extraInsights['deep'])}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    extraInsights['deep'] ? 'bg-accent/10 border-accent/20 text-accent opacity-50' : 'bg-accent/5 hover:bg-accent/10 border-accent/20 text-accent'
                  }`}
                >
                  <BrainCircuit className="w-4 h-4" />
                  Expand Detail
                </button>
                <button 
                  onClick={() => generateExtraInsight('simple')}
                  disabled={!!(extraInsights['simple'])}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    extraInsights['simple'] ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 opacity-50' : 'bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/20 text-purple-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Simplify
                </button>
                <button 
                  onClick={() => generateExtraInsight('tip')}
                  disabled={!!(extraInsights['tip'])}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    extraInsights['tip'] ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 opacity-50' : 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20 text-amber-500'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  Pro-Tip
                </button>
              </div>
          </div>

          {/* Insight Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(extraInsights).map(([type, text]) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-3xl border ${
                  type === 'deep' ? 'bg-accent/5 border-accent/10' : 
                  type === 'simple' ? 'bg-purple-500/5 border-purple-500/10' : 
                  'bg-amber-500/5 border-amber-500/20'
                }`}
              >
                <div className="prose prose-sm max-w-none prose-headings:text-text-primary prose-p:text-text-primary/90">
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

      <div ref={bottomRef} className="pt-12 flex justify-end items-center">
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onComplete}
            className="flex items-center gap-3 text-white font-bold uppercase tracking-widest bg-green-600 hover:bg-green-500 px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            Finish Task
          </motion.button>
      </div>
    </div>
  );
};
