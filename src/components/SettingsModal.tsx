import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, X, Bot, Volume2, Palette, Brain, Headphones, Sliders, Check, ChevronRight, Eye, Monitor, Type, Cloud, RefreshCw, Key, Copy } from 'lucide-react';
import { CoachIrisIcon } from './CoachIrisIcon';

export interface Settings {
  showCoachIris: boolean;
  voiceEnabled: boolean;
  coachVolume: number;
  coachRate: number;
  coachPersonality: 'enthusiastic' | 'academic' | 'professional';
  theme: 'dark' | 'light';
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
  syncCode?: string;
  onLoadSyncCode: (code: string) => void;
}

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  syncCode = "NOT-GENERATED",
  onLoadSyncCode
}: SettingsModalProps) => {
  const [copied, setCopied] = React.useState(false);
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
            {/* Coach Iris */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-accent">
                <CoachIrisIcon className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Speech Assistant</h4>
              </div>
              <div className="space-y-4">
                <MinimalToggle label="Enable Iris Presence" desc="Visible assistant for narration" value={settings.showCoachIris} onChange={(v) => { update('showCoachIris', v); if(!v) update('voiceEnabled', false); }} />
                <MinimalToggle label="Selection Reading" desc="Allow Iris to read highlighted text" value={settings.voiceEnabled} onChange={(v) => update('voiceEnabled', v)} />
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
                <MinimalToggle label="Environmental Focus" desc="Subtle atmospheric soundscape for deep study" value={settings.backgroundAmbiance} onChange={(v) => update('backgroundAmbiance', v)} />
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

            {/* Cloud Sync */}
            <section className="space-y-6 pt-6 border-t border-border-dim">
              <div className="flex items-center gap-2 text-accent">
                <Cloud className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Cloud Continuity</h4>
              </div>
              <div className="space-y-6">
                 <div className="bg-background-primary/50 p-4 rounded-2xl border border-border-dim space-y-3">
                    <div className="flex items-center justify-between">
                       <h5 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Your Mission Code</h5>
                       <span className="flex items-center gap-1 text-[8px] font-mono text-green-500 uppercase">
                          <RefreshCw className="w-2 h-2" /> Live
                       </span>
                    </div>
                    <div 
                       onClick={() => {
                          navigator.clipboard.writeText(syncCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                       }}
                       className="group/code relative font-mono text-xs p-3 bg-background-secondary rounded-lg border border-border-dim text-accent select-all text-center break-all shadow-inner cursor-pointer hover:border-accent/50 transition-all active:scale-[0.98]"
                    >
                       {syncCode}
                       <div className={`absolute inset-0 bg-background-secondary/90 flex items-center justify-center rounded-lg transition-opacity ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-2">
                             <Check className="w-3 h-3" /> Copied to Clipboard
                          </span>
                       </div>
                       <Copy className="absolute top-1 right-1 w-3 h-3 text-text-secondary opacity-0 group-hover/code:opacity-40 transition-opacity" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary px-1">Import Progress</h5>
                    <div className="relative group">
                       <input 
                          type="text" 
                          placeholder="PASTE MISSION CODE..."
                          className="w-full bg-background-primary border border-border-dim rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-accent transition-all pl-10"
                          onKeyDown={(e) => {
                             if (e.key === 'Enter') {
                                onLoadSyncCode((e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                             }
                          }}
                       />
                       <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-accent transition-colors" />
                    </div>
                 </div>
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
