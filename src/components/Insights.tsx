'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function Insights() {
  const { t, lang } = useLang();
  const isHe = lang === 'he';
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('insights.title')}</h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          {isHe ? 'התקיפות על IHU מוכיחות כי האיום המרכזי כיום אינו מוגבל למתקני גרעין תת-קרקעיים, אלא צומח תחת חסות אקדמית לכאורה.'
            : 'Strikes on IHU demonstrate that today\'s primary threat is not limited to underground nuclear facilities but grows under the guise of academic legitimacy.'}
        </p>
      </motion.div>

      {/* Venn Diagram */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto mb-12">
        {/* Circle 1 - Chemistry */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-0 right-1/4 w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-blue-500/40 bg-blue-500/5 flex items-center justify-center"
        >
          <span className="text-xs sm:text-sm font-bold text-blue-400 text-center px-4 -translate-y-6">
            {isHe ? 'כימיה\nמבוססת\nתרופות' : 'Pharma\nChemistry'}
          </span>
        </motion.div>

        {/* Circle 2 - Engineering */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-0 left-1/4 w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-amber-500/40 bg-amber-500/5 flex items-center justify-center"
        >
          <span className="text-xs sm:text-sm font-bold text-amber-400 text-center px-4 -translate-y-6">
            {isHe ? 'הנדסת\nפיזור\nאזרחית' : 'Civilian\nDispersal\nEngineering'}
          </span>
        </motion.div>

        {/* Circle 3 - Proxy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-purple-500/40 bg-purple-500/5 flex items-end justify-center"
        >
          <span className="text-xs sm:text-sm font-bold text-purple-400 text-center px-4 translate-y-[-1.5rem]">
            {isHe ? 'אסטרטגיית\nפרוקסי\nאסימטרית' : 'Asymmetric\nProxy\nStrategy'}
          </span>
        </motion.div>

        {/* Center intersection */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(239,68,68,0.2)', '0 0 40px rgba(239,68,68,0.5)', '0 0 20px rgba(239,68,68,0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-red-600/20 border-2 border-red-500/60 flex items-center justify-center"
          >
            <span className="text-[10px] sm:text-xs font-black text-red-400 text-center leading-tight">
              {isHe ? 'נשק\nהשמדה\nאסימטרי' : 'Asymmetric\nWMD'}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        className="text-center p-6 rounded-2xl bg-gray-800/30 border border-gray-700/30"
      >
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-semibold">
          {isHe
            ? 'תוכנית ה-PBA של איראן מסמלת מעבר מנשק השמדה המונית לנשק שיתוק טקטי — כלים המיועדים לשימוש יומיומי במלחמות פרוקסי באזור האפור.'
            : "Iran's PBA program symbolizes a shift from WMDs to tactical incapacitation weapons — tools designed for everyday use in gray-zone proxy wars."}
        </p>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-red-400 font-black mt-4 text-sm"
        >
          {isHe ? 'האיום פעיל. היכולת הוכחה. מערכות המשלוח מבצעיות.' : 'The threat is active. The capability is demonstrated. Delivery systems are operational.'}
        </motion.p>
      </motion.div>
    </section>
  );
}
