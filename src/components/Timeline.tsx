'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Eye, ShoppingCart, FileWarning, Bomb, Crosshair } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const eventsData = [
  { year: '2002', icon: Eye, colorClass: 'border-amber-500 bg-amber-500/10 text-amber-400', he: { label: 'השראה', desc: 'שימוש בנגזרת פנטניל בתיאטרון במוסקבה — 130 בני ערובה נהרגו' }, en: { label: 'Inspiration', desc: 'Fentanyl derivative used at Moscow theater — 130 hostages killed' } },
  { year: '2005', icon: Flame, colorClass: 'border-blue-500 bg-blue-500/10 text-blue-400', he: { label: 'מחקר', desc: 'תחילת פרסום מאמרים על ייצור פנטניל וחומרי גלם לייצור גזי עצבים ב-IHU' }, en: { label: 'Research', desc: 'First publications on fentanyl synthesis and nerve agent precursors at IHU' } },
  { year: '2014', icon: ShoppingCart, colorClass: 'border-red-500 bg-red-500/10 text-red-400', he: { label: 'רכש', desc: 'ניסיון רכישת אלפי מנות מדטומידין מסין — ללא היסטוריה רפואית במחלקה' }, en: { label: 'Procurement', desc: 'Attempted purchase of thousands of medetomidine doses from China — no medical research history' } },
  { year: '2023', icon: FileWarning, colorClass: 'border-purple-500 bg-purple-500/10 text-purple-400', he: { label: 'חשיפה', desc: 'הדלפת מסמכי פרויקט הרתעה — רימוני גז מבוססי מדטומידין' }, en: { label: 'Exposure', desc: 'Leak of Project Deterrence documents — medetomidine-based grenades' } },
  { year: '2025', icon: Bomb, colorClass: 'border-orange-500 bg-orange-500/10 text-orange-400', he: { label: 'השמדה', desc: 'תקיפה ישראלית — השמדת מתחם שהיד מייסמי ותקיפת IHU' }, en: { label: 'Destruction', desc: 'Israeli strike — Shahid Meisami complex destroyed, IHU struck' } },
  { year: '2026', icon: Crosshair, colorClass: 'border-red-600 bg-red-600/10 text-red-500', he: { label: 'סיכול', desc: 'תקיפות צה"ל על 3 מטרות ספציפיות בקמפוס IHU — מרכז כימיה, מנהרות רוח, מרכז הנדסה' }, en: { label: 'Targeted Strike', desc: 'IDF strikes on 3 specific IHU campus targets — Chemistry, Wind Tunnels, Engineering' } },
];

function TimelineEvent({ ev, index, lang }: { ev: typeof eventsData[0]; index: number; lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = ev.icon;
  const data = lang === 'he' ? ev.he : ev.en;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex items-start gap-4 mb-8"
    >
      <div className="flex-shrink-0 z-10">
        <motion.div
          whileHover={{ scale: 1.15 }}
          animate={isInView ? {
            boxShadow: [
              `0 0 0px ${ev.colorClass.includes('red') ? 'rgba(239,68,68,0)' : ev.colorClass.includes('amber') ? 'rgba(245,158,11,0)' : 'rgba(59,130,246,0)'}`,
              `0 0 20px ${ev.colorClass.includes('red') ? 'rgba(239,68,68,0.4)' : ev.colorClass.includes('amber') ? 'rgba(245,158,11,0.4)' : 'rgba(59,130,246,0.4)'}`,
              `0 0 0px ${ev.colorClass.includes('red') ? 'rgba(239,68,68,0)' : ev.colorClass.includes('amber') ? 'rgba(245,158,11,0)' : 'rgba(59,130,246,0)'}`,
            ]
          } : {}}
          transition={{ duration: 2, repeat: isInView ? 2 : 0 }}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 ${ev.colorClass} flex items-center justify-center bg-[#0d0d1a]`}
        >
          <Icon size={18} />
        </motion.div>
      </div>
      <div className={`flex-1 p-4 rounded-xl border ${ev.colorClass} backdrop-blur-sm`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xl font-black">{ev.year}</span>
          <span className="text-xs font-bold opacity-70">{data.label}</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{data.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const { t, lang } = useLang();

  return (
    <section id="timeline" className="relative py-20 px-4 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('timeline.title')}</h2>
        <p className="text-gray-400">{t('timeline.subtitle')}</p>
      </motion.div>
      <div className="relative">
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
          <TimelineEvent key={ev.year} ev={ev} index={i} lang={lang} />
        ))}
      </div>
    </section>
  );
}
