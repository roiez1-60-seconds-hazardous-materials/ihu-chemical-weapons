'use client';
import { motion } from 'framer-motion';
import { Syringe, Skull, ShieldAlert, ShieldOff } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const rows = [
  { key: 'examples', icon: null, he: { label: 'דוגמאות', pba: 'פנטניל, מדטומידין', nerve: 'סרין, VX' }, en: { label: 'Examples', pba: 'Fentanyl, Medetomidine', nerve: 'Sarin, VX' } },
  { key: 'objective', icon: null, he: { label: 'מטרה', pba: 'ניטרול טקטי, טשטוש, חטיפות', nerve: 'קטלניות והשמדה המונית' }, en: { label: 'Objective', pba: 'Tactical neutralization, abduction', nerve: 'Lethality and mass destruction' } },
  { key: 'mechanism', icon: null, he: { label: 'מנגנון', pba: 'דיכוי מערכת העצבים (CNS)', nerve: 'עיכוב אנזים AChE' }, en: { label: 'Mechanism', pba: 'CNS depression', nerve: 'AChE enzyme inhibition' } },
  { key: 'deniability', icon: null, he: { label: 'הכחשה סבירה', pba: 'גבוהה מאוד — שימוש רפואי כפול', nerve: 'אפסית — נשק צבאי מובהק' }, en: { label: 'Deniability', pba: 'Very high — dual medical use', nerve: 'Zero — overtly military' } },
];

const pillars = [
  { he: { title: 'חומרים מבוססי תרופות', desc: 'פנטניל ומדטומידין — קטלני מעל 2 מ"ג' }, en: { title: 'PBAs', desc: 'Fentanyl & medetomidine — lethal above 2mg' }, color: 'red' },
  { he: { title: 'גזי עצבים', desc: 'כולל נוביצ\'וק — ייצור בקנה מידה קטן' }, en: { title: 'Nerve Agents', desc: 'Including Novichok — small-scale production' }, color: 'purple' },
  { he: { title: 'RCAs', desc: 'רימוני "אשכן" — ללא הצהרה מלאה' }, en: { title: 'RCAs', desc: '"Ashkan" grenades — undeclared' }, color: 'amber' },
];

export default function Paradigm() {
  const { t, lang } = useLang();
  return (
    <section id="paradigm" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('paradigm.title')}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{t('paradigm.subtitle')}</p>
      </motion.div>

      {/* Three pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {pillars.map((p, i) => {
          const d = lang === 'he' ? p.he : p.en;
          const colors: Record<string, string> = { red: 'border-red-500/40 bg-red-500/5', purple: 'border-purple-500/40 bg-purple-500/5', amber: 'border-amber-500/40 bg-amber-500/5' };
          const textColors: Record<string, string> = { red: 'text-red-400', purple: 'text-purple-400', amber: 'text-amber-400' };
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`p-5 rounded-xl border ${colors[p.color]} backdrop-blur-sm text-center`}
            >
              <div className={`text-xl font-black mb-2 ${textColors[p.color]}`}>{d.title}</div>
              <div className="text-xs text-gray-400">{d.desc}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto -mx-4 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm min-w-[480px]">
        {/* Header */}
        <div className="grid grid-cols-3 bg-gray-800/50">
          <div className="p-3 text-center text-xs text-gray-500 font-semibold">{lang === 'he' ? 'פרמטר' : 'Parameter'}</div>
          <div className="p-3 text-center border-x border-gray-700/30">
            <div className="flex items-center justify-center gap-1">
              <Syringe size={14} className="text-red-400" />
              <span className="text-sm font-bold text-red-400">{lang === 'he' ? 'חומרים מבוססי תרופות' : 'PBAs'}</span>
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Skull size={14} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-400">{lang === 'he' ? 'גז עצבים' : 'Nerve Agent'}</span>
            </div>
          </div>
        </div>
        {rows.map((r, i) => {
          const d = lang === 'he' ? r.he : r.en;
          return (
            <motion.div
              key={r.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-gray-900/30' : 'bg-transparent'} border-t border-gray-700/20`}
            >
              <div className="p-3 text-xs font-semibold text-gray-300">{d.label}</div>
              <div className="p-3 text-xs text-red-300/80 border-x border-gray-700/20">{d.pba}</div>
              <div className="p-3 text-xs text-gray-500">{d.nerve}</div>
            </motion.div>
          );
        })}
      </motion.div>
      </div>
    </section>
  );
}
