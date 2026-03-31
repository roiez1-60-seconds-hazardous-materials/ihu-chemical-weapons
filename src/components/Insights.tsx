'use client';
import { motion } from 'framer-motion';
import { FlaskConical, Wind, Users, Skull } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const domains = [
  { icon: FlaskConical, color: 'blue', he: { title: 'כימיה מבוססת תרופות', desc: 'ייצור ועיבוד של חומרים הגורמים לאיבוד הכרה ולמוות' }, en: { title: 'Pharmaceutical Chemistry', desc: 'Synthesis & formulation of incapacitating and lethal agents' } },
  { icon: Wind, color: 'amber', he: { title: 'הנדסת פיזור אזרחית', desc: 'הפיכת חומרים לריסוס אווירי, מנהרות רוח ומערכות הפצה' }, en: { title: 'Civilian Dispersal Engineering', desc: 'Aerosolization, wind tunnels & delivery systems' } },
  { icon: Users, color: 'purple', he: { title: 'אסטרטגיית פרוקסי אסימטרית', desc: 'העברה לחיזבאללה ומיליציות לשימוש מבצעי' }, en: { title: 'Asymmetric Proxy Strategy', desc: 'Transfer to Hezbollah & militias for operational use' } },
];

export default function Insights() {
  const { t, lang } = useLang();
  const isHe = lang === 'he';
  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    blue: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', text: 'text-blue-400' },
    amber: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-400' },
    purple: { border: 'border-purple-500/40', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-3">{t('insights.title')}</h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          {isHe ? 'התקיפות על IHU מוכיחות כי האיום המרכזי כיום צומח תחת חסות אקדמית לכאורה — לא רק במתקני גרעין תת-קרקעיים.'
            : 'Strikes on IHU demonstrate that today\'s primary threat grows under academic guise — not just in underground nuclear facilities.'}
        </p>
      </motion.div>

      {/* Three domains — clean cards, no overlapping circles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {domains.map((d, i) => {
          const Icon = d.icon;
          const c = colorMap[d.color];
          const data = isHe ? d.he : d.en;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm text-center`}
            >
              <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center mx-auto mb-3`}>
                <Icon size={24} className={c.text} />
              </div>
              <h3 className={`text-sm font-bold mb-2 ${c.text}`}>{data.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">{data.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Convergence arrow into center */}
      <div className="flex justify-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-8">
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} className="w-0.5 h-6 bg-blue-500/40 rounded-full" />
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="w-0.5 h-6 bg-amber-500/40 rounded-full" />
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="w-0.5 h-6 bg-purple-500/40 rounded-full" />
            </div>
            <motion.div
              animate={{ boxShadow: ['0 0 15px rgba(239,68,68,0.15)', '0 0 30px rgba(239,68,68,0.35)', '0 0 15px rgba(239,68,68,0.15)'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="px-6 py-3 rounded-xl bg-red-600/10 border-2 border-red-500/40 flex items-center gap-3"
            >
              <Skull size={22} className="text-red-400" />
              <span className="text-sm font-black text-red-400">
                {isHe ? 'נשק השמדה אסימטרי' : 'Asymmetric WMD'}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0 }}
        className="text-center p-6 rounded-2xl bg-gray-800/30 border border-gray-700/30"
      >
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {isHe
            ? 'תוכנית החמ"ת של איראן מסמלת מעבר מנשק השמדה המונית לנשק הגורם לאיבוד הכרה ומוות — כלים המיועדים לשימוש יומיומי במלחמות פרוקסי באזור האפור.'
            : "Iran's PBA program symbolizes a shift from WMDs to tactical incapacitation weapons — tools designed for everyday use in gray-zone proxy wars."}
        </p>
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-red-400 font-black mt-4 text-sm"
        >
          {isHe ? 'האיום פעיל. היכולת הוכחה. מערכות המשלוח מבצעיות.' : 'The threat is active. The capability is demonstrated. Delivery systems are operational.'}
        </motion.p>
      </motion.div>
    </section>
  );
}
