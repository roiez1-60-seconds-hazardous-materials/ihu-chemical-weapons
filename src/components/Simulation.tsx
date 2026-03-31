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
/* ── SVG Animations per platform — realistic detail ── */

function GrenadeAnim({ step }: { step: number }) {
  // Generate consistent particle positions
  const gasParticles = Array.from({ length: 35 }, (_, i) => ({
    cx: 180 + Math.cos(i * 0.8) * (40 + i * 3),
    cy: 100 + Math.sin(i * 1.1) * (30 + i * 2),
    r: 8 + (i % 7) * 4,
    delay: i * 0.12,
    dur: 2.5 + (i % 4) * 0.5,
  }));

  return (
    <svg viewBox="0 0 500 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gasGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#ef4444" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a22" />
          <stop offset="100%" stopColor="#111118" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* Room — concrete walls with texture */}
      <rect x="60" y="30" width="380" height="230" fill="#0e0e14" />
      <rect x="60" y="30" width="380" height="230" fill="none" stroke="#2a2a35" strokeWidth="3" />
      {/* Floor */}
      <rect x="60" y="200" width="380" height="60" fill="url(#floorGrad)" />
      {/* Floor line */}
      <line x1="60" y1="200" x2="440" y2="200" stroke="#2a2a35" strokeWidth="0.5" />
      {/* Ceiling light */}
      <rect x="230" y="32" width="40" height="4" fill="#222" rx="1" />
      <motion.line x1="250" y1="36" x2="250" y2="36" stroke={step >= 3 ? '#ef444440' : '#ffff0015'} strokeWidth="60"
        animate={{ opacity: step >= 3 ? [0.05, 0.15, 0.05] : 0.03 }}
        transition={{ duration: 2, repeat: Infinity }} />

      {/* Door (left wall) */}
      <rect x="56" y="90" width="8" height="110" fill="#1e1e28" stroke="#333" strokeWidth="1" rx="1" />
      <circle cx="62" cy="145" r="1.5" fill="#555" />
      {/* Window (right wall) with bars */}
      <rect x="430" y="70" width="8" height="60" fill="#0a0a12" stroke="#333" strokeWidth="1" />
      {[80, 95, 110, 125].map((y, i) => <line key={i} x1="430" y1={y} x2="438" y2={y} stroke="#33333380" strokeWidth="0.5" />)}

      {/* Table in room */}
      <rect x="200" y="165" width="80" height="3" fill="#252530" rx="1" />
      <line x1="210" y1="168" x2="210" y2="198" stroke="#252530" strokeWidth="2" />
      <line x1="270" y1="168" x2="270" y2="198" stroke="#252530" strokeWidth="2" />
      {/* Chairs */}
      <rect x="185" y="175" width="12" height="12" fill="none" stroke="#222" strokeWidth="1" rx="1" />
      <rect x="285" y="175" width="12" height="12" fill="none" stroke="#222" strokeWidth="1" rx="1" />

      {/* Operator outside door (steps 0-1) */}
      {step <= 1 && (
        <motion.g animate={step === 1 ? { opacity: [1, 0.5] } : {}} transition={{ duration: 0.5 }}>
          {/* Head */}
          <circle cx="35" cy="120" r="7" fill="#3a3a45" />
          {/* Helmet */}
          <path d="M 28 118 Q 35 108 42 118" fill="#2a2a35" stroke="#444" strokeWidth="0.5" />
          {/* Body — tactical vest */}
          <rect x="28" y="127" width="14" height="22" fill="#2a2a35" rx="2" />
          <line x1="35" y1="127" x2="35" y2="149" stroke="#3a3a45" strokeWidth="0.5" />
          {/* Legs */}
          <line x1="31" y1="149" x2="30" y2="170" stroke="#2a2a35" strokeWidth="3" />
          <line x1="39" y1="149" x2="40" y2="170" stroke="#2a2a35" strokeWidth="3" />
          {/* Arm throwing */}
          <motion.line x1="42" y1="133" x2={step === 1 ? 58 : 48} y2={step === 1 ? 118 : 142} stroke="#3a3a45" strokeWidth="2.5"
            animate={{ x2: step === 1 ? 58 : 48, y2: step === 1 ? 118 : 142 }} transition={{ duration: 0.4 }} />
          {/* Gas mask */}
          <ellipse cx="35" cy="124" rx="5" ry="4" fill="none" stroke="#555" strokeWidth="0.8" />
        </motion.g>
      )}

      {/* Grenade in flight (step 1) */}
      {step === 1 && (
        <motion.g animate={{ x: [0, 80, 160], y: [0, -40, 10] }} transition={{ duration: 1.2, ease: 'easeOut' }}>
          <rect x="58" y="116" width="7" height="11" rx="2" fill="#2a2a35" stroke="#ef4444" strokeWidth="1" />
          <rect x="60" y="112" width="3" height="5" rx="1" fill="#333" />
        </motion.g>
      )}

      {/* Grenade on floor (step 2+) */}
      {step >= 2 && (
        <motion.g animate={step === 2 ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.3, repeat: step === 2 ? 3 : 0 }}>
          <rect x="216" y="192" width="8" height="12" rx="2" fill="#1a1a2e" stroke="#ef4444" strokeWidth="1.2" />
          {step >= 2 && (
            <motion.circle cx="220" cy="195" r="3" fill="#ef4444" filter="url(#glow)"
              animate={{ r: [3, 8, 3], opacity: [0.8, 0.2, 0.8] }} transition={{ duration: 0.6, repeat: Infinity }} />
          )}
        </motion.g>
      )}

      {/* Gas cloud — many layered particles (step 3+) */}
      {step >= 3 && gasParticles.map((p, i) => (
        <motion.circle key={i} cx={p.cx} cy={p.cy} r="0"
          fill="url(#gasGrad)" stroke={`rgba(239,68,68,${0.04 + (i % 3) * 0.02})`} strokeWidth="0.3"
          animate={{ r: [0, p.r, p.r * 0.8], opacity: [0, 0.5, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, repeatType: 'reverse' }} />
      ))}

      {/* Haze overlay (step 4+) */}
      {step >= 4 && (
        <motion.rect x="60" y="30" width="380" height="230" fill="#ef4444"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.04, 0.02] }}
          transition={{ duration: 3, repeat: Infinity }} />
      )}

      {/* People inside — detailed silhouettes */}
      {[
        { x: 140, y: 170, role: 'standing' },
        { x: 240, y: 175, role: 'sitting' },
        { x: 310, y: 168, role: 'standing' },
        { x: 180, y: 180, role: 'sitting' },
        { x: 360, y: 172, role: 'standing' },
      ].map((p, i) => {
        const affected = step >= 4;
        const collapsed = step >= 5;
        const color = affected ? '#8b0000' : '#4a4a55';
        return (
          <motion.g key={i}
            animate={collapsed ? { y: 15, rotate: 70 + i * 10, opacity: 0.6 } : affected ? { y: [0, 3, 0] } : {}}
            transition={collapsed ? { duration: 0.8, delay: i * 0.15 } : { duration: 2, repeat: Infinity, delay: i * 0.3 }}
            style={{ transformOrigin: `${p.x}px ${p.y + 20}px` }}
          >
            <circle cx={p.x} cy={p.y - 12} r="5" fill={color} />
            <line x1={p.x} y1={p.y - 7} x2={p.x} y2={p.y + 12} stroke={color} strokeWidth="2" strokeLinecap="round" />
            {p.role === 'standing' && <>
              <line x1={p.x} y1={p.y + 12} x2={p.x - 5} y2={p.y + 28} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
              <line x1={p.x} y1={p.y + 12} x2={p.x + 5} y2={p.y + 28} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            </>}
            <line x1={p.x} y1={p.y - 2} x2={p.x - 7} y2={p.y + 5} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <line x1={p.x} y1={p.y - 2} x2={p.x + 7} y2={p.y + 5} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        );
      })}

      {/* Timer overlay (step 4) */}
      {step === 4 && (
        <motion.text x="420" y="55" textAnchor="end" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>
          60-90 sec
        </motion.text>
      )}
    </svg>
  );
}

function DroneAnim({ step }: { step: number }) {
  const droneTargetX = step <= 1 ? 70 : 250;
  const droneTargetY = step === 0 ? 200 : step === 1 ? 45 : 40;

  const dispersalParticles = Array.from({ length: 30 }, (_, i) => ({
    cx: 250 + Math.cos(i * 0.7) * (30 + i * 4),
    cy: 180 + Math.sin(i * 0.9) * 15 - i * 0.5,
    r: 6 + (i % 5) * 3,
    delay: i * 0.15,
  }));

  return (
    <svg viewBox="0 0 500 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050510" />
          <stop offset="100%" stopColor="#0a0a18" />
        </linearGradient>
        <radialGradient id="droneCloud" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="500" height="300" fill="url(#skyGrad)" />
      {/* Stars */}
      {[{x:50,y:20},{x:120,y:45},{x:380,y:30},{x:420,y:65},{x:200,y:15},{x:300,y:50},{x:460,y:25}].map((s,i) => (
        <motion.circle key={i} cx={s.x} cy={s.y} r="0.8" fill="white"
          animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }} />
      ))}

      {/* Ground with texture */}
      <rect x="0" y="220" width="500" height="80" fill="#111116" />
      <line x1="0" y1="220" x2="500" y2="220" stroke="#1a1a22" strokeWidth="1" />
      {/* Ground texture lines */}
      {[230, 245, 260, 275].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="#13131a" strokeWidth="0.3" />
      ))}

      {/* Buildings on ground */}
      <rect x="140" y="195" width="30" height="25" fill="#131320" stroke="#1e1e2a" strokeWidth="0.5" />
      <rect x="180" y="200" width="20" height="20" fill="#111118" stroke="#1a1a25" strokeWidth="0.5" />
      <rect x="320" y="198" width="25" height="22" fill="#121220" stroke="#1c1c28" strokeWidth="0.5" />
      {/* Windows on buildings */}
      {[[145,200],[152,200],[145,208],[152,208],[325,203],[332,203]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="3" height="3" fill="#1a1a28" />
      ))}

      {/* Target zone on ground */}
      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>
          <ellipse cx="250" cy="225" rx="50" ry="6" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="5 3" />
          <ellipse cx="250" cy="225" rx="30" ry="4" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="248" y1="219" x2="252" y2="231" stroke="#ef444460" strokeWidth="0.5" />
          <line x1="244" y1="225" x2="256" y2="225" stroke="#ef444460" strokeWidth="0.5" />
        </motion.g>
      )}

      {/* People on ground */}
      {[210, 230, 250, 270, 290].map((x, i) => {
        const hit = step >= 5;
        const col = hit ? '#8b0000' : '#3a3a48';
        return (
          <motion.g key={i} animate={hit ? { y: 10, opacity: 0.5 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
            <circle cx={x} cy={212} r="3" fill={col} />
            <line x1={x} y1={215} x2={x} y2={224} stroke={col} strokeWidth="1.5" strokeLinecap="round" />
            {!hit && <>
              <line x1={x} y1={224} x2={x-3} y2={232} stroke={col} strokeWidth="1.2" />
              <line x1={x} y1={224} x2={x+3} y2={232} stroke={col} strokeWidth="1.2" />
            </>}
          </motion.g>
        );
      })}

      {/* Drone — detailed */}
      <motion.g animate={{ x: droneTargetX - 70, y: droneTargetY - 200 }} transition={{ duration: 1.8, ease: 'easeInOut' }}>
        {/* Central body */}
        <rect x="62" y="196" width="16" height="8" rx="3" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1" />
        {/* Camera lens */}
        <circle cx="70" cy="204" r="2.5" fill="#0a0a14" stroke="#3b82f680" strokeWidth="0.8" />
        <motion.circle cx="70" cy="204" r="1" fill="#3b82f6" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
        {/* Arms — X shape */}
        <line x1="62" y1="198" x2="48" y2="190" stroke="#3b82f650" strokeWidth="2" strokeLinecap="round" />
        <line x1="78" y1="198" x2="92" y2="190" stroke="#3b82f650" strokeWidth="2" strokeLinecap="round" />
        <line x1="62" y1="202" x2="48" y2="210" stroke="#3b82f650" strokeWidth="2" strokeLinecap="round" />
        <line x1="78" y1="202" x2="92" y2="210" stroke="#3b82f650" strokeWidth="2" strokeLinecap="round" />
        {/* Motors */}
        {[[48,190],[92,190],[48,210],[92,210]].map(([mx,my],i) => (
          <g key={i}>
            <circle cx={mx} cy={my} r="4" fill="#1a1a2e" stroke="#3b82f640" strokeWidth="0.8" />
            <motion.ellipse cx={mx} cy={my} rx="10" ry="2" fill="none" stroke="#3b82f625" strokeWidth="0.6"
              animate={{ ry: [2, 4, 2], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.05 }} />
          </g>
        ))}
        {/* LED lights */}
        <motion.circle cx="62" cy="200" r="1" fill="#22c55e" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }} />
        <motion.circle cx="78" cy="200" r="1" fill="#ef4444" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
        {/* Payload underneath */}
        {step < 3 && (
          <rect x="65" y="205" width="10" height="7" rx="1.5" fill="#1a1a2e" stroke="#ef444460" strokeWidth="0.8" />
        )}
      </motion.g>

      {/* Payload dropping (step 3) */}
      {step === 3 && (
        <motion.g animate={{ y: [0, 170], opacity: [1, 0.4] }} transition={{ duration: 1.5, ease: 'easeIn' }}>
          <rect x="247" y="48" width="6" height="8" rx="1" fill="#ef4444" stroke="#ef444480" strokeWidth="0.5" />
          {/* Fins */}
          <line x1="247" y1="54" x2="244" y2="56" stroke="#ef444480" strokeWidth="0.8" />
          <line x1="253" y1="54" x2="256" y2="56" stroke="#ef444480" strokeWidth="0.8" />
        </motion.g>
      )}

      {/* Chemical cloud dispersal (step 4+) */}
      {step >= 4 && dispersalParticles.map((p, i) => (
        <motion.circle key={i} cx={p.cx} cy={p.cy} r="0" fill="url(#droneCloud)" stroke="#3b82f608" strokeWidth="0.3"
          animate={{ r: [0, p.r + 8, p.r + 4], opacity: [0, 0.5, 0.2], cy: [p.cy - 10, p.cy + 5, p.cy] }}
          transition={{ duration: 3, delay: p.delay, repeat: Infinity, repeatType: 'reverse' }} />
      ))}

      {/* Altitude line */}
      {step >= 1 && step <= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}>
          <line x1="470" y1="45" x2="470" y2="220" stroke="#3b82f640" strokeWidth="0.5" strokeDasharray="4 4" />
          <text x="480" y="135" fill="#3b82f6" fontSize="8" fontFamily="monospace">50m</text>
          <line x1="466" y1="45" x2="474" y2="45" stroke="#3b82f640" strokeWidth="0.5" />
          <line x1="466" y1="220" x2="474" y2="220" stroke="#3b82f640" strokeWidth="0.5" />
        </motion.g>
      )}

      {/* Range indicator (step 2+) */}
      {step >= 2 && (
        <motion.text x="250" y="248" textAnchor="middle" fill="#3b82f650" fontSize="8" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          10km RANGE
        </motion.text>
      )}
    </svg>
  );
}

function FogAnim({ step }: { step: number }) {
  const fogParticles = Array.from({ length: step >= 4 ? 45 : step >= 3 ? 25 : step >= 2 ? 10 : 0 }, (_, i) => ({
    cx: 130 + i * 8 + Math.sin(i * 0.7) * 20,
    cy: 120 + Math.cos(i * 1.3) * 40,
    r: 10 + (i % 6) * 5,
    delay: i * 0.12,
    drift: 8 + (i % 4) * 3,
  }));

  return (
    <svg viewBox="0 0 500 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#151520" />
          <stop offset="100%" stopColor="#0e0e16" />
        </linearGradient>
        <radialGradient id="fogGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="500" height="300" fill="#0a0a14" />
      {/* Ground */}
      <rect x="0" y="210" width="500" height="90" fill="url(#groundGrad)" />
      <line x1="0" y1="210" x2="500" y2="210" stroke="#1e1e28" strokeWidth="0.5" />
      {/* Road */}
      <rect x="0" y="215" width="500" height="30" fill="#12121a" />
      <line x1="0" y1="230" x2="500" y2="230" stroke="#2a2a3520" strokeWidth="1" strokeDasharray="15 10" />

      {/* Trees/vegetation */}
      {[280, 340, 400, 450].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={210} x2={x} y2={195 - i * 2} stroke="#1a2a18" strokeWidth="2" />
          <circle cx={x} cy={190 - i * 2} r={6 + i} fill="#152215" />
        </g>
      ))}

      {/* Truck — detailed */}
      <g>
        {/* Cab */}
        <rect x="25" y="185" width="35" height="28" rx="3" fill="#1a1a2e" stroke="#f59e0b50" strokeWidth="1.2" />
        {/* Windshield */}
        <rect x="28" y="188" width="15" height="12" rx="1" fill="#0e0e18" stroke="#f59e0b30" strokeWidth="0.5" />
        {/* Headlight */}
        <motion.rect x="57" y="200" width="4" height="3" rx="1" fill={step >= 0 ? '#f59e0b40' : '#222'}
          animate={step >= 1 ? { fill: ['#f59e0b20', '#f59e0b60', '#f59e0b20'] } : {}}
          transition={{ duration: 1, repeat: Infinity }} />
        {/* Truck bed */}
        <rect x="25" y="183" width="80" height="30" rx="2" fill="#15151e" stroke="#f59e0b40" strokeWidth="1" />
        {/* Tank on bed */}
        <ellipse cx="75" cy="190" rx="25" ry="8" fill="#1a1a28" stroke="#f59e0b30" strokeWidth="0.8" />
        <text x="75" y="193" textAnchor="middle" fill="#f59e0b20" fontSize="5" fontFamily="monospace">AGENT</text>
        {/* Nozzle apparatus */}
        <rect x="100" y="180" width="20" height="18" rx="2" fill="#15151e" stroke="#f59e0b50" strokeWidth="1" />
        <rect x="118" y="184" width="8" height="10" rx="3" fill="#1a1a28" stroke="#f59e0b60" strokeWidth="1" />
        {/* Nozzle opening — glows when active */}
        {step >= 1 && (
          <motion.circle cx="126" cy="189" r="4" fill="#f59e0b" filter="url(#glow)"
            animate={{ r: [3, 6, 3], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} />
        )}
        {/* Wheels */}
        {[40, 90].map((wx, i) => (
          <g key={i}>
            <circle cx={wx} cy="215" r="7" fill="#0e0e14" stroke="#2a2a35" strokeWidth="1.5" />
            <circle cx={wx} cy="215" r="3" fill="#1a1a25" />
            <circle cx={wx} cy="215" r="1" fill="#333" />
          </g>
        ))}
      </g>

      {/* Spray jet from nozzle (step 2+) */}
      {step >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {[0, 1, 2].map(i => (
            <motion.line key={i} x1="130" y1={186 + i * 3} x2="160" y2={175 + i * 8} stroke="#f59e0b15" strokeWidth={2 - i * 0.5}
              animate={{ x2: [150, 170, 150], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }} />
          ))}
        </motion.g>
      )}

      {/* Wind direction (step 3+) */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>
          {[0, 1, 2].map(i => (
            <motion.g key={i} animate={{ x: [0, 15, 0] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}>
              <line x1={180 + i * 40} y1={55 + i * 5} x2={220 + i * 40} y2={55 + i * 5} stroke="#f59e0b40" strokeWidth="0.8" />
              <polygon points={`${220 + i * 40},${52 + i * 5} ${228 + i * 40},${55 + i * 5} ${220 + i * 40},${58 + i * 5}`} fill="#f59e0b40" />
            </motion.g>
          ))}
          <text x="250" y="45" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace" opacity="0.5">WIND →</text>
        </motion.g>
      )}

      {/* Fog cloud — layered particles drifting with wind */}
      {fogParticles.map((p, i) => (
        <motion.circle key={i} cx={p.cx} cy={p.cy} r="0" fill="url(#fogGrad)" stroke="#f59e0b05" strokeWidth="0.2"
          animate={{ r: [0, p.r, p.r * 0.7], opacity: [0, 0.4, 0.15], cx: [p.cx, p.cx + p.drift, p.cx + p.drift * 1.5] }}
          transition={{ duration: 4, delay: p.delay, repeat: Infinity, repeatType: 'reverse' }} />
      ))}

      {/* Haze overlay (step 4+) */}
      {step >= 4 && (
        <motion.rect x="120" y="80" width="380" height="150" fill="#f59e0b" rx="20"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.03, 0.01] }}
          transition={{ duration: 4, repeat: Infinity }} />
      )}

      {/* People at various distances */}
      {[180, 240, 300, 360, 420].map((x, i) => {
        const affected = step >= 5 && x < 380;
        const col = affected ? '#8b0000' : '#4a4a55';
        return (
          <motion.g key={i} animate={affected ? { y: 8, opacity: 0.5 } : {}} transition={{ duration: 0.5, delay: i * 0.12 }}>
            <circle cx={x} cy={200} r="3.5" fill={col} />
            <line x1={x} y1={203} x2={x} y2={213} stroke={col} strokeWidth="1.5" strokeLinecap="round" />
            {!affected && <>
              <line x1={x} y1={213} x2={x-4} y2={222} stroke={col} strokeWidth="1.2" />
              <line x1={x} y1={213} x2={x+4} y2={222} stroke={col} strokeWidth="1.2" />
            </>}
          </motion.g>
        );
      })}

      {/* Distance markers */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}>
          {[[180, '50m'], [280, '150m'], [380, '300m']].map(([x, label], i) => (
            <g key={i}>
              <line x1={x as number} y1="250" x2={x as number} y2="258" stroke="#f59e0b" strokeWidth="0.5" />
              <text x={x as number} y="268" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">{label as string}</text>
            </g>
          ))}
          <line x1="130" y1="254" x2="430" y2="254" stroke="#f59e0b20" strokeWidth="0.5" />
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
