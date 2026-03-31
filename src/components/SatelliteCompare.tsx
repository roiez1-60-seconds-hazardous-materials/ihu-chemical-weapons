'use client';
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Calendar, Crosshair, AlertTriangle, Flame } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const IHU_LAT = 35.7506;
const IHU_LNG = 51.5875;

/* ── Damage overlay SVG — drawn on top of "after" satellite view ── */
function DamageOverlay() {
  return (
    <svg viewBox="0 0 600 450" className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
      {/* Semi-transparent dark overlay to simulate post-strike darkness */}
      <rect width="600" height="450" fill="rgba(15,5,0,0.35)" />

      {/* Smoke plumes */}
      <motion.ellipse cx="380" cy="180" rx="50" ry="30" fill="rgba(40,20,5,0.5)"
        animate={{ rx: [50, 65, 50], ry: [30, 40, 30], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }} />
      <motion.ellipse cx="370" cy="150" rx="35" ry="20" fill="rgba(50,25,10,0.4)"
        animate={{ rx: [35, 50, 35], cy: [150, 140, 150], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} />
      <motion.ellipse cx="390" cy="130" rx="25" ry="15" fill="rgba(40,20,5,0.3)"
        animate={{ rx: [25, 40, 25], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }} />

      {/* Secondary smoke from engineering area */}
      <motion.ellipse cx="450" cy="280" rx="30" ry="18" fill="rgba(35,18,5,0.35)"
        animate={{ rx: [30, 42, 30], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }} />

      {/* Crater / impact zone 1 — Chemistry Center */}
      <motion.circle cx="380" cy="220" r="28" fill="none" stroke="rgba(239,68,68,0.6)" strokeWidth="2"
        animate={{ r: [26, 30, 26], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }} />
      <circle cx="380" cy="220" r="16" fill="rgba(0,0,0,0.5)" stroke="rgba(200,50,20,0.4)" strokeWidth="1" />
      <motion.circle cx="380" cy="220" r="40" fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="1" strokeDasharray="4 4"
        animate={{ r: [38, 45, 38] }}
        transition={{ duration: 3, repeat: Infinity }} />

      {/* Crater / impact zone 2 — Wind Tunnels */}
      <motion.circle cx="250" cy="320" r="20" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"
        animate={{ r: [18, 22, 18], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
      <circle cx="250" cy="320" r="10" fill="rgba(0,0,0,0.4)" />

      {/* Crater / impact zone 3 — Engineering */}
      <motion.circle cx="460" cy="290" r="22" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5"
        animate={{ r: [20, 25, 20], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1 }} />
      <circle cx="460" cy="290" r="12" fill="rgba(0,0,0,0.35)" />

      {/* Fire glow effects */}
      <motion.circle cx="375" cy="215" r="35" fill="rgba(239,100,20,0.08)"
        animate={{ r: [30, 40, 30], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="460" cy="285" r="25" fill="rgba(239,100,20,0.06)"
        animate={{ r: [22, 30, 22], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }} />

      {/* Target labels */}
      <g>
        <rect x="335" y="248" width="90" height="18" rx="3" fill="rgba(0,0,0,0.7)" stroke="rgba(239,68,68,0.4)" strokeWidth="0.5" />
        <text x="380" y="260" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">TARGET 01</text>
      </g>
      <g>
        <rect x="205" y="340" width="90" height="18" rx="3" fill="rgba(0,0,0,0.7)" stroke="rgba(245,158,11,0.4)" strokeWidth="0.5" />
        <text x="250" y="352" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">TARGET 02</text>
      </g>
      <g>
        <rect x="415" y="312" width="90" height="18" rx="3" fill="rgba(0,0,0,0.7)" stroke="rgba(168,85,247,0.4)" strokeWidth="0.5" />
        <text x="460" y="324" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" fontWeight="bold">TARGET 03</text>
      </g>

      {/* Timestamp */}
      <rect x="420" y="15" width="165" height="22" rx="4" fill="rgba(0,0,0,0.7)" stroke="rgba(239,68,68,0.3)" strokeWidth="0.5" />
      <text x="502" y="30" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace">POST-STRIKE — MAR 2026</text>
    </svg>
  );
}

export default function SatelliteCompare() {
  const { lang } = useLang();
  const isHe = lang === 'he';
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updateSlider(clientX);
  }, [isDragging, updateSlider]);

  /* Google Maps Static-style satellite embed URL */
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1600!2d${IHU_LNG}!3d${IHU_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1`;

  return (
    <section id="satellite" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Satellite size={20} className="text-blue-400" />
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            {isHe ? 'מבט מלוויין' : 'Satellite View'}
          </h2>
        </div>
        <p className="text-gray-400 text-sm">
          {isHe ? 'גררו את הסליידר כדי לראות את הנזק לקמפוס IHU' : 'Drag the slider to reveal strike damage to IHU campus'}
        </p>
      </motion.div>

      {/* Before/After slider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        ref={containerRef}
        className="relative rounded-2xl border border-gray-700/40 overflow-hidden cursor-ew-resize select-none mx-auto"
        style={{ aspectRatio: '4/3' }}
        onMouseDown={(e) => { setIsDragging(true); updateSlider(e.clientX); }}
        onMouseMove={handleMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => { setIsDragging(true); updateSlider(e.touches[0].clientX); }}
        onTouchMove={handleMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* ── AFTER layer (full width) — satellite + damage overlay ── */}
        <div className="absolute inset-0">
          <iframe
            src={mapEmbedUrl}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: 'saturate(0.4) contrast(1.2) brightness(0.6) sepia(0.3)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
          <DamageOverlay />
        </div>

        {/* ── BEFORE layer (clipped by slider) — clean satellite ── */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <iframe
            src={mapEmbedUrl}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: 'saturate(0.8) contrast(1.05)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
          {/* Clean "before" label overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg viewBox="0 0 600 450" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="15" width="170" height="22" rx="4" fill="rgba(0,0,0,0.6)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
              <text x="100" y="30" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="monospace">PRE-STRIKE — MAY 2025</text>
            </svg>
          </div>
        </div>

        {/* Slider line */}
        <div className="absolute top-0 bottom-0 z-30" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
          <div className="w-[2px] h-full bg-white/80 shadow-lg shadow-white/20" />
          {/* Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white/90 border-2 border-white shadow-xl flex items-center justify-center">
            <div className="flex gap-[3px]">
              <div className="w-[2px] h-5 bg-gray-500 rounded-full" />
              <div className="w-[2px] h-5 bg-gray-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Date labels — always visible */}
        <div className="absolute top-3 left-3 z-20 bg-black/75 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-green-600/40">
          <div className="flex items-center gap-1.5">
            <Calendar size={10} className="text-green-400" />
            <span className="font-mono text-[10px] text-green-400 font-bold">BEFORE</span>
          </div>
          <div className="font-mono text-[9px] text-gray-400">{isHe ? 'מאי 2025' : 'May 2025'}</div>
        </div>

        <div className="absolute top-3 right-3 z-20 bg-black/75 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-red-600/40">
          <div className="flex items-center gap-1.5">
            <Flame size={10} className="text-red-400" />
            <span className="font-mono text-[10px] text-red-400 font-bold">AFTER</span>
          </div>
          <div className="font-mono text-[9px] text-gray-400">{isHe ? 'מרץ 2026' : 'March 2026'}</div>
        </div>

        {/* Pulsing crosshair on target area */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{ left: '63%', top: '49%', transform: 'translate(-50%, -50%)' }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crosshair size={32} className="text-red-500" strokeWidth={1.5} />
        </motion.div>

        {/* Coordinate readout */}
        <div className="absolute bottom-3 left-3 z-20 bg-black/70 backdrop-blur-sm rounded px-2 py-1 border border-gray-600/30">
          <div className="font-mono text-[9px] text-green-400">{IHU_LAT}°N, {IHU_LNG}°E</div>
          <div className="font-mono text-[8px] text-gray-500">Imam Hossein University, NE Tehran</div>
        </div>
      </motion.div>

      {/* Instruction hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-[10px] text-gray-600 mt-2 font-mono"
      >
        {isHe ? '◀ גררו ימינה/שמאלה ▶' : '◀ Drag left/right ▶'}
      </motion.p>

      {/* Strike info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 max-w-2xl mx-auto">
        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
          <div className="font-mono text-lg font-black text-amber-400">18.06.25</div>
          <div className="text-[10px] text-gray-500">
            {isHe ? 'תקיפה ראשונה — מבנה מזרחי' : '1st strike — east building'}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
          <div className="font-mono text-lg font-black text-red-400">07.03.26</div>
          <div className="text-[10px] text-gray-500">
            {isHe ? 'תקיפה שנייה — 80+ מטוסים' : '2nd strike — 80+ aircraft'}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-center">
          <div className="font-mono text-lg font-black text-purple-400">3</div>
          <div className="text-[10px] text-gray-500">
            {isHe ? 'מטרות ספציפיות בקמפוס' : 'Specific campus targets'}
          </div>
        </div>
      </div>
    </section>
  );
}
