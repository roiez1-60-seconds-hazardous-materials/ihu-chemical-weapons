'use client';
import { motion } from 'framer-motion';
import { Crosshair, MapPin } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const targets = [
  { id: '01', x: '68%', y: '28%', color: '#ef4444', he: { name: 'המרכז לכימיה', desc: 'מוקד פיתוח וסינתזת נשק כימי מבוסס תרופות' }, en: { name: 'Chemistry Center', desc: 'PBA development and synthesis hub' } },
  { id: '02', x: '25%', y: '45%', color: '#f59e0b', he: { name: 'מנהרות הרוח', desc: 'תשתית לפיתוח ובחינת מערכות פיזור אירוסוליות' }, en: { name: 'Wind Tunnels', desc: 'Aerosol dispersal system testing infrastructure' } },
  { id: '03', x: '50%', y: '72%', color: '#8b5cf6', he: { name: 'מרכז טכנולוגיה והנדסה', desc: 'שילוב מטענים כימיים עם פלטפורמות מכניות' }, en: { name: 'Tech & Engineering Center', desc: 'Integration of chemical payloads with platforms' } },
];

export default function Strikes() {
  const { t, lang } = useLang();
  return (
    <section id="response" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('strikes.title')}</h2>
        <p className="text-gray-400">{t('strikes.subtitle')}</p>
      </motion.div>

      {/* Campus map with targets */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-2xl border border-gray-700/40 bg-gray-900/50 backdrop-blur-sm overflow-hidden mx-auto max-w-3xl"
        style={{ aspectRatio: '16/10' }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        {/* Night vision overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 to-transparent" />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,0,0.2), transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Campus label */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 font-mono text-[10px] text-green-500/60">
          35.7456°N, 51.4890°E — IHU CAMPUS
        </div>
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="font-mono text-[10px] text-red-500">
            ● LIVE
          </motion.span>
        </div>

        {/* Building blocks */}
        {[
          { x: '15%', y: '20%', w: 60, h: 30 },
          { x: '35%', y: '15%', w: 80, h: 35 },
          { x: '60%', y: '20%', w: 70, h: 40 },
          { x: '20%', y: '45%', w: 50, h: 50 },
          { x: '45%', y: '40%', w: 90, h: 30 },
          { x: '70%', y: '45%', w: 60, h: 35 },
          { x: '30%', y: '65%', w: 70, h: 30 },
          { x: '55%', y: '68%', w: 80, h: 35 },
          { x: '75%', y: '70%', w: 50, h: 25 },
        ].map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="absolute bg-gray-700/30 border border-gray-600/20 rounded-sm"
            style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
          />
        ))}

        {/* Target crosshairs */}
        {targets.map((tgt, i) => (
          <motion.div
            key={tgt.id}
            initial={{ opacity: 0, scale: 3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 + i * 0.4, type: 'spring', stiffness: 150 }}
            className="absolute z-10 flex flex-col items-center"
            style={{ left: tgt.x, top: tgt.y, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Crosshair size={32} style={{ color: tgt.color }} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Target legend cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
        {targets.map((tgt, i) => {
          const d = lang === 'he' ? tgt.he : tgt.en;
          return (
            <motion.div
              key={tgt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 + i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl border border-gray-700/30 bg-gray-900/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white" style={{ backgroundColor: tgt.color }}>
                  {tgt.id}
                </div>
                <span className="text-sm font-bold text-gray-200">{d.name}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{d.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
