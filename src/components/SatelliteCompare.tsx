'use client';
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Calendar, Crosshair, AlertTriangle } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

/* ── Stylized satellite view of IHU campus — Before & After ── */

function CampusSVG({ destroyed, opacity }: { destroyed: boolean; opacity: number }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full" style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
      {/* Background - terrain */}
      <rect width="600" height="400" fill={destroyed ? '#1a1510' : '#1a1f14'} />
      
      {/* Road grid */}
      <rect x="0" y="185" width="600" height="30" fill={destroyed ? '#2a2520' : '#2a2f24'} /> {/* Babaei Expressway */}
      <rect x="280" y="0" width="20" height="400" fill={destroyed ? '#252018' : '#252f1e'} />
      <rect x="420" y="100" width="14" height="300" fill={destroyed ? '#222018' : '#222b1c'} />
      
      {/* Road markings */}
      {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540].map((x, i) => (
        <rect key={i} x={x} y="198" width="30" height="3" fill={destroyed ? '#3a3020' : '#3a4030'} rx="1" />
      ))}

      {/* Campus perimeter */}
      <rect x="80" y="230" width="440" height="155" rx="4" fill="none" stroke={destroyed ? '#3a2a1a' : '#2a3a2a'} strokeWidth="2" strokeDasharray={destroyed ? "8 4" : "0"} />

      {/* ── BUILDINGS ── */}
      
      {/* Main academic building - west */}
      <rect x="100" y="250" width="80" height="50" rx="3" fill={destroyed ? '#2a1a0a' : '#2a3525'} stroke={destroyed ? '#5a3020' : '#3a4a30'} strokeWidth="1.5" />
      {destroyed && <>
        <line x1="100" y1="250" x2="180" y2="300" stroke="#5a2010" strokeWidth="1" opacity="0.6" />
        <line x1="180" y1="250" x2="100" y2="300" stroke="#5a2010" strokeWidth="1" opacity="0.6" />
      </>}
      
      {/* Chemistry Center - TARGET (east side - struck) */}
      <rect x="340" y="245" width="70" height="45" rx="3" 
        fill={destroyed ? '#1a0a00' : '#2a3525'} 
        stroke={destroyed ? '#8a2010' : '#3a4a30'} strokeWidth={destroyed ? "2" : "1.5"} />
      {destroyed && <>
        {/* Crater */}
        <ellipse cx="375" cy="267" rx="25" ry="18" fill="#0a0500" stroke="#5a2010" strokeWidth="1" />
        <ellipse cx="375" cy="267" rx="15" ry="10" fill="#1a0800" />
        {/* Debris scatter */}
        {[345, 355, 365, 380, 390, 400].map((x, i) => (
          <rect key={i} x={x} y={250 + (i * 5) % 30} width={3 + i % 3} height={2 + i % 2} fill="#3a2010" opacity="0.5" transform={`rotate(${i * 30} ${x} ${260 + (i * 5) % 30})`} />
        ))}
        {/* Burn marks */}
        <circle cx="375" cy="267" r="30" fill="none" stroke="#3a1500" strokeWidth="4" opacity="0.3" />
      </>}

      {/* Wind Tunnel complex */}
      <rect x="200" y="320" width="100" height="35" rx="2" fill={destroyed ? '#251810' : '#283020'} stroke={destroyed ? '#4a2818' : '#384838'} strokeWidth="1" />
      {/* Tunnel tubes */}
      <ellipse cx="225" cy="337" rx="10" ry="13" fill="none" stroke={destroyed ? '#4a2818' : '#384838'} strokeWidth="1" />
      <ellipse cx="275" cy="337" rx="10" ry="13" fill="none" stroke={destroyed ? '#4a2818' : '#384838'} strokeWidth="1" />
      
      {/* Engineering building */}
      <rect x="430" y="280" width="60" height="80" rx="3" fill={destroyed ? '#201510' : '#253020'} stroke={destroyed ? '#3a2518' : '#354535'} strokeWidth="1" />
      {destroyed && <>
        <line x1="430" y1="320" x2="490" y2="320" stroke="#3a1a10" strokeWidth="0.5" opacity="0.4" />
        {/* Partial damage */}
        <rect x="450" y="300" width="25" height="20" fill="#1a0a00" opacity="0.5" />
      </>}
      
      {/* Admin / HQ building */}
      <rect x="140" y="330" width="45" height="40" rx="2" fill={destroyed ? '#221812' : '#263222'} stroke={destroyed ? '#3a2518' : '#364836'} strokeWidth="1" />
      
      {/* Sports/parade ground */}
      <rect x="310" y="310" width="60" height="60" rx="1" fill={destroyed ? '#1a1510' : '#1e2a18'} stroke={destroyed ? '#2a2018' : '#2a3828'} strokeWidth="0.8" />
      
      {/* Guard posts */}
      {[[95, 240], [510, 240], [95, 375], [510, 375]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" rx="1" fill={destroyed ? '#302010' : '#304030'} />
      ))}

      {/* Trees / vegetation (only in before) */}
      {!destroyed && [
        [115, 310], [160, 310], [320, 250], [500, 260], [420, 370], [200, 370], [250, 260]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 + i % 3} fill="#1a3518" opacity="0.6" />
      ))}

      {/* Smoke plumes (only in after) */}
      {destroyed && <>
        <ellipse cx="375" cy="240" rx="20" ry="12" fill="#2a1a10" opacity="0.4" />
        <ellipse cx="370" cy="225" rx="15" ry="10" fill="#2a1a10" opacity="0.3" />
        <ellipse cx="380" cy="210" rx="12" ry="8" fill="#201510" opacity="0.2" />
        <ellipse cx="460" cy="275" rx="10" ry="8" fill="#251810" opacity="0.25" />
      </>}

      {/* Labels */}
      <text x="140" y="270" textAnchor="middle" fill={destroyed ? '#5a4030' : '#4a6040'} fontSize="8" fontFamily="monospace">ACADEMIC</text>
      <text x="375" y="262" textAnchor="middle" fill={destroyed ? '#8a3020' : '#4a6040'} fontSize="8" fontFamily="monospace" fontWeight="bold">
        {destroyed ? 'DESTROYED' : 'CHEMISTRY'}
      </text>
      <text x="250" y="342" textAnchor="middle" fill={destroyed ? '#5a4030' : '#4a6040'} fontSize="7" fontFamily="monospace">WIND TUNNELS</text>
      <text x="460" y="315" textAnchor="middle" fill={destroyed ? '#5a4030' : '#4a6040'} fontSize="7" fontFamily="monospace">ENGINEERING</text>
      
      {/* Expressway label */}
      <text x="300" y="204" textAnchor="middle" fill={destroyed ? '#4a3a28' : '#4a5a3a'} fontSize="9" fontFamily="monospace">SHAHID BABAEI EXPRESSWAY</text>
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
        style={{ aspectRatio: '3/2' }}
        onMouseDown={(e) => { setIsDragging(true); updateSlider(e.clientX); }}
        onMouseMove={handleMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => { setIsDragging(true); updateSlider(e.touches[0].clientX); }}
        onTouchMove={handleMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* After layer (full width) */}
        <div className="absolute inset-0">
          <CampusSVG destroyed={true} opacity={1} />
        </div>

        {/* Before layer (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <CampusSVG destroyed={false} opacity={1} />
        </div>

        {/* Slider line */}
        <div className="absolute top-0 bottom-0 z-20" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
          <div className="w-[2px] h-full bg-white/80" />
          {/* Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 border-2 border-white shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-gray-600 rounded-full" />
              <div className="w-0.5 h-4 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Date labels */}
        <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-green-600/30">
          <div className="flex items-center gap-1.5">
            <Calendar size={10} className="text-green-400" />
            <span className="font-mono text-[10px] text-green-400 font-semibold">BEFORE</span>
          </div>
          <div className="font-mono text-[9px] text-gray-400">May 2025</div>
        </div>

        <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-red-600/30">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={10} className="text-red-400" />
            <span className="font-mono text-[10px] text-red-400 font-semibold">AFTER</span>
          </div>
          <div className="font-mono text-[9px] text-gray-400">March 2026</div>
        </div>

        {/* Crosshair on chemistry center (after side) */}
        {sliderPos < 65 && (
          <motion.div
            className="absolute z-10 pointer-events-none"
            style={{ left: '62.5%', top: '62%', transform: 'translate(-50%, -50%)' }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Crosshair size={28} className="text-red-500" strokeWidth={1.5} />
          </motion.div>
        )}
      </motion.div>

      {/* Strike info cards */}
      <div className="grid grid-cols-2 gap-3 mt-4 max-w-lg mx-auto">
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
      </div>
    </section>
  );
}
