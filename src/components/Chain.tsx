'use client';
import { motion } from 'framer-motion';
import { Microscope, Shield, Factory, Crosshair } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const links = [
  { icon: Microscope, color: 'blue', he: { title: 'IHU (מו"פ)', desc: 'פיתוח וייצור חומרים כימיים, בדיקת רעילות' }, en: { title: 'IHU (R&D)', desc: 'Development, synthesis & toxicological models' } },
  { icon: Shield, color: 'purple', he: { title: 'SPND (פיקוח)', desc: 'תיאום פרויקטים רגישים ומימון' }, en: { title: 'SPND (Oversight)', desc: 'Coordination of sensitive projects & funding' } },
  { icon: Factory, color: 'amber', he: { title: 'שהיד מייסמי (ייצור)', desc: 'ייצור רימונים ומערכות פיזור — הושמד 2025' }, en: { title: 'Shahid Meisami (Mfg)', desc: 'Grenades & dispersal systems — destroyed 2025' } },
  { icon: Crosshair, color: 'red', he: { title: 'חיזבאללה / מיליציות', desc: 'היערכות טקטית — חטיפות ופשיטות גבול' }, en: { title: 'Hezbollah / Militias', desc: 'Tactical deployment — abductions & border raids' } },
];

export default function Chain() {
  const { t, lang } = useLang();
  const colors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
    blue: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
    purple: { border: 'border-purple-500/40', bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
    amber: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
    red: { border: 'border-red-500/40', bg: 'bg-red-500/10', text: 'text-red-400', glow: 'shadow-red-500/20' },
  };

  return (
    <section id="chain" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('chain.title')}</h2>
        <p className="text-gray-400">{t('chain.subtitle')}</p>
      </motion.div>
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
        {links.map((link, i) => {
          const Icon = link.icon;
          const c = colors[link.color];
          const d = lang === 'he' ? link.he : link.en;
          return (
            <div key={i} className="flex items-center gap-2 sm:gap-0 sm:flex-col w-full sm:w-1/4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                whileHover={{ scale: 1.02, y: -3 }}
                className={`p-5 rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm w-full shadow-lg ${c.glow} text-center`}
              >
                <motion.div
                  animate={{ boxShadow: [`0 0 10px rgba(59,130,246,0.1)`, `0 0 25px rgba(59,130,246,0.3)`, `0 0 10px rgba(59,130,246,0.1)`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className={`w-12 h-12 rounded-full ${c.bg} ${c.border} border flex items-center justify-center mx-auto mb-3`}
                >
                  <Icon size={22} className={c.text} />
                </motion.div>
                <div className={`font-bold text-sm mb-1 ${c.text}`}>{d.title}</div>
                <div className="text-[11px] text-gray-500 leading-relaxed">{d.desc}</div>
              </motion.div>
              {/* Arrow connector */}
              {i < links.length - 1 && (
                <motion.div
                  className="hidden sm:block absolute"
                  style={{ left: `${(i + 1) * 25 - 3}%`, top: '45%' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                >
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-gray-600 text-2xl"
                  >
                    {lang === 'he' ? '←' : '→'}
                  </motion.div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
