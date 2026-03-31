'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bomb, Plane, Wind, Play, RotateCcw, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

type Platform = 'grenade' | 'drone' | 'fog';

interface Step {
  he: string;
  en: string;
  duration: number; // ms to show this step
}

const steps: Record<Platform, Step[]> = {
  grenade: [
    { he: 'שליפת רימון ABC-M7A2/A3 מנשא', en: 'ABC-M7A2/A3 grenade drawn from carrier', duration: 1500 },
    { he: 'שחרור סיכת ביטחון והשלכה לחלל סגור', en: 'Safety pin released, thrown into enclosed space', duration: 1500 },
    { he: 'התלקחות מילוי — 18 גרם, 40% מדטומידין', en: 'Fill ignition — 18g, 40% medetomidine', duration: 2000 },
    { he: 'פיזור אירוסול בחלל — רדיוס 5-8 מטר', en: 'Aerosol dispersal in space — 5-8 meter radius', duration: 2500 },
    { he: 'שאיפת חומר — איבוד הכרה תוך 60-90 שניות', en: 'Agent inhalation — unconsciousness within 60-90 seconds', duration: 2500 },
    { he: 'נטרול מוחלט של כל הנוכחים בחלל', en: 'Complete neutralization of all occupants', duration: 2000 },
  ],
  drone: [
    { he: 'שיגור רחפן ארבעין — VTOL קואדקופטר', en: 'Arbaeen drone launch — VTOL quadcopter', duration: 1500 },
    { he: 'עלייה לגובה 50 מטר, ניווט GPS למטרה', en: 'Climbing to 50m altitude, GPS navigation to target', duration: 2000 },
    { he: 'הגעה מעל מטרה — טווח עד 10 ק"מ', en: 'Arriving above target — range up to 10km', duration: 2000 },
    { he: 'שחרור מטען כימי — 7 ק"ג חומר פעיל', en: 'Chemical payload release — 7kg active agent', duration: 2000 },
    { he: 'פיזור אירוסולי מגובה — כיסוי שטח רחב', en: 'Aerial aerosol dispersal — wide area coverage', duration: 2500 },
    { he: 'פגיעה בנשימה תוך דקות — ללא אזהרה מוקדמת', en: 'Respiratory impact within minutes — no early warning', duration: 2500 },
  ],
  fog: [
    { he: 'הפעלת מערכת מייצר ערפל על משאית', en: 'Truck-mounted fog generator system activation', duration: 1500 },
    { he: 'חימום תמיסת מדטומידין/פנטניל לנקודת אידוי', en: 'Heating medetomidine/fentanyl solution to vaporization point', duration: 2000 },
    { he: 'התחלת ריסוס — סילון ערפל בלחץ גבוה', en: 'Spray initiation — high-pressure fog jet', duration: 2000 },
    { he: 'ענן כימי מתפשט ברוח — כיסוי מאות מטרים', en: 'Chemical cloud spreading with wind — hundreds of meters coverage', duration: 3000 },
    { he: 'ריכוז קטלני/משתק מושג בשטח פתוח', en: 'Lethal/incapacitating concentration achieved in open area', duration: 2500 },
    { he: 'אזור נפגעים רחב — ללא הגנה אפשרית ללא ציוד', en: 'Wide casualty zone — no protection possible without equipment', duration: 2500 },
  ],
};

const platformMeta: Record<Platform, { icon: typeof Bomb; color: string; he: string; en: string }> = {
  grenade: { icon: Bomb, color: '#ef4444', he: 'רימון גז טקטי', en: 'Tactical Gas Grenade' },
  drone: { icon: Plane, color: '#3b82f6', he: 'חימוש נישא רחפן', en: 'Drone-Carried Munition' },
  fog: { icon: Wind, color: '#f59e0b', he: 'מייצר ערפל', en: 'Fog Generator' },
};

/* ── SVG Animations per platform ── */

function GrenadeAnim({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Room outline */}
      <rect x="50" y="40" width="300" height="180" rx="4" fill="none" stroke="#333" strokeWidth="1.5" />
      <text x="200" y="30" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">
        {step < 2 ? 'ENCLOSED SPACE' : 'CONTAMINATED ZONE'}
      </text>
      {/* Door */}
      <rect x="46" y="120" width="8" height="60" fill={step >= 1 ? '#1a1a1a' : '#333'} stroke="#444" strokeWidth="1" />

      {/* Person throwing (steps 0-1) */}
      {step <= 1 && (
        <g>
          <circle cx="30" cy="145" r="6" fill="#666" />
          <line x1="30" y1="151" x2="30" y2="172" stroke="#666" strokeWidth="2" />
          <motion.line x1="30" y1="157" x2={step === 1 ? 50 : 38} y2={step === 1 ? 140 : 162} stroke="#666" strokeWidth="2"
            animate={{ x2: step === 1 ? 50 : 38, y2: step === 1 ? 140 : 162 }} />
        </g>
      )}

      {/* Grenade trajectory (step 1) */}
      {step === 1 && (
        <motion.circle cx="55" cy="145" r="4" fill={platformMeta.grenade.color}
          animate={{ cx: [55, 120, 200], cy: [145, 100, 130] }}
          transition={{ duration: 1, ease: 'easeOut' }} />
      )}

      {/* Grenade on ground (step 2+) */}
      {step >= 2 && (
        <motion.g animate={step === 2 ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.5, repeat: step === 2 ? 2 : 0 }}>
          <rect x="195" y="126" width="10" height="15" rx="2" fill="#1a1a2e" stroke={platformMeta.grenade.color} strokeWidth="1.5" />
        </motion.g>
      )}

      {/* Gas cloud expanding (steps 3+) */}
      {step >= 3 && (
        <>
          {[
            { cx: 200, cy: 120, delay: 0 },
            { cx: 160, cy: 100, delay: 0.3 },
            { cx: 240, cy: 110, delay: 0.2 },
            { cx: 180, cy: 145, delay: 0.5 },
            { cx: 230, cy: 140, delay: 0.4 },
            { cx: 140, cy: 130, delay: 0.7 },
            { cx: 260, cy: 125, delay: 0.6 },
            { cx: 200, cy: 160, delay: 0.8 },
          ].map((c, i) => (
            <motion.circle key={i} cx={c.cx} cy={c.cy} r="0" fill={`${platformMeta.grenade.color}08`} stroke={`${platformMeta.grenade.color}15`} strokeWidth="0.5"
              animate={{ r: [0, 20 + i * 5, 15 + i * 5], opacity: [0, 0.6, 0.3] }}
              transition={{ duration: 2, delay: c.delay, repeat: Infinity, repeatType: 'reverse' }} />
          ))}
        </>
      )}

      {/* People inside (steps 4+: collapsing) */}
      {step >= 0 && [
        { x: 130, y: 170 }, { x: 200, y: 180 }, { x: 270, y: 165 }, { x: 170, y: 195 }, { x: 240, y: 190 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={step >= 5 ? p.y + 15 : p.y - 20} r="5"
            fill={step >= 4 ? '#8b0000' : '#666'} opacity={step < 2 ? 1 : 0.7} />
          {step < 5 && <line x1={p.x} y1={p.y - 14} x2={p.x} y2={p.y + 5} stroke={step >= 4 ? '#8b0000' : '#666'} strokeWidth="1.5" />}
          {step >= 5 && (
            <motion.line x1={p.x - 8} y1={p.y + 13} x2={p.x + 8} y2={p.y + 17}
              stroke="#8b0000" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          )}
        </g>
      ))}

      {/* Radius indicator (step 3+) */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <line x1="140" y1="210" x2="260" y2="210" stroke={platformMeta.grenade.color} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
          <text x="200" y="225" textAnchor="middle" fill={platformMeta.grenade.color} fontSize="8" fontFamily="monospace" opacity="0.7">5-8m</text>
        </motion.g>
      )}
    </svg>
  );
}

function DroneAnim({ step }: { step: number }) {
  const droneY = step === 0 ? 200 : step === 1 ? 60 : 55;
  const droneX = step <= 1 ? 80 : step === 2 ? 200 : 200;

  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Sky gradient */}
      <rect width="400" height="250" fill="#0a0a14" />
      {/* Ground */}
      <rect x="0" y="200" width="400" height="50" fill="#111" stroke="#222" strokeWidth="0.5" />
      {/* Target area on ground */}
      <ellipse cx="200" cy="210" rx="60" ry="8" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="4 3" />
      {step >= 2 && <text x="200" y="230" textAnchor="middle" fill="#555" fontSize="8" fontFamily="monospace">TARGET ZONE</text>}

      {/* People on ground */}
      {[160, 180, 200, 220, 240].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={step >= 5 ? 215 : 200} r="3" fill={step >= 5 ? '#8b0000' : '#555'} />
          {step < 5 && <line x1={x} y1={203} x2={x} y2={210} stroke="#555" strokeWidth="1" />}
        </g>
      ))}

      {/* Drone */}
      <motion.g animate={{ x: droneX - 80, y: droneY - 200 }} transition={{ duration: 1.5, ease: 'easeInOut' }}>
        {/* Body */}
        <rect x="72" y="195" width="16" height="8" rx="2" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1" />
        {/* Arms */}
        <line x1="72" y1="198" x2="60" y2="192" stroke="#3b82f680" strokeWidth="1.5" />
        <line x1="88" y1="198" x2="100" y2="192" stroke="#3b82f680" strokeWidth="1.5" />
        {/* Rotors */}
        <motion.ellipse cx="60" cy="190" rx="10" ry="2" fill="none" stroke="#3b82f640" strokeWidth="0.8"
          animate={{ ry: [2, 4, 2] }} transition={{ duration: 0.3, repeat: Infinity }} />
        <motion.ellipse cx="100" cy="190" rx="10" ry="2" fill="none" stroke="#3b82f640" strokeWidth="0.8"
          animate={{ ry: [2, 4, 2] }} transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }} />
        {/* Payload */}
        {step < 3 && <rect x="76" y="203" width="8" height="6" rx="1" fill="#1a1a2e" stroke="#ef444480" strokeWidth="0.8" />}
      </motion.g>

      {/* Payload dropping (step 3) */}
      {step === 3 && (
        <motion.rect x="196" y="60" width="8" height="6" rx="1" fill="#ef4444" stroke="#ef444480"
          animate={{ y: [60, 190], opacity: [1, 0.5] }} transition={{ duration: 1.5 }} />
      )}

      {/* Dispersal cloud (steps 4+) */}
      {step >= 4 && (
        <>
          {[
            { cx: 200, cy: 190, r: 15 }, { cx: 180, cy: 185, r: 12 }, { cx: 220, cy: 188, r: 13 },
            { cx: 160, cy: 192, r: 10 }, { cx: 240, cy: 195, r: 11 }, { cx: 200, cy: 180, r: 18 },
            { cx: 170, cy: 195, r: 14 }, { cx: 230, cy: 190, r: 12 },
          ].map((c, i) => (
            <motion.circle key={i} cx={c.cx} cy={c.cy} r="0" fill={`${platformMeta.drone.color}06`} stroke={`${platformMeta.drone.color}12`} strokeWidth="0.5"
              animate={{ r: [0, c.r + 10, c.r + 5], opacity: [0, 0.5, 0.25] }}
              transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse' }} />
          ))}
        </>
      )}

      {/* Altitude indicator */}
      {step >= 1 && step <= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>
          <line x1="350" y1="55" x2="350" y2="200" stroke="#3b82f640" strokeWidth="0.5" strokeDasharray="3 3" />
          <text x="360" y="130" fill="#3b82f6" fontSize="7" fontFamily="monospace">50m</text>
        </motion.g>
      )}
    </svg>
  );
}

function FogAnim({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Ground */}
      <rect width="400" height="250" fill="#0a0a14" />
      <rect x="0" y="190" width="400" height="60" fill="#111" />

      {/* Truck */}
      <g>
        <rect x="30" y="160" width="70" height="28" rx="2" fill="#1a1a2e" stroke="#f59e0b60" strokeWidth="1.2" />
        <rect x="30" y="155" width="25" height="33" rx="2" fill="#1a1a2e" stroke="#f59e0b80" strokeWidth="1.2" />
        <circle cx="45" cy="192" r="6" fill="#1a1a2e" stroke="#f59e0b50" strokeWidth="1.2" />
        <circle cx="85" cy="192" r="6" fill="#1a1a2e" stroke="#f59e0b50" strokeWidth="1.2" />
        {/* Nozzle */}
        <rect x="100" y="158" width="15" height="12" rx="2" fill="#1a1a2e" stroke="#f59e0b80" strokeWidth="1" />
        {step >= 1 && (
          <motion.circle cx="115" cy="164" r="3" fill="#f59e0b60"
            animate={{ r: [3, 5, 3], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
        )}
      </g>

      {/* Wind arrow */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}>
          <line x1="150" y1="40" x2="300" y2="40" stroke="#f59e0b" strokeWidth="1" />
          <polygon points="300,36 310,40 300,44" fill="#f59e0b" />
          <text x="225" y="35" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace">WIND</text>
        </motion.g>
      )}

      {/* Fog cloud — progressively expanding */}
      {step >= 2 && (
        <>
          {Array.from({ length: step >= 4 ? 20 : step >= 3 ? 12 : 5 }).map((_, i) => {
            const cx = 120 + i * 15 + Math.sin(i) * 20;
            const cy = 140 + Math.cos(i * 2) * 25;
            const r = 12 + (i % 5) * 4;
            return (
              <motion.circle key={i} cx={cx} cy={cy} r="0" fill={`${platformMeta.fog.color}04`} stroke={`${platformMeta.fog.color}08`} strokeWidth="0.3"
                animate={{ r: [0, r, r - 3], opacity: [0, 0.4, 0.2], cx: [cx, cx + 10, cx + 15] }}
                transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' }} />
            );
          })}
        </>
      )}

      {/* People at various distances */}
      {[150, 200, 250, 300, 340].map((x, i) => {
        const affected = step >= 5 && x < 300;
        const falling = step >= 5 && x < 260;
        return (
          <g key={i}>
            <circle cx={x} cy={falling ? 195 : 180} r="3" fill={affected ? '#8b0000' : '#555'} />
            {!falling && <line x1={x} y1={183} x2={x} y2={192} stroke={affected ? '#8b0000' : '#555'} strokeWidth="1" />}
          </g>
        );
      })}

      {/* Distance markers */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}>
          {[150, 250, 350].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="200" x2={x} y2="208" stroke="#f59e0b" strokeWidth="0.5" />
              <text x={x} y="218" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">{(i + 1) * 100}m</text>
            </g>
          ))}
        </motion.g>
      )}
    </svg>
  );
}

const animations: Record<Platform, React.FC<{ step: number }>> = {
  grenade: GrenadeAnim,
  drone: DroneAnim,
  fog: FogAnim,
};

export default function Simulation() {
  const { lang } = useLang();
  const isHe = lang === 'he';
  const [platform, setPlatform] = useState<Platform>('grenade');
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = steps[platform].length;
  const Anim = animations[platform];

  const play = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(true);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
  }, []);

  // Auto-advance steps
  useEffect(() => {
    if (!isPlaying || currentStep < 0 || currentStep >= totalSteps) {
      if (currentStep >= totalSteps) setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, steps[platform][currentStep].duration);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, platform, totalSteps]);

  // Reset on platform change
  useEffect(() => { reset(); }, [platform, reset]);

  const meta = platformMeta[platform];
  const Icon = meta.icon;

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
          {isHe ? 'הדמיית תרחיש' : 'Scenario Simulation'}
        </h2>
        <p className="text-gray-400 text-sm">
          {isHe ? 'בחרו פלטפורמה ולחצו הפעל לצפייה בתרחיש שלב אחר שלב' : 'Select a platform and press play to watch the step-by-step scenario'}
        </p>
      </motion.div>

      {/* Platform selector */}
      <div className="flex justify-center gap-3 mb-6">
        {(['grenade', 'drone', 'fog'] as Platform[]).map((p) => {
          const m = platformMeta[p];
          const PIcon = m.icon;
          const active = platform === p;
          return (
            <motion.button
              key={p}
              onClick={() => setPlatform(p)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                active
                  ? 'border-white/20 bg-white/5 text-white'
                  : 'border-gray-700/30 bg-gray-900/30 text-gray-500 hover:text-gray-300'
              }`}
            >
              <PIcon size={14} style={{ color: active ? m.color : undefined }} />
              {isHe ? m.he : m.en}
            </motion.button>
          );
        })}
      </div>

      {/* Simulation viewport */}
      <div className="rounded-2xl border border-gray-700/40 bg-[#0a0a14] overflow-hidden">
        {/* Animation area */}
        <div className="relative" style={{ aspectRatio: '16/10' }}>
          <AnimatePresence mode="wait">
            <motion.div key={platform} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              <Anim step={Math.max(0, currentStep)} />
            </motion.div>
          </AnimatePresence>

          {/* Step indicator overlay */}
          {currentStep >= 0 && currentStep < totalSteps && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 left-3 right-3 z-10"
            >
              <div className="bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border" style={{ borderColor: `${meta.color}30` }}>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ color: meta.color, backgroundColor: `${meta.color}20` }}>
                    {currentStep + 1}/{totalSteps}
                  </span>
                  <span className="text-xs text-gray-200">
                    {isHe ? steps[platform][currentStep].he : steps[platform][currentStep].en}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Done overlay */}
          {currentStep >= totalSteps && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-center">
                <div className="text-2xl font-black mb-2" style={{ color: meta.color }}>
                  {isHe ? 'סיום תרחיש' : 'Scenario Complete'}
                </div>
                <motion.button onClick={reset} whileHover={{ scale: 1.1 }} className="text-xs text-gray-400 flex items-center gap-1 mx-auto">
                  <RotateCcw size={12} /> {isHe ? 'הפעל שוב' : 'Replay'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Play button (before start) */}
          {currentStep < 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.button
                onClick={play}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                style={{ borderColor: `${meta.color}60`, backgroundColor: `${meta.color}15` }}
              >
                <Play size={28} style={{ color: meta.color }} fill={meta.color} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-800">
          <motion.div
            className="h-full"
            style={{ backgroundColor: meta.color }}
            animate={{ width: currentStep < 0 ? '0%' : `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step list */}
        <div className="p-4 space-y-1.5">
          {steps[platform].map((s, i) => {
            const isPast = currentStep > i;
            const isCurrent = currentStep === i;
            return (
              <div key={i} className={`flex items-start gap-2 text-[11px] transition-colors ${isCurrent ? 'text-white' : isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                <div className="flex-shrink-0 mt-0.5">
                  {isPast ? (
                    <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${meta.color}30` }}>
                      <span style={{ color: meta.color }} className="text-[8px]">✓</span>
                    </div>
                  ) : isCurrent ? (
                    <motion.div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${meta.color}40`, border: `1.5px solid ${meta.color}` }}
                      animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-700" />
                  )}
                </div>
                <span className="leading-relaxed">{isHe ? s.he : s.en}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
