import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Trophy,
  Zap,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Brain,
  Lightbulb,
  Rocket,
  Bookmark,
  BookmarkCheck,
  Info,
  ExternalLink,
  Save,
  MessageSquare,
  Bot,
  Award,
  Settings,
  Layers,
  Search,
  Globe,
  TrendingUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { curriculum } from './data/curriculum';
import { QuizQuestion, SubChapter } from './types';
import { glossary } from './data/glossary';
import { InteractiveLesson } from './components/InteractiveLesson';
import { SettingsModal } from './components/SettingsModal';
import { PlayerDashboard } from './components/PlayerDashboard';
import { FlashcardsModal } from './components/FlashcardsModal';
import { exportNotesAsMarkdown } from './utils/noteExporter';
import { audioSystem } from './utils/audioSystem';
import { CoachIrisIcon } from './components/CoachIrisIcon';
import { syncService } from './utils/syncService';

// --- Components ---

const GlossaryTerm = ({ 
  term, 
  definition, 
  onAdd, 
  isAdded 
}: { 
  term: string, 
  definition: string,
  onAdd: (term: string) => void,
  isAdded: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-accent border-b border-accent/30 hover:border-accent transition-all cursor-help font-medium"
      >
        {term}
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-[60]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-background-secondary border border-border-dim rounded-xl shadow-2xl z-[70] text-sm"
            >
              <div className="flex items-center gap-2 text-accent font-bold mb-2 uppercase tracking-tighter text-xs">
                <Info className="w-3 h-3" />
                Definition
              </div>
              <p className="text-text-primary leading-relaxed">{definition}</p>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(term);
                }}
                className={`mt-3 w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isAdded 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20'
                }`}
              >
                {isAdded ? 'In Study List' : 'Add to Study List'}
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-background-secondary" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
};

const ContentRenderer = ({ 
  children, 
  onAddToStudyList, 
  studyList 
}: { 
  children: React.ReactNode, 
  onAddToStudyList: (term: string) => void,
  studyList: string[]
}) => {
  const processText = (text: string): (string | React.JSX.Element)[] => {
    let result: (string | React.JSX.Element)[] = [text];
    
    glossary.forEach(item => {
      const newResult: (string | React.JSX.Element)[] = [];
      result.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`\\b(${item.term})\\b`, 'gi');
          const split = part.split(regex);
          split.forEach((s, i) => {
            if (s.toLowerCase() === item.term.toLowerCase()) {
              newResult.push(
                <GlossaryTerm 
                  key={`${item.term}-${i}-${Math.random()}`} 
                  term={s} 
                  definition={item.definition} 
                  onAdd={onAddToStudyList}
                  isAdded={studyList.includes(s.toLowerCase())}
                />
              );
            } else if (s !== '') {
              newResult.push(s);
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });
    
    return result;
  };

  const renderChildren = (node: React.ReactNode): React.ReactNode => {
    return React.Children.map(node, (child) => {
      if (typeof child === 'string') {
        return processText(child);
      }
      if (React.isValidElement(child) && (child as any).props.children) {
        return React.cloneElement(child as any, {
          children: renderChildren((child as any).props.children)
        });
      }
      return child;
    });
  };

  return <div className="whitespace-pre-wrap">{renderChildren(children)}</div>;
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-background-secondary h-1 rounded-full overflow-hidden">
    <motion.div 
      className="bg-accent h-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

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

const Coach = ({ message, type, onClose }: { message: string, type: 'info' | 'success' | 'error', onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, x: 50, scale: 0.9 }}
        className="fixed bottom-6 right-6 w-80 z-50 flex items-end gap-4"
      >
        <div className="flex-1 bg-background-secondary border border-border-dim shadow-2xl rounded-2xl p-4 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-text-secondary hover:text-text-primary"><X className="w-4 h-4" /></button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Coach Iris</span>
          </div>
          <p className="text-sm text-text-primary leading-relaxed">{message}</p>
          <div className="absolute -right-3 bottom-6 w-3 h-3 bg-background-secondary border-t border-r border-border-dim transform rotate-45" />
        </div>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 flex-shrink-0 ${type === 'success' ? 'bg-green-600 border-green-400' : type === 'error' ? 'bg-red-600 border-red-400' : 'bg-transparent border-accent/50'} overflow-hidden`}>
          <CoachIrisIcon className="w-14 h-14" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const NotesModule = ({
  chapterTitle,
  subTitle,
  notes,
  onChange
}: {
  chapterTitle: string,
  subTitle: string,
  notes: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
  return (
    <div className="bg-background-secondary border border-border-dim rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-accent">
        <MessageSquare className="w-32 h-32" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs">
            <Save className="w-4 h-4" />
            Engineering Logbook
          </div>
          <span className="text-[10px] bg-background-primary text-text-secondary px-2 py-1 rounded font-mono uppercase">Auto-saving</span>
        </div>
        <p className="text-sm text-text-secondary mb-4">Digitally record your field observations, PID values, or key regulations for {subTitle}.</p>
        <textarea
          value={notes}
          onChange={onChange}
          placeholder={`Key metrics and insights regarding ${chapterTitle}...\n- `}
          className="w-full bg-background-primary/50 border border-border-dim rounded-xl p-4 text-text-primary text-sm min-h-[160px] focus:outline-none focus:border-accent/50 resize-y"
        />
      </div>
    </div>
  );
};

const Quiz = ({ 
  questions, 
  onPass,
  onFail,
  onReview
}: { 
  questions: QuizQuestion[], 
  onPass: () => void,
  onFail: (msg: string) => void,
  onReview: (subId: string) => void
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isCorrect !== null) return;
    setSelectedOption(index);
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    } else {
      onFail("Incorrect! " + questions[currentQuestion].explanation);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const passed = score === questions.length;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-background-secondary border border-border-dim rounded-xl text-center"
      >
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${passed ? 'text-accent' : 'text-text-secondary'}`} />
        <h3 className="text-2xl font-bold mb-2">
          {passed ? 'Mastery Achieved!' : 'Keep Studying'}
        </h3>
        <p className="text-text-secondary mb-6">
          You scored {score} out of {questions.length}
        </p>
        {!passed && (
          <p className="text-sm text-text-secondary mb-6">
            You need a perfect score to unlock the next chapter. Review the material and try again!
          </p>
        )}
        {passed ? (
          <button 
            onClick={onPass}
            className="px-8 py-3 bg-accent text-white font-bold rounded-lg hover:brightness-110 transition-all"
          >
            Unlock Next Subchapter
          </button>
        ) : (
          <button 
            onClick={resetQuiz}
            className="px-8 py-3 border border-border-dim text-text-primary font-bold rounded-lg hover:bg-background-primary transition-colors"
          >
            Try Again
          </button>
        )}
      </motion.div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="p-8 bg-background-secondary border border-border-dim rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono text-accent uppercase tracking-widest">Knowledge Check</span>
        <span className="text-xs font-mono text-text-secondary">{currentQuestion + 1} / {questions.length}</span>
      </div>
      <h3 className="text-xl font-medium mb-8 text-text-primary">{q.question}</h3>
      <div className="space-y-3 mb-8">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            disabled={isCorrect !== null}
            className={`w-full p-4 text-left rounded-lg border transition-all ${
              selectedOption === idx 
                ? isCorrect 
                  ? 'bg-green-900/20 border-green-500 text-green-200' 
                  : 'bg-red-900/20 border-red-500 text-red-200'
                : 'bg-background-primary border-border-dim hover:border-accent/50 text-text-secondary'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {isCorrect !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 p-6 bg-background-primary/50 rounded-lg border-l-4 border-accent space-y-4"
        >
          <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs">
            <Info className="w-4 h-4" />
            Expert Insight
          </div>
          <p className="text-text-primary leading-relaxed">{q.explanation}</p>
          {!isCorrect && q.reviewSubChapterId && (
            <div className="pt-4 border-t border-border-dim">
              <p className="text-xs text-text-secondary mb-2 uppercase font-mono">Recommended Review:</p>
              <button 
                onClick={() => onReview(q.reviewSubChapterId!)}
                className="text-sm text-accent hover:underline flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Go to relevant lesson
              </button>
            </div>
          )}
        </motion.div>
      )}
      {isCorrect !== null && (
        <button 
          onClick={nextQuestion}
          className="w-full py-4 bg-text-primary text-background-primary font-bold rounded-lg hover:brightness-90 transition-all flex items-center justify-center gap-2"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export function App() {
  const [progress, setProgress] = useState<{
    completedSubChapters: string[];
    currentChapterId: string;
    currentSubChapterId: string;
    bookmarks: string[];
    xp: number;
    notes: Record<string, string>;
    streak: number;
    lastActiveDate: string | null;
  }>(() => {
    const saved = localStorage.getItem('drone-tech-progress');
    const defaultState = {
      completedSubChapters: [],
      currentChapterId: curriculum[0].id,
      currentSubChapterId: curriculum[0].subChapters[0].id,
      bookmarks: [],
      xp: 0,
      notes: {},
      streak: 0,
      lastActiveDate: null
    };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          completedSubChapters: parsed.completedSubChapters || [],
          bookmarks: parsed.bookmarks || [],
          xp: parsed.xp || 0,
          notes: parsed.notes || {},
          streak: parsed.streak || 0,
          lastActiveDate: parsed.lastActiveDate || null
        };
      } catch (e) {
        console.error("Failed to parse saved progress", e);
        return defaultState;
      }
    }
    return defaultState;
  });

  const [view, setView] = useState<'home' | 'learn'>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [coachMessage, setCoachMessage] = useState<{message: string, type: 'info' | 'success' | 'error'} | null>(null);
  const [studyList, setStudyList] = useState<string[]>(() => {
    const saved = localStorage.getItem('drone-tech-study-list');
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });
  const [showStudyList, setShowStudyList] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [quizMode, setQuizMode] = useState<'normal' | 'final'>('normal');

  const syncCode = useMemo(() => {
    return syncService.generateSyncCode(progress, studyList);
  }, [progress, studyList]);

  const handleLoadSyncCode = (code: string) => {
    try {
      const cleanCode = code.replace(/^SKM-/, '').replace(/-/g, '').trim();
      if (!cleanCode) return;
      
      // For this build, we support a simple base64 recovery
      const json = decodeURIComponent(atob(cleanCode));
      const data = JSON.parse(json);
      
      if (data.p === 'skymaster-v1') {
        setProgress({
          completedSubChapters: data.completedSubChapters || [],
          currentChapterId: data.currentChapterId || curriculum[0].id,
          currentSubChapterId: data.currentSubChapterId || curriculum[0].subChapters[0].id,
          bookmarks: data.bookmarks || [],
          xp: data.xp || 0,
          notes: data.notes || {},
          streak: data.streak || 0,
          lastActiveDate: data.lastActiveDate || null
        });
        if (data.sl) setStudyList(data.sl);
        setCoachMessage({ message: "MISSION UPDATED: Progress synchronized successfully.", type: 'success' });
      }
    } catch (e) {
      setCoachMessage({ message: "SYNC ERROR: Invalid or corrupted mission code.", type: 'error' });
    }
  };
  
  const [settings, setSettings] = useState<any>(() => {
    const saved = localStorage.getItem('drone-tech-settings');
    const defaultSettings = { 
      showCoachIris: false, 
      voiceEnabled: false,
      coachVolume: 1,
      coachRate: 1,
      coachPitch: 1.2,
      autoPlayVoice: false,
      coachPersonality: 'professional',
      theme: 'light',
      uiDensity: 'relaxed',
      fontSize: 'medium',
      motionIntensity: 'high',
      showGlossaryTooltips: true,
      focusMode: false,
      soundFX: true,
      backgroundAmbiance: true,
      mathDisplay: 'katex'
    };
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('drone-tech-settings', JSON.stringify(settings));
  }, [settings]);

  // Streak Logic
  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    if (progress.lastActiveDate !== today) {
      setProgress(prev => {
        let newStreak = prev.streak;
        if (!prev.lastActiveDate) {
          newStreak = 1;
        } else {
          const lastDate = new Date(prev.lastActiveDate);
          const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        }
        return { ...prev, lastActiveDate: today, streak: newStreak };
      });
    }
  }, [progress.lastActiveDate, progress.streak]);

  useEffect(() => {
    localStorage.setItem('drone-tech-progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('drone-tech-study-list', JSON.stringify(studyList));
    // Trigger Cloud Projection
    syncService.syncToCloud(progress, studyList);
  }, [studyList, progress]);

  // Apply Live Settings to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
    
    // Manage Audio
    if (settings.backgroundAmbiance) {
      audioSystem.startAmbiance();
      audioSystem.setVolume(settings.coachVolume);
    } else {
      audioSystem.stopAmbiance();
    }
  }, [settings.backgroundAmbiance, settings.coachVolume]);

  // Pre-warm Speech Synthesis voices for Iris
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const currentChapter = useMemo(() => 
    curriculum.find(c => c.id === progress.currentChapterId) || curriculum[0]
  , [progress.currentChapterId]);

  const currentSubChapter = useMemo(() => 
    currentChapter.subChapters.find(s => s.id === progress.currentSubChapterId) || currentChapter.subChapters[0]
  , [currentChapter, progress.currentSubChapterId]);

  const bookmarkedSubChapters = useMemo(() => {
    const allSubs: SubChapter[] = curriculum.flatMap(c => c.subChapters);
    return allSubs.filter(s => progress.bookmarks.includes(s.id));
  }, [progress.bookmarks]);

  const studyListItems = useMemo(() => {
    return glossary.filter(item => studyList.includes(item.term.toLowerCase()));
  }, [studyList]);

  const totalSubChapters = useMemo(() => 
    curriculum.reduce((acc, ch) => acc + ch.subChapters.length, 0)
  , []);

  const overallProgress = useMemo(() => 
    (progress.completedSubChapters.length / totalSubChapters) * 100
  , [progress.completedSubChapters, totalSubChapters]);

  const modulesWon = useMemo(() => {
    return curriculum.filter(ch => 
      ch.subChapters.every(sub => progress.completedSubChapters.includes(sub.id))
    ).length;
  }, [progress.completedSubChapters]);

  const skillTreeMastery = useMemo(() => {
    const tracks = {
      architecture: { name: 'Systems Architecture', chapters: ['ch1', 'ch3', 'ch4', 'ch7', 'ch10', 'ch13', 'ch16'], completed: 0, total: 0 },
      aerodynamics: { name: 'Aerodynamics & Physics', chapters: ['ch2', 'ch8', 'ch9', 'ch11', 'ch14', 'ch17'], completed: 0, total: 0 },
      autonomous: { name: 'Autonomous Operations', chapters: ['ch5', 'ch6', 'ch12', 'ch15', 'ch18', 'ch19'], completed: 0, total: 0 }
    };

    curriculum.forEach(ch => {
      let trackKey: keyof typeof tracks | null = null;
      if (tracks.architecture.chapters.includes(ch.id)) trackKey = 'architecture';
      else if (tracks.aerodynamics.chapters.includes(ch.id)) trackKey = 'aerodynamics';
      else if (tracks.autonomous.chapters.includes(ch.id)) trackKey = 'autonomous';

      if (trackKey) {
        const isChapterDone = ch.subChapters.every(sub => progress.completedSubChapters.includes(sub.id));
        tracks[trackKey].total += 1;
        if (isChapterDone) tracks[trackKey].completed += 1;
      }
    });

    return Object.values(tracks).map(t => ({
      name: t.name,
      progress: t.total > 0 ? (t.completed / t.total) * 100 : 0,
      isLocked: t.total > 0 && t.completed === 0
    }));
  }, [progress.completedSubChapters]);

  const isSubChapterUnlocked = (chapterId: string, subChapterId: string) => {
    const chIdx = curriculum.findIndex(c => c.id === chapterId);
    if (chIdx === -1) return false;
    const subIdx = curriculum[chIdx].subChapters.findIndex(s => s.id === subChapterId);
    
    if (chIdx === 0 && subIdx === 0) return true;

    let prevSubId = '';
    if (subIdx > 0) {
      prevSubId = curriculum[chIdx].subChapters[subIdx - 1].id;
    } else if (chIdx > 0) {
      const prevCh = curriculum[chIdx - 1];
      prevSubId = prevCh.subChapters[prevCh.subChapters.length - 1].id;
    }

    return progress.completedSubChapters.includes(prevSubId);
  };

  const handleSubChapterSelect = (chId: string, subId: string) => {
    if (settings.soundFX) audioSystem.playClick();
    if (isSubChapterUnlocked(chId, subId)) {
      setProgress(prev => ({ ...prev, currentChapterId: chId, currentSubChapterId: subId }));
      setShowQuiz(false);
      setShowBookmarks(false);
      setShowStudyList(false);
      window.scrollTo(0, 0);
    }
  };

  const toggleBookmark = (e: React.MouseEvent, subId: string) => {
    e.stopPropagation();
    setProgress(prev => {
      const isBookmarked = prev.bookmarks.includes(subId);
      return {
        ...prev,
        bookmarks: isBookmarked 
          ? prev.bookmarks.filter(id => id !== subId) 
          : [...prev.bookmarks, subId]
      };
    });
  };

  const handleAddToStudyList = (term: string) => {
    const lowerTerm = term.toLowerCase();
    setStudyList(prev => {
      if (prev.includes(lowerTerm)) {
        return prev.filter(t => t !== lowerTerm);
      }
      return [...prev, lowerTerm];
    });
  };

  const handleReview = (subId: string) => {
    const chapter = curriculum.find(c => c.subChapters.some(s => s.id === subId));
    if (chapter) {
      setProgress(prev => ({ ...prev, currentChapterId: chapter.id, currentSubChapterId: subId }));
      setShowQuiz(false);
      window.scrollTo(0, 0);
    }
  };

  const handleQuizPass = () => {
    if (quizMode === 'final') {
      setProgress(prev => ({ ...prev, xp: prev.xp + 1000 }));
      setCoachMessage({ message: `INCREDIBLE! +1000 XP. You passed the Final Exam for ${currentChapter.title}!`, type: 'success' });
      setShowQuiz(false);
      
      const chIdx = curriculum.findIndex(c => c.id === progress.currentChapterId);
      if (chIdx < curriculum.length - 1) {
        const nextCh = curriculum[chIdx + 1];
        setProgress(prev => ({ 
          ...prev, 
          currentChapterId: nextCh.id, 
          currentSubChapterId: nextCh.subChapters[0].id 
        }));
      }
      return;
    }

    if (!progress.completedSubChapters.includes(currentSubChapter.id)) {
      setProgress(prev => ({
        ...prev,
        completedSubChapters: [...prev.completedSubChapters, currentSubChapter.id],
        xp: prev.xp + 150
      }));
      setCoachMessage({ message: `Flawless! +150 XP. You're mastering ${currentChapter.title}!`, type: 'success' });
    } else {
      setCoachMessage({ message: `Great review of ${currentSubChapter.title}!`, type: 'success' });
    }
    setShowQuiz(false);
    
    const chIdx = curriculum.findIndex(c => c.id === progress.currentChapterId);
    const subIdx = curriculum[chIdx].subChapters.findIndex(s => s.id === progress.currentSubChapterId);
    
    if (subIdx < curriculum[chIdx].subChapters.length - 1) {
      const nextSubId = curriculum[chIdx].subChapters[subIdx + 1].id;
      setProgress(prev => ({ ...prev, currentSubChapterId: nextSubId }));
    }
  };
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-background-primary flex flex-col items-center justify-center p-8 text-center relative overflow-hidden font-sans selection:bg-accent/30">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay z-0" />
        
        {/* Soft Ambient Glow Elements */}
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl flex flex-col items-center w-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <CoachIrisIcon className="w-32 h-32 mb-8 mx-auto" />
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase text-text-primary"
            >
              SKYMASTER <span className="text-accent border-b-4 border-accent">Platform</span>
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-16 max-w-2xl mx-auto"
            >
              Master the physics, engineering, and autonomous operations of premium Unmanned Aerial Systems.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, delay: 0.6 }}
               className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center mb-12"
            >
              <button 
                 onClick={() => {
                   if (settings.soundFX) audioSystem.playClick();
                   setView('learn');
                 }}
                 className="group relative px-10 py-5 bg-accent text-white font-bold rounded-2xl overflow-hidden shadow-2xl hover:scale-105 active:scale-95 transition-all w-full text-lg uppercase tracking-widest flex items-center justify-center"
              >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {progress.completedSubChapters.length > 0 ? "Continue Mission" : "Commence Training"}
                    <Rocket className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>
            
            {progress.completedSubChapters.length > 0 && (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, delay: 1 }}
                   className="flex items-center gap-10 justify-center bg-background-secondary/50 backdrop-blur-md px-10 py-6 rounded-3xl border border-border-dim shadow-xl"
                >
                   <div className="text-center">
                      <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2 flex items-center gap-2 justify-center">
                         <Award className="w-3 h-3 text-accent" />
                         License Tier
                      </div>
                      <div className="font-bold text-xl text-text-primary">{getRank(progress.xp)}</div>
                   </div>
                   <div className="w-[1px] h-12 bg-border-dim" />
                   <div className="text-center">
                      <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2 flex items-center gap-2 justify-center">
                         <Zap className="w-3 h-3 text-amber-500" />
                         Flight XP
                      </div>
                      <div className="font-bold text-xl text-text-primary">{progress.xp}</div>
                   </div>
                   <div className="hidden sm:block w-[1px] h-12 bg-border-dim" />
                   <div className="hidden sm:block text-center">
                      <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2 flex items-center gap-2 justify-center">
                         <TrendingUp className="w-3 h-3 text-green-500" />
                         Progression
                      </div>
                      <div className="font-bold text-xl text-text-primary">
                        {((progress.completedSubChapters.length / totalSubChapters) * 100).toFixed(1)}%
                      </div>
                   </div>
                </motion.div>
            )}
            
            {/* Quick Settings Access from Home */}
            <button 
               onClick={() => setShowSettings(true)}
               className="absolute top-8 right-8 p-3 bg-background-secondary/50 backdrop-blur-md rounded-full border border-border-dim text-text-secondary hover:text-accent hover:border-accent transition-colors"
            >
               <Settings className="w-5 h-5" />
            </button>
        </div>
        
        {/* Render Settings from Home */}
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
          settings={settings}
          onUpdateSettings={(newSettings) => {
            setSettings(newSettings);
            localStorage.setItem('drone-tech-settings', JSON.stringify(newSettings));
          }}
          syncCode={syncCode}
          onLoadSyncCode={handleLoadSyncCode}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary font-sans selection:bg-accent/30">
      {/* --- Header --- */}
      {!settings.focusMode && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-background-primary/80 backdrop-blur-md border-b border-border-dim z-50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (settings.soundFX) audioSystem.playClick();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-accent" />
              <h1 className="font-bold text-lg tracking-tight hidden sm:block uppercase">SKYMASTER <span className="text-accent">Platform</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <button
                onClick={() => setShowDashboard(true)} 
                className="flex items-center gap-3 bg-background-secondary border border-border-dim hover:border-accent/50 transition-colors px-4 py-1.5 rounded-full"
              >
                 <Award className={`w-5 h-5 ${getLevel(progress.xp) >= 50 ? 'text-amber-400' : 'text-accent'}`}/>
                 <div className="flex flex-col items-start">
                   <span className="text-[10px] font-mono uppercase tracking-widest leading-none text-text-secondary">Lvl {getLevel(progress.xp)}</span>
                   <span className="text-xs font-bold leading-tight">{getRank(progress.xp)}</span>
                 </div>
              </button>
            </div>
            <div className="hidden md:block w-32">
              <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-1 uppercase tracking-wider">
                <span>XP</span>
                <span>{progress.xp}</span>
              </div>
              <ProgressBar progress={(progress.xp % 200) / 200 * 100} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background-secondary border border-border-dim rounded-full">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono font-bold">{progress.completedSubChapters.length} / {totalSubChapters}</span>
            </div>
            <button 
              onClick={() => {
                if (settings.soundFX) audioSystem.playClick();
                setShowSettings(true);
              }}
              className="p-2 hover:bg-background-secondary rounded-lg transition-colors text-text-secondary hover:text-text-primary"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>
      )}

      <aside 
        className={`fixed top-16 bottom-0 left-0 w-80 bg-background-primary border-r border-border-dim z-40 transition-transform duration-300 overflow-y-auto ${
          isSidebarOpen && !settings.focusMode ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* --- Deployment Optimized Toolset --- */}
          <div className="space-y-3">
             <div className="flex items-center justify-between px-2">
               <h3 className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em]">
                  Mission Control
               </h3>
               <button className="text-text-secondary hover:text-accent transition-colors">
                  <Info className="w-3 h-3" />
               </button>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => exportNotesAsMarkdown(progress.notes, curriculum)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-accent/5 border border-accent/10 hover:bg-accent/10 hover:border-accent/30 transition-all group"
                >
                  <Save className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-text-secondary">Export Log</span>
                </button>
                <button 
                  onClick={() => setShowFlashcards(true)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all group ${studyList.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={studyList.length === 0}
                >
                  <Layers className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-text-secondary">Flashcards</span>
                </button>
             </div>
          </div>

          {/* --- My Saved Lessons (Bookmarks Center) --- */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <BookmarkCheck className="w-3 h-3 text-accent" />
              <h3 className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">
                Saved Lessons
              </h3>
              <span className="ml-auto text-[10px] font-mono text-text-secondary">{bookmarkedSubChapters.length}</span>
            </div>
            <div className="space-y-1">
              {bookmarkedSubChapters.length > 0 ? bookmarkedSubChapters.map((sub) => (
                <button
                  key={`bookmark-${sub.id}`}
                  onClick={() => {
                    const chapter = curriculum.find(c => c.subChapters.some(s => s.id === sub.id));
                    if (chapter) handleSubChapterSelect(chapter.id, sub.id);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary/50 border border-border-dim text-[11px] text-text-secondary hover:text-text-primary hover:border-accent/40 transition-all group"
                >
                  <BookmarkCheck className="w-3 h-3 text-accent" />
                  <span className="truncate">{sub.title}</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )) : (
                <div className="px-3 py-4 rounded-xl border border-dashed border-border-dim text-center">
                  <p className="text-[10px] text-text-secondary italic">No bookmarks yet. Click the ribbon icon in the curriculum to save deep dives.</p>
                </div>
              )}
            </div>
          </div>

          {/* --- Active Recall List --- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Brain className="w-3 h-3 text-purple-400" />
                <h3 className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em]">
                  Active Recall
                </h3>
              </div>
              <button 
                onClick={() => setShowStudyList(!showStudyList)}
                className="text-[10px] font-mono text-text-secondary hover:text-text-primary transition-colors"
              >
                {showStudyList ? 'Hide' : 'Show'}
              </button>
            </div>
            {showStudyList && (
              <div className="space-y-1">
                {studyList.length > 0 ? studyListItems.map((item) => (
                  <div
                    key={`study-${item.term}`}
                    className="group w-full p-3 rounded-lg bg-background-secondary border border-border-dim text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-text-primary uppercase tracking-tighter">{item.term}</span>
                      <button 
                        onClick={() => handleAddToStudyList(item.term)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="px-3 py-4 rounded-xl border border-dashed border-border-dim text-center">
                    <p className="text-[10px] text-text-secondary italic">Click on underlined words in the text to add them here for Flashcards.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6 pt-6 border-t border-border-dim">
            <div className="flex items-center gap-2 px-2 mb-4">
              <Search className="w-3 h-3 text-text-secondary" />
               <h3 className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em]">
                Curriculum Map
               </h3>
            </div>
            {curriculum.map((chapter) => (
              <div key={chapter.id} className="space-y-3">
                <h3 className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em] px-2 pt-2">
                  {chapter.title}
                </h3>
                <div className="space-y-1">
                  {chapter.subChapters.map((sub) => {
                    const unlocked = isSubChapterUnlocked(chapter.id, sub.id);
                    const active = progress.currentSubChapterId === sub.id;
                    const completed = progress.completedSubChapters.includes(sub.id);
                    const isBookmarked = progress.bookmarks.includes(sub.id);

                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleSubChapterSelect(chapter.id, sub.id)}
                        disabled={!unlocked}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all group relative ${
                          active 
                            ? 'bg-accent/10 text-accent border border-accent/20' 
                            : unlocked 
                              ? 'text-text-secondary hover:bg-background-secondary hover:text-text-primary' 
                              : 'text-text-secondary/30 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {completed ? (
                            <CheckCircle2 className="w-4 h-4 text-accent" />
                          ) : unlocked ? (
                            <div className={`w-4 h-4 rounded-full border-2 ${active ? 'border-accent' : 'border-border-dim group-hover:border-text-secondary'}`} />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>
                        <span className="truncate flex-1">{sub.title}</span>
                        {unlocked && (
                          <button
                            onClick={(e) => toggleBookmark(e, sub.id)}
                            className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-background-primary ${isBookmarked ? 'opacity-100 text-accent' : 'text-text-secondary'}`}
                          >
                            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className={`pt-16 transition-all duration-300 min-h-screen ${isSidebarOpen && !settings.focusMode ? 'pl-80' : 'pl-0'}`}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key={currentSubChapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                {/* --- Content Header --- */}
                <header className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest">
                    <BookOpen className="w-4 h-4" />
                    <span>{currentChapter.title}</span>
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight text-text-primary">{currentSubChapter.title}</h2>
                  <div className="h-1 w-20 bg-accent" />
                </header>

                {/* --- Main Text --- */}
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="prose prose-headings:text-text-primary prose-p:text-text-primary/90 max-w-none"
                >
                  <div className="text-text-primary leading-relaxed text-lg space-y-6">
                    <InteractiveLesson 
                      content={currentSubChapter.content}
                      showIris={settings.showCoachIris}
                      voiceEnabled={settings.voiceEnabled}
                      coachSettings={{
                        volume: settings.coachVolume,
                        rate: settings.coachRate,
                        pitch: settings.coachPitch,
                        personality: settings.coachPersonality
                      }}
                      components={{
                        p: ({ children }: any) => (
                          <ContentRenderer onAddToStudyList={handleAddToStudyList} studyList={studyList}>{children}</ContentRenderer>
                        ),
                        li: ({ children }: any) => (
                          <li><ContentRenderer onAddToStudyList={handleAddToStudyList} studyList={studyList}>{children}</ContentRenderer></li>
                        )
                      }}
                      onComplete={() => {
                        if (settings.soundFX) audioSystem.playClick();
                        setQuizMode('normal');
                        setShowQuiz(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                </motion.article>

                {/* --- Real Life Example --- */}
                {currentSubChapter.realLifeExample && (
                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-background-secondary border border-border-dim rounded-2xl p-8 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-accent">
                      <Globe className="w-24 h-24" />
                    </div>
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="p-3 bg-accent/10 rounded-xl">
                        <Lightbulb className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-2">Real-World Case Study</h4>
                        <p className="text-text-primary italic leading-relaxed">"{currentSubChapter.realLifeExample}"</p>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* --- Notes Module --- */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <NotesModule 
                    chapterTitle={currentChapter.title}
                    subTitle={currentSubChapter.title}
                    notes={progress.notes[currentSubChapter.id] || ''}
                    onChange={(e) => setProgress(prev => ({
                      ...prev,
                      notes: {
                        ...prev.notes,
                        [currentSubChapter.id]: e.target.value
                      }
                    }))}
                  />
                </motion.section>

                {/* --- Action Bar --- */}
                <footer className="pt-12 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-sm text-text-secondary font-mono">
                    {progress.completedSubChapters.includes(currentSubChapter.id) ? (
                      <span className="flex items-center gap-2 text-green-500">
                        <CheckCircle2 className="w-4 h-4" />
                        Mastered this topic
                      </span>
                    ) : (
                      <span>Complete the quiz to earn XP</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => { setQuizMode('normal'); setShowQuiz(true); }}
                      className="group relative px-8 py-4 bg-accent text-white font-bold rounded-xl overflow-hidden shadow-lg hover:brightness-110 active:scale-95 transition-all"
                    >
                      <span className="relative flex items-center gap-2">
                        Take Knowledge Test
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    
                    {currentChapter.finalExam && currentSubChapter.id === currentChapter.subChapters[currentChapter.subChapters.length - 1].id && (
                      <button 
                        onClick={() => { setQuizMode('final'); setShowQuiz(true); }}
                        className="group relative px-8 py-4 bg-amber-500 text-black font-bold rounded-xl overflow-hidden shadow-lg hover:brightness-110 active:scale-95 transition-all"
                      >
                         <span className="relative flex items-center gap-2">
                          Final Exam
                          <Award className="w-5 h-5" />
                        </span>
                      </button>
                    )}
                  </div>
                </footer>
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="mb-8">
                  <button 
                    onClick={() => setShowQuiz(false)}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-mono"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Lesson
                  </button>
                </div>
                <Quiz 
                  questions={quizMode === 'final' ? (currentChapter.finalExam || []) : (currentSubChapter.quiz || [])} 
                  onPass={handleQuizPass} 
                  onFail={(msg) => setCoachMessage({ message: msg, type: 'error' })}
                  onReview={handleReview}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {coachMessage && (
        <Coach 
          message={coachMessage.message} 
          type={coachMessage.type} 
          onClose={() => setCoachMessage(null)} 
        />
      )}

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        settings={settings} 
        onUpdateSettings={setSettings} 
        syncCode={syncCode}
        onLoadSyncCode={handleLoadSyncCode}
      />

      <PlayerDashboard 
        isOpen={showDashboard} 
        onClose={() => setShowDashboard(false)} 
        xp={progress.xp} 
        completedSubChapters={progress.completedSubChapters} 
        totalSubChapters={totalSubChapters} 
        streak={progress.streak}
        modulesWon={modulesWon}
        skillTreeMastery={skillTreeMastery}
      />

      <FlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        studyList={studyListItems}
        onRemoveItem={(term) => handleAddToStudyList(term)}
      />

      {/* --- Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* --- Vercel Ready State --- */}
      <div id="deployment-ready" className="hidden" aria-hidden="true" data-version="1.0.1" />

      {/* Floating Exit Focus Mode Button */}
      {settings.focusMode && (
        <button
          onClick={() => {
            if (settings.soundFX) audioSystem.playClick();
            const newSettings = { ...settings, focusMode: false };
            setSettings(newSettings);
            localStorage.setItem('drone-degree-settings', JSON.stringify(newSettings));
          }}
          className="fixed bottom-6 right-6 z-[100] px-4 py-2 bg-background-secondary/80 backdrop-blur-md border border-border-dim rounded-full shadow-2xl flex items-center gap-2 text-text-primary hover:text-accent hover:border-accent transition-all hover:scale-105"
        >
          <Settings className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Exit Focus</span>
        </button>
      )}
    </div>
  );
}
