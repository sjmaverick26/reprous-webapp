"use client";

import { useState, useEffect } from "react";

// ============================================================================
// SOFT NUTRITION ARCADE MUSIC ENGINE
// ============================================================================
// A zero-dependency, pure Web Audio API procedural synthesizer producing warm,
// mellow, lo-fi ambient background music for nutrition learning & arcade games.
//
// Musical Characteristics:
// - Progression: Peaceful, restorative 4-bar loop in Fmaj7 -> Cmaj7 -> Dm9 -> Gsus4/G
// - Timbre: Low-pass filtered sine & gentle triangle waves (warm felt piano / chime)
// - Tempo: Gentle ~70 BPM (relaxing, focused, non-distracting)
// - Volume: Soft ambient background (default ~0.06 gain) with smooth fade in/out
// ============================================================================

interface NoteDef {
  freq: number;
  duration: number; // in seconds
  gain: number;
  type?: OscillatorType;
}

interface StepPattern {
  bass?: number; // root frequency
  padChord?: number[]; // harmonic chord frequencies
  melody?: NoteDef[]; // arpeggio or bell notes
}

// Frequencies (Hz) for our warm F / C pentatonic scale
const NOTES = {
  F2: 87.31,
  G2: 98.0,
  A2: 110.0,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
  A5: 880.0,
};

// 16-step sequence (4 measures of 4 beats each at ~70 BPM, step = 0.428s)
const SEQUENCE: StepPattern[] = [
  // Measure 1: Fmaj7 (Nourishing, warm, uplifting)
  {
    bass: NOTES.F2,
    padChord: [NOTES.F3, NOTES.C4, NOTES.E4],
    melody: [{ freq: NOTES.A4, duration: 0.8, gain: 0.08, type: "sine" }],
  },
  {
    melody: [{ freq: NOTES.C5, duration: 0.4, gain: 0.06, type: "sine" }],
  },
  {
    melody: [{ freq: NOTES.E4, duration: 0.5, gain: 0.05, type: "triangle" }],
  },
  {
    melody: [{ freq: NOTES.G4, duration: 0.6, gain: 0.07, type: "sine" }],
  },

  // Measure 2: Cmaj7 (Grounded, calming, centered)
  {
    bass: NOTES.C3,
    padChord: [NOTES.E3, NOTES.G3, NOTES.B3],
    melody: [{ freq: NOTES.E4, duration: 0.8, gain: 0.08, type: "sine" }],
  },
  {
    melody: [{ freq: NOTES.G4, duration: 0.4, gain: 0.06, type: "sine" }],
  },
  {
    melody: [{ freq: NOTES.B4, duration: 0.5, gain: 0.05, type: "triangle" }],
  },
  {
    melody: [{ freq: NOTES.D5, duration: 0.6, gain: 0.06, type: "sine" }],
  },

  // Measure 3: Dm9 (Reflective, soothing, gentle)
  {
    bass: NOTES.D3,
    padChord: [NOTES.F3, NOTES.A3, NOTES.C4],
    melody: [{ freq: NOTES.F4, duration: 0.8, gain: 0.08, type: "sine" }],
  },
  {
    melody: [{ freq: NOTES.A4, duration: 0.4, gain: 0.06, type: "sine" }],
  },
  {
    melody: [{ freq: NOTES.C5, duration: 0.5, gain: 0.06, type: "triangle" }],
  },
  {
    melody: [{ freq: NOTES.E5, duration: 0.7, gain: 0.07, type: "sine" }],
  },

  // Measure 4: Gsus4 -> G (Gentle resolving breath)
  {
    bass: NOTES.G2,
    padChord: [NOTES.G3, NOTES.C4, NOTES.D4],
    melody: [{ freq: NOTES.D4, duration: 0.8, gain: 0.07, type: "sine" }],
  },
  {
    melody: [{ freq: NOTES.G4, duration: 0.4, gain: 0.06, type: "sine" }],
  },
  {
    padChord: [NOTES.G3, NOTES.B3, NOTES.D4],
    melody: [{ freq: NOTES.B4, duration: 0.5, gain: 0.06, type: "triangle" }],
  },
  {
    melody: [{ freq: NOTES.C5, duration: 0.9, gain: 0.08, type: "sine" }],
  },
];

class SoftNutritionMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying = false;
  private volume = 0.06; // Intentionally soft & ambient
  private stepInterval: ReturnType<typeof setInterval> | null = null;
  private stepIndex = 0;
  private listeners = new Set<(isPlaying: boolean, volume: number) => void>();

  constructor() {
    // Lazily init AudioContext on first user interaction to comply with browser policy
  }

  private initAudio() {
    if (typeof window === "undefined") return null;
    if (this.ctx && this.ctx.state !== "closed") {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      const ctx = new AudioCtx();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, ctx.currentTime); // Soften harsh overtones
      filter.Q.setValueAtTime(0.7, ctx.currentTime);

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);

      filter.connect(master);
      master.connect(ctx.destination);

      this.ctx = ctx;
      this.filterNode = filter;
      this.masterGain = master;

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      return ctx;
    } catch {
      return null;
    }
  }

  public subscribe(cb: (isPlaying: boolean, volume: number) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying, this.volume);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.volume));
  }

  public start() {
    if (this.isPlaying) return;
    const ctx = this.initAudio();
    if (!ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.notify();

    // Smooth fade in over 1.2 seconds
    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(
      Math.max(0.001, this.volume),
      now + 1.2
    );

    // Start 16-step sequencer (step = 430ms => ~70 BPM)
    this.stepIndex = 0;
    this.playCurrentStep();

    if (this.stepInterval) clearInterval(this.stepInterval);
    this.stepInterval = setInterval(() => {
      if (!this.isPlaying) return;
      this.stepIndex = (this.stepIndex + 1) % SEQUENCE.length;
      this.playCurrentStep();
    }, 430);
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.notify();

    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(newVol: number) {
    const clamped = Math.max(0.01, Math.min(0.2, newVol));
    this.volume = clamped;
    if (this.isPlaying && this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(clamped, now + 0.2);
    }
    this.notify();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  private playCurrentStep() {
    if (!this.ctx || !this.filterNode || this.ctx.state === "closed") return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const pattern = SEQUENCE[this.stepIndex];

    // 1. Warm Bass Note (on measure starts)
    if (pattern.bass) {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(pattern.bass, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.15); // gentle swell
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6); // long decay

        osc.connect(gain);
        gain.connect(this.filterNode);

        osc.start(now);
        osc.stop(now + 1.7);
      } catch {
        // fail gracefully
      }
    }

    // 2. Ambient Pad Chord (soft background bed)
    if (pattern.padChord && pattern.padChord.length > 0) {
      pattern.padChord.forEach((freq) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.025, now + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

          osc.connect(gain);
          gain.connect(this.filterNode!);

          osc.start(now);
          osc.stop(now + 1.6);
        } catch {
          // ignore
        }
      });
    }

    // 3. Delicate Melody / Arpeggio Chime
    if (pattern.melody && pattern.melody.length > 0) {
      pattern.melody.forEach((note) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = note.type || "sine";
          osc.frequency.setValueAtTime(note.freq, now);

          // Soft bell envelope
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(note.gain, now + 0.03); // quick soft attack
          gain.gain.exponentialRampToValueAtTime(0.001, now + note.duration); // natural acoustic chime decay

          osc.connect(gain);
          gain.connect(this.filterNode!);

          osc.start(now);
          osc.stop(now + note.duration + 0.05);
        } catch {
          // ignore
        }
      });
    }
  }
  public playSfx(type: "correct" | "wrong" | "match" | "click" | "victory") {
    const ctx = this.initAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    try {
      if (type === "match" || type === "correct") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === "wrong") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(146.83, now + 0.18);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "victory") {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.12, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.3);
        });
      }
    } catch {
      // Ignore
    }
  }
}

// Global Singleton Instance
export const softNutritionMusic = new SoftNutritionMusicEngine();

// React Hook for Nutrition Arcade Games
export function useSoftNutritionMusic() {
  const [isPlaying, setIsPlaying] = useState<boolean>(softNutritionMusic.getIsPlaying());
  const [volume, setVolumeState] = useState<number>(softNutritionMusic.getVolume());

  useEffect(() => {
    const unsubscribe = softNutritionMusic.subscribe((playing, vol) => {
      setIsPlaying(playing);
      setVolumeState(vol);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isPlaying,
    volume,
    startMusic: () => softNutritionMusic.start(),
    stopMusic: () => softNutritionMusic.stop(),
    toggleMusic: () => softNutritionMusic.toggle(),
    setVolume: (v: number) => softNutritionMusic.setVolume(v),
    playSfx: (type: "correct" | "wrong" | "match" | "click" | "victory") => softNutritionMusic.playSfx(type),
  };
}
