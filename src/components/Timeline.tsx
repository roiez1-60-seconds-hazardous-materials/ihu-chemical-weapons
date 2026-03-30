'use client';
import { motion } from 'framer-motion';
import { Flame, Eye, ShoppingCart, FileWarning, Bomb, Crosshair } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const eventsData = [
  { year: '2002', icon: Eye, colorClass: 'border-amber-500 bg-amber-500/10 text-amber-400', he: { label: 'השראה', desc: 'שימוש בנגזרת פנטניל בתיאטרון במוסקבה — 130 בני ערובות נהרגו' }, en: { label: 'Inspiration', desc: 'Fentanyl derivative used at Moscow theater — 130 hostages killed' } },
  { year: '2005', icon: Flame, colorClass: 'border-blue-500 bg-blue-500/10 text-blue-400', he: { label: 'מחקר', desc: 'תחילת פרסום מאמרים על סינתזת פנטניל ופרקורסורים של סוכני עצב ב-IHU' }, en: { label: 'Research', desc: 'First publications on fentanyl synthesis and nerve agent precursors at IHU' } },
  { year: '2014', icon: ShoppingCart, colorClass: 'border-red-500 bg-red-500/10 text-red-400', he: { label: 'רכש', desc: 'ניסיון רכישת אלפי מנות מדטומידין מסין — ללא היסטוריה רפואית במחלקה' }, en: { label: 'Procurement', desc: 'Attempted purchase of thousands of medetomidine doses from China — no medical research history' } },
  { year: '2023', icon: FileWarning, colorClass: 'border-purple-500 bg-purple-500/10 text-purple-400', he: { label: 'חשיפה', desc: 'הדלפת מסמכי פרויקט הרתעה — רימוני גז מבוססי מדטומידין' }, en: { label: 'Exposure', desc: 'Leak of Project Deterrence documents — medetomidine-based grenades' } },
  { year: '2025', icon: Bomb, colorClass: 'border-orange-500 bg-orange-500/10 text-orange-400', he: { label: 'השמדה', desc: 'תקיפה ישראלית — השמדת מתחם שהיד מייסמי ותקיפת IHU' }, en: { label: 'Destruction', desc: 'Israeli strike — Shahid Meisami complex destroyed, IHU struck' } },
  { year: '2026', icon: Crosshair, colorClass: 'border-red-600 bg-red-600/10 text-red-500', he: { label: 'סיכול', desc: 'תקיפות צה"ל על 3 מטרות ספציפיות בקמפוס IHU — מרכז כימיה, מנהרות רוח, מרכז הנדסה' }, en: { label: 'Targeted Strike', desc: 'IDF strikes on 3 specific IHU campus targets — Chemistry, Wind Tunnels, Engineering' } },
];

export default function Timeline() {
  const { t, lang } = useLang();
  return (
    <section id="timeline" className="relative py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('timeline.title')}</h2>
        <p className="text-gray-400">{t('timeline.subtitle')}</p>
      </motion.div>
      <div className="relative">
        {/* Burning fuse line */}
        <motion.div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="w-full rounded-full"
            style={{ background: 'linear-gradient(180deg, #f59e0b, #ef4444, #7c3aed)' }}
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </motion.div>
        {eventsData.map((ev, i) => {
          const Icon = ev.icon;
          const isLeft = i % 2 === 0;
          const data = lang === 'he' ? ev.he : ev.en;
          return (
            <motion.div
              key={ev.year}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-5/12 ${isLeft ? 'text-left pr-8' : 'text-right pl-8'}`}>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className={`p-4 rounded-xl border ${ev.colorClass} backdrop-blur-sm`}>
                  <div className="font-mono text-2xl font-black mb-1">{ev.year}</div>
                  <div className="font-bold text-sm mb-1">{data.label}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{data.desc}</div>
                </motion.div>
              </div>
              <div className="w-2/12 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className={`w-10 h-10 rounded-full border-2 ${ev.colorClass} flex items-center justify-center z-10`}
                >
                  <Icon size={18} />
                </motion.div>
              </div>
              <div className="w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
