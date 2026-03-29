import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, X, Bot, Volume2, Palette, Brain, Headphones, Sliders, Check, ChevronRight, Eye, Monitor, Type } from 'lucide-react';
import { CoachIrisIcon } from './CoachIrisIcon';

export interface Settings {
  showCoachIris: boolean;
  voiceEnabled: boolean;
  coachVolume: number;
  coachRate: number;
  coachPitch: number;
  autoPlayVoice: boolean;
  coachPersonality: 'enthusiastic' | 'academic' | 'professional';
  uiDensity: 'compact' | 'relaxed';
  fontSize: 'medium' | 'large' | 'small';
  motionIntensity: 'low' | 'high';
  showGlossaryTooltips: boolean;
  focusMode: boolean;
  soundFX: boolean;
  backgroundAmbiance: boolean;
  mathDisplay: 'katex' | 'plain';
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (settings: Settings) => void;
}

export const SettingsModal = ({ isOpen, onClose, settings, onUpdateSettings }: SettingsModalProps) => {
  if (!isOpen) return null;

  const update = (key: keyof Settings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-background-primary/80 backdrop-blur-md" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-background-secondary border border-border-dim rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-border-dim flex items-center justify-between bg-background-primary/50">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-accent/10 rounded-lg">
                 <SettingsIcon className="w-5 h-5 text-accent" />
               </div>
               <div>
                 <h3 className="text-lg font-bold text-text-primary">Platform Settings</h3>
                 <p className="text-[10px] text-text-secondary uppercase tracking-widest font-mono">Minimalist Controller</p>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-background-primary rounded-full text-text-secondary hover:text-text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {/* Visual Experience */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <Type className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Text Size</h4>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {['Small', 'Medium', 'Large'].map(s => (
                  <button
                    key={s}
                    onClick={() => update('fontSize', s.toLowerCase())}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                      settings.fontSize === s.toLowerCase()
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-background-primary border-border-dim text-text-secondary hover:border-text-secondary'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase">{s}</span>
                    {settings.fontSize === s.toLowerCase() && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </section>

            {/* Coach Iris */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <CoachIrisIcon className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Mentor Control</h4>
              </div>
              
              <div className="space-y-4">
                <MinimalToggle label="Enable Coach Iris" desc="AI guidance during lessons" value={settings.showCoachIris} onChange={(v) => { update('showCoachIris', v); if(!v) update('voiceEnabled', false); }} />
                {settings.showCoachIris && (
                   <MinimalToggle label="Voice Narration" desc="Automatically read content" value={settings.voiceEnabled} onChange={(v) => update('voiceEnabled', v)} />
                )}
              </div>
            </section>

            {/* Immersion */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <Headphones className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Atmosphere</h4>
              </div>
              
              <div className="space-y-4">
                <MinimalToggle label="Interface Sounds" value={settings.soundFX} onChange={(v) => update('soundFX', v)} />
                <MinimalToggle label="Background Ambiance" desc="Drone hum & atmospheric low-end" value={settings.backgroundAmbiance} onChange={(v) => update('backgroundAmbiance', v)} />
                
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">
                    <span>Master Volume</span>
                    <span>{Math.round(settings.coachVolume * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="1" step="0.1" 
                    value={settings.coachVolume} 
                    onChange={(e) => update('coachVolume', parseFloat(e.target.value))}
                    className="w-full h-1 bg-background-primary rounded-full appearance-none accent-accent cursor-pointer" 
                  />
                </div>
              </div>
            </section>

            {/* Study & Tech */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <Monitor className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Study Mode</h4>
              </div>
              
              <div className="space-y-4">
                <MinimalToggle label="Focus Mode" desc="Remove all UI during deep study" value={settings.focusMode} onChange={(v) => update('focusMode', v)} />
                <MinimalToggle label="Professional Math" desc="Enable high-fidelity KaTeX engine" value={settings.mathDisplay === 'katex'} onChange={(v) => update('mathDisplay', v ? 'katex' : 'plain')} />
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-4 bg-background-primary/50 border-t border-border-dim text-center">
             <button 
              onClick={onClose}
              className="w-full py-3 bg-accent text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-widest"
             >
               Apply & Continue
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MinimalToggle = ({ label, desc, value, onChange }: { label: string, desc?: string, value: boolean, onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between group">
    <div className="flex-1 pr-4">
      <h4 className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">{label}</h4>
      {desc && <p className="text-[10px] text-text-secondary leading-tight mt-0.5">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`w-10 h-5 rounded-full p-1 transition-all flex items-center shrink-0 ${value ? 'bg-accent' : 'bg-background-primary border border-border-dim'}`}
    >
      <motion.div
        className="w-3 h-3 bg-white rounded-full shadow-sm"
        animate={{ x: value ? 20 : 0 }}
      />
    </button>
  </div>
);
