/**
 * SkyMaster immersive audio system.
 * Handles ambient drone hum and UI interaction sounds.
 */

interface OSCNode {
  gain: GainNode;
  oscs: OscillatorNode[];
}

class AudioSystem {
  private ambientOscillator: OSCNode | null = null;
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 1.0;

  constructor() {
    // Audio context is initialized on first user interaction to comply with browser policies
  }

  private initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = vol;
    if (this.ambientOscillator) {
      this.ambientOscillator.gain.gain.setTargetAtTime(vol * 0.1, this.audioContext!.currentTime, 0.1);
    }
  }

  public playClick() {
    if (this.isMuted || !this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);
    
    gain.gain.setValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  public startAmbiance() {
    this.initContext();
    if (this.ambientOscillator || !this.audioContext) return;

    // A deep, atmospheric drone hum using multiple oscillators
    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.05, this.audioContext.currentTime + 2);
    
    const createOsc = (freq: number) => {
      const o = this.audioContext!.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
      
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, this.audioContext!.currentTime);
      
      o.connect(filter);
      filter.connect(gain);
      o.start();
      return o;
    };

    const osc1 = createOsc(40); // Deep fundamental
    const osc2 = createOsc(42); // Slight detune for beating effect
    
    gain.connect(this.audioContext.destination);
    this.ambientOscillator = { gain, oscs: [osc1, osc2] };
  }

  public stopAmbiance() {
    if (this.ambientOscillator) {
      this.ambientOscillator.gain.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + 1);
      setTimeout(() => {
        this.ambientOscillator?.oscs.forEach(o => o.stop());
        this.ambientOscillator = null;
      }, 1000);
    }
  }
}

export const audioSystem = new AudioSystem();


