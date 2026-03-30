'use client';
import { motion } from 'framer-motion';
import { Crosshair, MapPin, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const IHU_LAT = 35.7456;
const IHU_LNG = 51.4890;
const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/Imam+Hossein+University/@${IHU_LAT},${IHU_LNG},16z`;

const targets = [
  { id: '01', color: '#ef4444', he: { name: 'המרכז לכימיה', desc: 'מוקד פיתוח וסינתזת נשק כימי מבוסס תרופות' }, en: { name: 'Chemistry Center', desc: 'PBA development and synthesis hub' } },
  { id: '02', color: '#f59e0b', he: { name: 'מנהרות הרוח', desc: 'תשתית לפיתוח ובחינת מערכות פיזור אירוסוליות' }, en: { name: 'Wind Tunnels', desc: 'Aerosol dispersal system testing infrastructure' } },
  { id: '03', color: '#8b5cf6', he: { name: 'מרכז טכנולוגיה והנדסה', desc: 'שילוב מטענים כימיים עם פלטפורמות מכניות' }, en: { name: 'Tech & Engineering Center', desc: 'Integration of chemical payloads with platforms' } },
];

export default function Strikes() {
  const { t, lang } = useLang();
  const isHe = lang === 'he';
  return (
    <section id="response" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('strikes.title')}</h2>
        <p className="text-gray-400">{t('strikes.subtitle')}</p>
      </motion.div>

      {/* Real satellite map embed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl border border-gray-700/40 overflow-hidden mx-auto max-w-3xl"
      >
        {/* Google Maps Embed - satellite view of IHU */}
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.5!2d${IHU_LNG}!3d${IHU_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e02d0d3e4c2b1%3A0x5f1e8d9a8c5b6a7!2sImam+Hossein+University!5e1!3m2!1sen!2s!4v1`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: 'saturate(0.7) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Overlay with coordinates */}
          <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-gray-600/30">
            <div className="font-mono text-[10px] text-green-400">
              {IHU_LAT}°N, {IHU_LNG}°E
            </div>
            <div className="font-mono text-[9px] text-gray-500">
              Imam Hossein University, Tehran
            </div>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="font-mono text-[10px] text-red-500 bg-black/70 px-2 py-1 rounded">
              ● LIVE
            </motion.span>
          </div>
        </div>

        {/* Link to Google Maps */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-gray-800/80 border-t border-gray-700/30 hover:bg-gray-700/50 transition-colors"
        >
          <MapPin size={14} className="text-blue-400" />
          <span className="text-xs text-blue-400 font-semibold">
            {isHe ? 'פתח ב-Google Maps' : 'Open in Google Maps'}
          </span>
          <ExternalLink size={12} className="text-blue-400" />
        </a>
      </motion.div>

      {/* Target legend cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
        {targets.map((tgt, i) => {
          const d = isHe ? tgt.he : tgt.en;
          return (
            <motion.div
              key={tgt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl border border-gray-700/30 bg-gray-900/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <Crosshair size={16} style={{ color: tgt.color }} />
                  <span className="text-[10px] font-mono font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: tgt.color + '30', border: `1px solid ${tgt.color}50` }}>
                    TARGET {tgt.id}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-bold text-gray-200 mb-1">{d.name}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{d.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
