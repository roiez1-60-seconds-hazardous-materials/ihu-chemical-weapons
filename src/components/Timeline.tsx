'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Eye, ShoppingCart, FileWarning, Bomb, Crosshair, Volume2, VolumeX, Mic, MicOff, Play } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

/* ── Web Audio API sound generator ── */
class TimelineAudio {
  private ctx: AudioContext | null = null;
  private played = new Set<string>();
  public enabled = true;

  private getCtx() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    // Resume if suspended (browser autoplay policy)
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  /** Must be called from a user gesture to unlock audio */
  unlock() {
    const ctx = this.getCtx();
    if (ctx.state === 'suspended') ctx.resume();
  }

  play(type: 'blip' | 'alert' | 'boom' | 'sweep' | 'warning' | 'strike', id: string) {
    if (!this.enabled || this.played.has(id)) return;
    this.played.add(id);
    try {
      const ctx = this.getCtx();
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);

      if (type === 'blip') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'alert') {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(520, now + 0.1);
        osc.frequency.setValueAtTime(440, now + 0.2);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'warning') {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.3);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'boom') {
        // Low rumble
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.6);
        // Impact noise
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
        const noise = ctx.createBufferSource();
        noise.buffer = buf;
        const g2 = ctx.createGain();
        g2.gain.setValueAtTime(0.08, now);
        g2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        noise.connect(g2);
        g2.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'strike') {
        // Double boom
        for (let j = 0; j < 2; j++) {
          const t = now + j * 0.15;
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(80, t);
          osc.frequency.exponentialRampToValueAtTime(25, t + 0.4);
          const g = ctx.createGain();
          g.gain.setValueAtTime(0.1, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.5);
        }
        // Siren tail
        const osc2 = ctx.createOscillator();
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(200, now + 0.3);
        osc2.frequency.linearRampToValueAtTime(800, now + 0.8);
        osc2.frequency.linearRampToValueAtTime(200, now + 1.3);
        const g3 = ctx.createGain();
        g3.gain.setValueAtTime(0, now + 0.3);
        g3.gain.linearRampToValueAtTime(0.04, now + 0.5);
        g3.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
        osc2.connect(g3);
        g3.connect(ctx.destination);
        osc2.start(now + 0.3);
        osc2.stop(now + 1.4);
      } else if (type === 'sweep') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.6);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Audio not supported
    }
  }

  reset() { this.played.clear(); }
}

/* ── Speech narration using Web Speech API ── */
class TimelineNarrator {
  public enabled = false; // starts disabled — user must opt in
  private narrated = new Set<string>();
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded = false;

  constructor() {
    this.loadVoices();
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    const load = () => {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0) this.voicesLoaded = true;
    };
    
    load();
    // Chrome loads voices async
    window.speechSynthesis.onvoiceschanged = () => load();
    // Retry a few times
    setTimeout(load, 100);
    setTimeout(load, 500);
    setTimeout(load, 1000);
  }

  private findVoice(langCode: string): SpeechSynthesisVoice | null {
    // Refresh voice list
    if (!this.voicesLoaded) {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0) this.voicesLoaded = true;
    }

    const prefix = langCode === 'he' ? 'he' : 'en';

    // Priority: exact match local > exact match > partial match
    const exactLocal = this.voices.find(v => v.lang.startsWith(prefix) && v.localService);
    if (exactLocal) return exactLocal;

    const exact = this.voices.find(v => v.lang.startsWith(prefix));
    if (exact) return exact;

    // For Hebrew: also try 'iw' (old Java locale code used by some Android)
    if (langCode === 'he') {
      const iwVoice = this.voices.find(v => v.lang.startsWith('iw'));
      if (iwVoice) return iwVoice;
    }

    return null;
  }

  speak(text: string, lang: string, id: string) {
    if (!this.enabled || this.narrated.has(id)) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.narrated.add(id);

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const doSpeak = () => {
      // Break text into sentences for reliable playback (Chrome bug workaround)
      const sentences = text.split(/(?<=[.!?،])\s+/).filter(s => s.trim().length > 0);
      
      const voice = this.findVoice(lang);
      
      sentences.forEach((sentence, i) => {
        const utter = new SpeechSynthesisUtterance(sentence);
        utter.lang = lang === 'he' ? 'he-IL' : 'en-US';
        utter.rate = lang === 'he' ? 0.88 : 0.85;
        utter.pitch = 0.85;
        utter.volume = 1.0;

        if (voice) {
          utter.voice = voice;
          utter.lang = voice.lang;
        }
        
        // Small pause between sentences
        if (i > 0) {
          const pause = new SpeechSynthesisUtterance('');
          pause.lang = utter.lang;
          if (voice) pause.voice = voice;
          window.speechSynthesis.speak(pause);
        }

        window.speechSynthesis.speak(utter);
      });

      // Chrome keepalive: pause/resume every 10s to prevent cutoff
      const keepAlive = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(keepAlive);
          return;
        }
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }, 10000);
    };

    // If voices not loaded yet, wait and retry
    if (!this.voicesLoaded || this.voices.length === 0) {
      setTimeout(() => {
        this.voices = window.speechSynthesis.getVoices();
        this.voicesLoaded = this.voices.length > 0;
        doSpeak();
      }, 300);
    } else {
      doSpeak();
    }
  }

  stop() { 
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
    }
  }
  
  reset() { this.narrated.clear(); }
}

const audioEngine = typeof window !== 'undefined' ? new TimelineAudio() : null;
const narrator = typeof window !== 'undefined' ? new TimelineNarrator() : null;

// Narration scripts — more dramatic than the desc text
const narrationScripts: Record<string, { he: string; en: string }> = {
  '2002': {
    he: 'שנת 2002. בתיאטרון נורד-אוסט במוסקבה, כוחות מיוחדים רוסיים משתמשים בנגזרת פנטניל. 130 בני ערובה נהרגו. איראן לומדת את הלקח.',
    en: '2002. At the Nord-Ost theater in Moscow, Russian special forces deploy a fentanyl derivative. 130 hostages die. Iran takes note.',
  },
  '2005': {
    he: 'שנת 2005. אוניברסיטת אימאם חוסיין מתחילה לפרסם מאמרים על סינתזת פנטניל וחומרי עצב. התוכנית יוצאת לדרך.',
    en: '2005. Imam Hossein University begins publishing research on fentanyl synthesis and nerve agent precursors. The program is born.',
  },
  '2014': {
    he: 'שנת 2014. מחלקת הכימיה של IHU מנסה לרכוש אלפי מנות מדטומידין מסין. אין שום מחקר רפואי שמצדיק את זה.',
    en: '2014. The IHU chemistry department attempts to procure thousands of medetomidine doses from China. No medical research justifies the quantity.',
  },
  '2023': {
    he: 'שנת 2023. מסמכי "פרויקט הרתעה" דולפים. רימוני גז טקטיים עם 40 אחוז מדטומידין. הראיה הישירה הראשונה.',
    en: '2023. "Project Deterrence" documents leak. Tactical gas grenades loaded with 40 percent medetomidine. The first direct evidence.',
  },
  '2025': {
    he: 'יוני 2025. צה"ל תוקף. מתחם שהיד מייסמי מושמד. מבנה מזרחי בקמפוס IHU נפגע. 15 הרוגים.',
    en: 'June 2025. The IDF strikes. Shahid Meisami complex destroyed. An eastern building on the IHU campus is hit. 15 killed.',
  },
  '2026': {
    he: 'מרץ 2026. 80 מטוסי קרב ישראליים תוקפים שלוש מטרות ספציפיות בקמפוס. מרכז הכימיה. מנהרות הרוח. מרכז ההנדסה.',
    en: 'March 2026. 80 Israeli fighter jets strike three specific campus targets. The Chemistry Center. The Wind Tunnels. The Engineering Center.',
  },
};

const eventsData: { year: string; icon: typeof Eye; colorClass: string; sound: 'blip' | 'alert' | 'boom' | 'sweep' | 'warning' | 'strike'; he: { label: string; desc: string }; en: { label: string; desc: string } }[] = [
  { year: '2002', icon: Eye, sound: 'blip', colorClass: 'border-amber-500 bg-amber-500/10 text-amber-400', he: { label: 'השראה', desc: 'שימוש בנגזרת פנטניל בתיאטרון במוסקבה — 130 בני ערובה נהרגו' }, en: { label: 'Inspiration', desc: 'Fentanyl derivative used at Moscow theater — 130 hostages killed' } },
  { year: '2005', icon: Flame, sound: 'sweep', colorClass: 'border-blue-500 bg-blue-500/10 text-blue-400', he: { label: 'מחקר', desc: 'תחילת פרסום מאמרים על ייצור פנטניל וחומרי גלם לייצור חומרי עצב ב-IHU' }, en: { label: 'Research', desc: 'First publications on fentanyl synthesis and nerve agent precursors at IHU' } },
  { year: '2014', icon: ShoppingCart, sound: 'alert', colorClass: 'border-red-500 bg-red-500/10 text-red-400', he: { label: 'רכש', desc: 'ניסיון רכישת אלפי מנות מדטומידין מסין — ללא היסטוריה רפואית במחלקה' }, en: { label: 'Procurement', desc: 'Attempted purchase of thousands of medetomidine doses from China — no medical research history' } },
  { year: '2023', icon: FileWarning, sound: 'warning', colorClass: 'border-purple-500 bg-purple-500/10 text-purple-400', he: { label: 'חשיפה', desc: 'הדלפת מסמכי פרויקט הרתעה — רימוני גז מבוססי מדטומידין' }, en: { label: 'Exposure', desc: 'Leak of Project Deterrence documents — medetomidine-based grenades' } },
  { year: '2025', icon: Bomb, sound: 'boom', colorClass: 'border-orange-500 bg-orange-500/10 text-orange-400', he: { label: 'השמדה', desc: 'תקיפה ישראלית — השמדת מתחם שהיד מייסמי ותקיפת IHU' }, en: { label: 'Destruction', desc: 'Israeli strike — Shahid Meisami complex destroyed, IHU struck' } },
  { year: '2026', icon: Crosshair, sound: 'strike', colorClass: 'border-red-600 bg-red-600/10 text-red-500', he: { label: 'סיכול', desc: 'תקיפות צה"ל על 3 מטרות ספציפיות בקמפוס IHU — מרכז כימיה, מנהרות רוח, מרכז הנדסה' }, en: { label: 'Targeted Strike', desc: 'IDF strikes on 3 specific IHU campus targets — Chemistry, Wind Tunnels, Engineering' } },
];

function TimelineEvent({ ev, index, lang, narrationOn, soundOn, onActivate }: { ev: typeof eventsData[0]; index: number; lang: string; narrationOn: boolean; soundOn: boolean; onActivate: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const autoPlayed = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play on scroll (only works if AudioContext already unlocked)
  useEffect(() => {
    if (isInView && !autoPlayed.current && soundOn) {
      autoPlayed.current = true;
      if (audioEngine && audioEngine.enabled) {
        audioEngine.play(ev.sound, `auto-${ev.year}`);
      }
      if (narrator && narrationOn && narrator.enabled) {
        const script = narrationScripts[ev.year];
        if (script) {
          setTimeout(() => {
            narrator.speak(lang === 'he' ? script.he : script.en, lang, `auto-${ev.year}`);
          }, 800);
        }
      }
    }
  }, [isInView, ev.sound, ev.year, lang, narrationOn, soundOn]);

  // Manual play on card click — this is a user gesture so it unlocks audio!
  const handleClick = useCallback(() => {
    onActivate(); // unlock AudioContext via user gesture
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);

    if (audioEngine) {
      audioEngine.unlock();
      // Force play even if already played
      audioEngine.play(ev.sound, `click-${ev.year}-${Date.now()}`);
    }
    if (narrator && narrationOn) {
      const script = narrationScripts[ev.year];
      if (script) {
        setTimeout(() => {
          narrator.speak(lang === 'he' ? script.he : script.en, lang, `click-${ev.year}-${Date.now()}`);
        }, 600);
      }
    }
  }, [ev, lang, narrationOn, onActivate]);

  const Icon = ev.icon;
  const data = lang === 'he' ? ev.he : ev.en;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex items-start gap-4 mb-8 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Icon circle */}
      <div className="flex-shrink-0 z-10">
        <motion.div
          whileHover={{ scale: 1.15 }}
          animate={isPlaying ? {
            boxShadow: [
              '0 0 0px rgba(255,255,255,0)',
              '0 0 25px rgba(255,255,255,0.3)',
              '0 0 0px rgba(255,255,255,0)',
            ]
          } : isInView ? {
            boxShadow: [
              `0 0 0px ${ev.colorClass.includes('red') ? 'rgba(239,68,68,0)' : ev.colorClass.includes('amber') ? 'rgba(245,158,11,0)' : 'rgba(59,130,246,0)'}`,
              `0 0 20px ${ev.colorClass.includes('red') ? 'rgba(239,68,68,0.4)' : ev.colorClass.includes('amber') ? 'rgba(245,158,11,0.4)' : 'rgba(59,130,246,0.4)'}`,
              `0 0 0px ${ev.colorClass.includes('red') ? 'rgba(239,68,68,0)' : ev.colorClass.includes('amber') ? 'rgba(245,158,11,0)' : 'rgba(59,130,246,0)'}`,
            ]
          } : {}}
          transition={{ duration: 2, repeat: isPlaying ? 1 : isInView ? 2 : 0 }}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 ${ev.colorClass} flex items-center justify-center bg-[#0d0d1a]`}
        >
          <Icon size={18} />
        </motion.div>
      </div>
      {/* Content card */}
      <div className={`flex-1 p-4 rounded-xl border ${ev.colorClass} backdrop-blur-sm group-hover:bg-white/[0.02] transition-colors`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xl font-black">{ev.year}</span>
          <span className="text-xs font-bold opacity-70">{data.label}</span>
          {/* Play indicator */}
          <motion.span
            className="text-[8px] font-mono opacity-0 group-hover:opacity-60 transition-opacity"
            animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 0.5, repeat: isPlaying ? 3 : 0 }}
          >
            {isPlaying ? '▶ ...' : (lang === 'he' ? '▶ לחץ להשמעה' : '▶ click to play')}
          </motion.span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{data.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const { t, lang } = useLang();
  const [soundOn, setSoundOn] = useState(true);
  const [narrationOn, setNarrationOn] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  /** Called from user gesture to unlock AudioContext */
  const activateAudio = useCallback(() => {
    if (audioEngine) audioEngine.unlock();
  }, []);

  /** Play all events sequentially with sound + narration */
  const playAll = useCallback(() => {
    activateAudio();
    if (audioEngine) { audioEngine.enabled = true; audioEngine.reset(); }
    if (narrator) { narrator.reset(); narrator.enabled = narrationOn; }
    setSoundOn(true);
    setIsPlayingAll(true);

    eventsData.forEach((ev, i) => {
      const delay = i * (narrationOn ? 8000 : 2000);
      setTimeout(() => {
        if (audioEngine) audioEngine.play(ev.sound, `all-${ev.year}-${Date.now()}`);
        if (narrator && narrationOn) {
          const script = narrationScripts[ev.year];
          if (script) {
            setTimeout(() => {
              narrator.speak(lang === 'he' ? script.he : script.en, lang, `all-${ev.year}-${Date.now()}`);
            }, 600);
          }
        }
        // Scroll to event
        const el = document.getElementById(`timeline-event-${ev.year}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, delay);
    });

    // End playing state
    setTimeout(() => setIsPlayingAll(false), eventsData.length * (narrationOn ? 8000 : 2000) + 2000);
  }, [lang, narrationOn, activateAudio]);

  const toggleSound = useCallback(() => {
    activateAudio();
    setSoundOn(prev => {
      const next = !prev;
      if (audioEngine) {
        audioEngine.enabled = next;
        if (next) audioEngine.reset();
      }
      if (!next) {
        setNarrationOn(false);
        if (narrator) { narrator.enabled = false; narrator.stop(); }
      }
      return next;
    });
  }, [activateAudio]);

  const toggleNarration = useCallback(() => {
    activateAudio();
    setNarrationOn(prev => {
      const next = !prev;
      if (narrator) {
        narrator.enabled = next;
        if (next) narrator.reset();
        else narrator.stop();
      }
      if (next && !soundOn) {
        setSoundOn(true);
        if (audioEngine) { audioEngine.enabled = true; audioEngine.reset(); }
      }
      return next;
    });
  }, [soundOn, activateAudio]);

  return (
    <section id="timeline" className="relative py-20 px-4 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('timeline.title')}</h2>
        <p className="text-gray-400">{t('timeline.subtitle')}</p>
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          {/* Play All button — the main CTA */}
          <motion.button
            onClick={playAll}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isPlayingAll}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-mono font-bold border transition-colors ${
              isPlayingAll
                ? 'border-green-500/50 bg-green-500/20 text-green-400 animate-pulse'
                : 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20'
            }`}
          >
            <Play size={14} />
            {isPlayingAll
              ? (lang === 'he' ? 'מנגן...' : 'Playing...')
              : (lang === 'he' ? 'נגן הכל' : 'Play All')}
          </motion.button>

          <motion.button
            onClick={toggleSound}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono border transition-colors ${
              soundOn
                ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                : 'border-gray-700/30 bg-gray-800/30 text-gray-500'
            }`}
          >
            {soundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
            {soundOn
              ? (lang === 'he' ? 'צלילים' : 'Sound')
              : (lang === 'he' ? 'צלילים כבויים' : 'Sound OFF')}
          </motion.button>

          <motion.button
            onClick={toggleNarration}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono border transition-colors ${
              narrationOn
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                : 'border-gray-700/30 bg-gray-800/30 text-gray-500'
            }`}
          >
            {narrationOn ? <Mic size={12} /> : <MicOff size={12} />}
            {narrationOn
              ? (lang === 'he' ? 'קריינות' : 'Narration')
              : (lang === 'he' ? 'קריינות כבויה' : 'Narrate OFF')}
          </motion.button>
        </div>
        <p className="text-[9px] text-gray-600 mt-2 font-mono">
          {lang === 'he' ? 'לחצו על כל אירוע להשמעת צליל וקריינות, או "נגן הכל" לחוויה מלאה' : 'Click any event for sound & narration, or "Play All" for the full experience'}
        </p>
      </motion.div>
      <div className="relative">
        {/* Vertical fuse line */}
        <motion.div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="w-full rounded-full"
            style={{ background: 'linear-gradient(180deg, #f59e0b, #ef4444, #7c3aed)' }}
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </motion.div>

        {eventsData.map((ev, i) => (
          <div key={ev.year} id={`timeline-event-${ev.year}`}>
            <TimelineEvent ev={ev} index={i} lang={lang} narrationOn={narrationOn} soundOn={soundOn} onActivate={activateAudio} />
          </div>
        ))}
      </div>
    </section>
  );
}
