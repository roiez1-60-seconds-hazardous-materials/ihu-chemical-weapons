'use client';
import { motion } from 'framer-motion';
import { Crosshair, MapPin, ExternalLink, Satellite, Navigation } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

/* ── Corrected coordinates from Wikidata: 35°45'2"N, 51°35'15"E ── */
const IHU_LAT = 35.7506;
const IHU_LNG = 51.5875;
const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/Imam+Hossein+University/@${IHU_LAT},${IHU_LNG},15z`;

const targets = [
  {
    id: '01',
    color: '#ef4444',
    he: { name: 'מרכז הכימיה והסינתזה', desc: 'מוקד פיתוח וסינתזת נשק כימי מבוסס תרופות (PBAs) — כולל פנטניל ואנלוגים' },
    en: { name: 'Chemistry & Synthesis Center', desc: 'PBA development and synthesis hub — including fentanyl and analogues' },
  },
  {
    id: '02',
    color: '#f59e0b',
    he: { name: 'מנהרות הרוח', desc: 'תשתית לפיתוח ובחינת מערכות פיזור אירוסוליות וחומרי הדמיה' },
    en: { name: 'Wind Tunnels', desc: 'Aerosol dispersal system testing and simulant delivery infrastructure' },
  },
  {
    id: '03',
    color: '#8b5cf6',
    he: { name: 'מרכז טכנולוגיה והנדסה', desc: 'שילוב מטענים כימיים עם פלטפורמות מכניות — רחפנים, רימונים, מייצרי ערפל' },
    en: { name: 'Tech & Engineering Center', desc: 'Integration of chemical payloads with platforms — drones, grenades, fog generators' },
  },
];

const facilityFacts = {
  he: [
    { label: 'מיקום', value: 'צפון-מזרח טהראן, כביש שהיד באבאיי' },
    { label: 'שכונה', value: 'ליד הקימייה וטהראן-פארס' },
    { label: 'הוקם', value: '1986 בפקודת משמרות המהפכה' },
    { label: 'שטח', value: '~120 דונם (30 אקר)' },
    { label: 'סטטוס', value: 'הותקף יוני 2025, מרץ 2026' },
  ],
  en: [
    { label: 'Location', value: 'NE Tehran, Shahid Babaei Expressway' },
    { label: 'Neighborhood', value: 'Near Hakimiyeh & Tehran Pars' },
    { label: 'Founded', value: '1986 by IRGC order' },
    { label: 'Area', value: '~30 acres (120 dunam)' },
    { label: 'Status', value: 'Struck June 2025, March 2026' },
  ],
};

export default function Strikes() {
  const { t, lang } = useLang();
  const isHe = lang === 'he';
  const facts = isHe ? facilityFacts.he : facilityFacts.en;

  return (
    <section id="response" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
          {t('strikes.title')}
        </h2>
        <p className="text-gray-400">{t('strikes.subtitle')}</p>
      </motion.div>

      {/* ── Two-column: Map + Info ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto mb-8">
        {/* Map — 3/5 width on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 relative rounded-2xl border border-gray-700/40 overflow-hidden"
        >
          {/* Google Maps Embed — satellite, correct coords */}
          <div className="relative" style={{ paddingBottom: '75%' }}>
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3231.0!2d${IHU_LNG}!3d${IHU_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: 'saturate(0.7) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Coordinate overlay */}
            <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600/30">
              <div className="flex items-center gap-1.5 mb-1">
                <Satellite size={12} className="text-blue-400" />
                <span className="font-mono text-[10px] text-blue-400 font-semibold">
                  SATELLITE VIEW
                </span>
              </div>
              <div className="font-mono text-[11px] text-green-400">
                {IHU_LAT}°N, {IHU_LNG}°E
              </div>
              <div className="font-mono text-[9px] text-gray-500">
                Imam Hossein University, NE Tehran
              </div>
            </div>

            {/* LIVE badge */}
            <div className="absolute top-3 right-3 z-10">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="font-mono text-[10px] text-red-500 bg-black/70 px-2 py-1 rounded border border-red-500/30"
              >
                ● LIVE
              </motion.span>
            </div>

            {/* Crosshair overlay in center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crosshair size={40} className="text-red-500/60" strokeWidth={1} />
              </motion.div>
            </div>
          </div>

          {/* Open in Google Maps */}
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

        {/* Facility info card — 2/5 width */}
        <motion.div
          initial={{ opacity: 0, x: isHe ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:col-span-2 rounded-2xl border border-gray-700/40 bg-gray-900/40 backdrop-blur-sm p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Navigation size={16} className="text-red-400" />
              <h3 className="text-lg font-bold text-white">
                {isHe ? 'אוניברסיטת אימאם חוסיין (IHU)' : 'Imam Hossein University (IHU)'}
              </h3>
            </div>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              {isHe
                ? 'המוסד האקדמי היחיד של משמרות המהפכה. משמש כמרכז מחקר ופיתוח לנשק כימי, גרעיני וטילים. הותקף על ידי צה"ל ביוני 2025 ובמרץ 2026.'
                : "The IRGC's sole academic institution. Serves as R&D center for chemical, nuclear and missile weapons. Struck by IDF in June 2025 and March 2026."}
            </p>

            {/* Fact list */}
            <div className="space-y-2.5">
              {facts.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isHe ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex justify-between items-start gap-3 py-1.5 border-b border-gray-700/20 last:border-0"
                >
                  <span className="text-[11px] text-gray-500 font-medium shrink-0">
                    {f.label}
                  </span>
                  <span className="text-[11px] text-gray-300 text-end">
                    {f.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tehran context map link */}
          <a
            href={`https://www.google.com/maps/@${IHU_LAT},${IHU_LNG},13z`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
          >
            <MapPin size={14} className="text-blue-400" />
            <span className="text-xs text-blue-400 font-semibold">
              {isHe ? 'הצג מיקום בהקשר טהראן' : 'View location within Tehran'}
            </span>
          </a>
        </motion.div>
      </div>

      {/* ── Target legend cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
                  <span
                    className="text-[10px] font-mono font-bold text-white px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: tgt.color + '30',
                      border: `1px solid ${tgt.color}50`,
                    }}
                  >
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
