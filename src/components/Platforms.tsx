'use client';
import { motion } from 'framer-motion';
import { Bomb, Plane, Wind } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

/* ── Animated SVG illustrations ── */

function GrenadeIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Gas cloud particles */}
      <motion.circle cx="60" cy="50" r="18" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.15)" strokeWidth="0.5"
        animate={{ r: [18, 24, 18], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.circle cx="90" cy="35" r="14" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.12)" strokeWidth="0.5"
        animate={{ r: [14, 20, 14], opacity: [0.2, 0.5, 0.2], cx: [90, 95, 90] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="45" cy="40" r="12" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.1)" strokeWidth="0.5"
        animate={{ r: [12, 18, 12], opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
      <motion.circle cx="75" cy="60" r="20" fill="rgba(239,68,68,0.07)"
        animate={{ r: [20, 28, 20], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3.2, repeat: Infinity, delay: 0.3 }} />

      {/* Grenade body */}
      <rect x="85" y="70" width="30" height="48" rx="6" fill="#1a1a2e" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" />
      {/* Grenade segments */}
      <line x1="85" y1="82" x2="115" y2="82" stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" />
      <line x1="85" y1="94" x2="115" y2="94" stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" />
      <line x1="85" y1="106" x2="115" y2="106" stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" />
      {/* Grenade top */}
      <rect x="93" y="60" width="14" height="12" rx="2" fill="#1a1a2e" stroke="rgba(239,68,68,0.6)" strokeWidth="1.2" />
      {/* Spoon/lever */}
      <path d="M 107 62 Q 120 55 118 45" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" fill="none" />
      {/* Ring */}
      <circle cx="113" cy="56" r="4" fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="1" />
      {/* Chemical warning */}
      <text x="100" y="93" textAnchor="middle" fill="rgba(239,68,68,0.6)" fontSize="8" fontFamily="monospace">PBA</text>

      {/* Emission lines */}
      <motion.path d="M 85 80 Q 60 70 45 55" stroke="rgba(239,68,68,0.15)" strokeWidth="0.8" fill="none" strokeDasharray="3 3"
        animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M 85 90 Q 55 85 40 70" stroke="rgba(239,68,68,0.12)" strokeWidth="0.8" fill="none" strokeDasharray="3 3"
        animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />

      {/* Label */}
      <text x="100" y="140" textAnchor="middle" fill="rgba(239,68,68,0.3)" fontSize="7" fontFamily="monospace" letterSpacing="2">ABC-M7A2/A3</text>
    </svg>
  );
}

function DroneIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Propeller motion circles */}
      <motion.ellipse cx="55" cy="55" rx="18" ry="4" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.8"
        animate={{ ry: [4, 6, 4], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} />
      <motion.ellipse cx="145" cy="55" rx="18" ry="4" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.8"
        animate={{ ry: [4, 6, 4], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
      <motion.ellipse cx="55" cy="85" rx="18" ry="4" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.8"
        animate={{ ry: [4, 6, 4], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
      <motion.ellipse cx="145" cy="85" rx="18" ry="4" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.8"
        animate={{ ry: [4, 6, 4], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }} />

      {/* Drone body - hovering */}
      <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        {/* Arms */}
        <line x1="75" y1="63" x2="55" y2="55" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
        <line x1="125" y1="63" x2="145" y2="55" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
        <line x1="75" y1="77" x2="55" y2="85" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
        <line x1="125" y1="77" x2="145" y2="85" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />

        {/* Motors */}
        <circle cx="55" cy="55" r="5" fill="#1a1a2e" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
        <circle cx="145" cy="55" r="5" fill="#1a1a2e" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
        <circle cx="55" cy="85" r="5" fill="#1a1a2e" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
        <circle cx="145" cy="85" r="5" fill="#1a1a2e" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />

        {/* Central body */}
        <rect x="75" y="60" width="50" height="20" rx="5" fill="#1a1a2e" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
        {/* Camera/sensor */}
        <circle cx="100" cy="70" r="4" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1" />
        <motion.circle cx="100" cy="70" r="2" fill="rgba(59,130,246,0.5)"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />

        {/* Payload underneath */}
        <rect x="88" y="80" width="24" height="14" rx="3" fill="#1a1a2e" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
        <text x="100" y="90" textAnchor="middle" fill="rgba(239,68,68,0.5)" fontSize="6" fontFamily="monospace">7kg</text>
        {/* Mounting straps */}
        <line x1="90" y1="80" x2="85" y2="78" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" />
        <line x1="110" y1="80" x2="115" y2="78" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" />
      </motion.g>

      {/* Drop indicator */}
      <motion.g animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
        <line x1="100" y1="100" x2="100" y2="125" stroke="rgba(239,68,68,0.3)" strokeWidth="0.8" strokeDasharray="3 2" />
        <circle cx="100" cy="130" r="6" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="0.8" />
        <circle cx="100" cy="130" r="10" fill="none" stroke="rgba(239,68,68,0.1)" strokeWidth="0.5" />
      </motion.g>

      {/* Label */}
      <text x="100" y="152" textAnchor="middle" fill="rgba(59,130,246,0.3)" fontSize="7" fontFamily="monospace" letterSpacing="2">ARBAEEN VTOL</text>
    </svg>
  );
}

function FogGeneratorIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Fog/mist particles - large cloud */}
      <motion.circle cx="140" cy="50" r="20" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.08)" strokeWidth="0.5"
        animate={{ r: [20, 30, 20], cx: [140, 155, 140], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.circle cx="160" cy="40" r="16" fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.07)" strokeWidth="0.5"
        animate={{ r: [16, 26, 16], cx: [160, 175, 160], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="150" cy="65" r="14" fill="rgba(245,158,11,0.04)"
        animate={{ r: [14, 22, 14], cx: [150, 168, 150], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} />
      <motion.circle cx="170" cy="55" r="22" fill="rgba(245,158,11,0.03)"
        animate={{ r: [22, 35, 22], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 5, repeat: Infinity, delay: 0.3 }} />
      <motion.circle cx="130" cy="35" r="10" fill="rgba(245,158,11,0.04)"
        animate={{ r: [10, 16, 10], cx: [130, 145, 130], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />

      {/* Truck body */}
      <rect x="20" y="85" width="90" height="30" rx="3" fill="#1a1a2e" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
      {/* Cabin */}
      <rect x="20" y="80" width="30" height="35" rx="3" fill="#1a1a2e" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" />
      {/* Windshield */}
      <rect x="23" y="83" width="24" height="12" rx="1.5" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.2)" strokeWidth="0.8" />
      {/* Wheels */}
      <circle cx="35" cy="118" r="7" fill="#1a1a2e" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
      <circle cx="35" cy="118" r="3" fill="rgba(245,158,11,0.1)" />
      <circle cx="95" cy="118" r="7" fill="#1a1a2e" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
      <circle cx="95" cy="118" r="3" fill="rgba(245,158,11,0.1)" />

      {/* Fog generator apparatus on truck bed */}
      <rect x="55" y="78" width="50" height="10" rx="2" fill="#1a1a2e" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
      {/* Nozzle / barrel */}
      <rect x="105" y="75" width="20" height="16" rx="2" fill="#1a1a2e" stroke="rgba(245,158,11,0.5)" strokeWidth="1.2" />
      <circle cx="125" cy="83" r="5" fill="#0d0d1a" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
      <motion.circle cx="125" cy="83" r="3" fill="rgba(245,158,11,0.3)"
        animate={{ opacity: [0.2, 0.8, 0.2], r: [3, 4, 3] }} transition={{ duration: 1.5, repeat: Infinity }} />

      {/* Spray lines from nozzle */}
      <motion.path d="M 130 80 Q 145 70 160 45" stroke="rgba(245,158,11,0.12)" strokeWidth="1" fill="none" strokeDasharray="4 3"
        animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M 130 83 Q 150 78 170 60" stroke="rgba(245,158,11,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 3"
        animate={{ opacity: [0, 0.35, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }} />
      <motion.path d="M 130 86 Q 148 85 165 75" stroke="rgba(245,158,11,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 3"
        animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }} />

      {/* Tank labels */}
      <text x="80" y="100" textAnchor="middle" fill="rgba(245,158,11,0.3)" fontSize="6" fontFamily="monospace">DISPERSAL</text>

      {/* Label */}
      <text x="80" y="145" textAnchor="middle" fill="rgba(245,158,11,0.3)" fontSize="7" fontFamily="monospace" letterSpacing="2">SHAHID MEISAMI</text>
    </svg>
  );
}

const illustrations = [GrenadeIllustration, DroneIllustration, FogGeneratorIllustration];

const platforms = [
  { icon: Bomb, color: 'red', he: { title: 'רימוני גז טקטיים', desc: 'רימונים נושאי מדטומידין (ABC-M7A2/A3) שפותחו בפרויקט הרתעה. מילוי 18 גרם, 40% מדטומידין. מחסניות MK 2 38mm. רימוני "אשכן" (RCA).', spec: 'שיתוק ואיבוד הכרה של אנשים במבנים וחללים סגורים תוך שניות' }, en: { title: 'Tactical Gas Grenades', desc: 'Medetomidine-loaded grenades (ABC-M7A2/A3) from Project Deterrence. 18g fill, 40% medetomidine. MK 2 38mm cartridges. "Ashkan" RCA grenades.', spec: 'Incapacitating people in buildings and enclosed spaces within seconds' } },
  { icon: Plane, color: 'blue', he: { title: 'חימוש נישא רחפנים', desc: 'מל"ט "ארבעין" — קואדקופטר VTOL של כוחות היבשה IRGC. מטען 7 ק"ג, טווח 10 ק"מ, שעת טיסה.', spec: 'שיגור חומרים כימיים מרחפן ישירות אל מטרות קרקעיות' }, en: { title: 'Drone-Carried Munitions', desc: '"Arbaeen" VTOL quadcopter by IRGC Ground Forces. 7kg payload, 10km range, 1hr flight time.', spec: 'Launching chemical agents from drone directly onto ground targets' } },
  { icon: Wind, color: 'amber', he: { title: 'מערכות יצרני ערפל', desc: 'מערכות "מייצר ערפל" (Fog Generator) על משאיות. פיתוח קבוצת שהיד מייסמי.', spec: 'ריסוס כמויות גדולות של חומרים הגורמים לאיבוד הכרה על שטח רחב בדקות ספורות' }, en: { title: 'Fog Generator Systems', desc: 'Vehicle-mounted Fog Generator systems. Developed by Shahid Meisami Group.', spec: 'Spraying large quantities of incapacitating agents over wide area in minutes' } },
];

export default function Platforms() {
  const { t, lang } = useLang();
  const colorMap: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
    red: { border: 'border-red-500/30', bg: 'bg-red-500/5', text: 'text-red-400', iconBg: 'bg-red-500/10' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-400', iconBg: 'bg-blue-500/10' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/5', text: 'text-amber-400', iconBg: 'bg-amber-500/10' },
  };

  return (
    <section id="platforms" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('platforms.title')}</h2>
        <p className="text-gray-400">{t('platforms.subtitle')}</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p, i) => {
          const Icon = p.icon;
          const Illustration = illustrations[i];
          const c = colorMap[p.color];
          const d = lang === 'he' ? p.he : p.en;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className={`rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm overflow-hidden flex flex-col`}
            >
              {/* Animated illustration */}
              <div className={`relative h-44 border-b ${c.border} bg-[#0a0a14]`}>
                <Illustration />
                {/* Overlay icon badge */}
                <div className={`absolute top-3 ${lang === 'he' ? 'right-3' : 'left-3'} w-8 h-8 rounded-lg ${c.iconBg} ${c.border} border flex items-center justify-center`}>
                  <Icon size={16} className={c.text} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className={`text-lg font-bold mb-2 ${c.text}`}>{d.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">{d.desc}</p>
                <div className={`text-[11px] font-semibold ${c.text} px-3 py-1.5 rounded-full ${c.iconBg} text-center`}>
                  {d.spec}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
