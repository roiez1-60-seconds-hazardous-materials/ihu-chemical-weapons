'use client';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldX, Droplets, Wind, Radio } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function HazMat() {
  const { t, lang } = useLang();
  const isHe = lang === 'he';

  return (
    <section id="hazmat" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('hazmat.title')}</h2>
      </motion.div>

      {/* Critical warning */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-8 p-6 rounded-2xl border-2 border-red-600/50 bg-red-600/5 backdrop-blur-sm"
      >
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="flex items-center gap-3 mb-3">
          <ShieldX className="text-red-500" size={28} />
          <span className="text-lg font-black text-red-400">
            {isHe ? 'סיכון קריטי — נלוקסון עלול שלא לעבוד!' : 'Critical Risk — Naloxone May Not Work!'}
          </span>
        </motion.div>
        <p className="text-sm text-red-300/80 leading-relaxed">
          {isHe
            ? 'שילוב פנטניל עם מדטומידין: נלוקסון חוסם רק את הפנטניל אך לא משפיע על המדטומידין (מנגנון פעולה שונה — אלפא-2 אדרנרגי). נפגע עלול להישאר מורדם וללא נשימה תקינה גם לאחר מתן נלוקסון. נדרש טיפול רפואי מתקדם.'
            : 'Fentanyl combined with medetomidine: naloxone only blocks the fentanyl but has no effect on the medetomidine (different mechanism — alpha-2 adrenergic). Casualty may remain deeply sedated and with impaired breathing even after naloxone. Advanced medical care required.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Agents */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }}
          className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="text-amber-400" size={20} />
            <h3 className="font-bold text-amber-400">{isHe ? 'חומרים עיקריים' : 'Primary Agents'}</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {isHe
              ? 'פנטניל ואנלוגים (תיופנטניל, קרפנטניל), מדטומידין, קוקטיילים עם קטמין וסבופלורן. פנטניל קטלני מעל 2 מ"ג בלבד.'
              : 'Fentanyl & analogues (thiofentanyl, carfentanil), medetomidine, cocktails with ketamine & sevoflurane. Fentanyl lethal above just 2 mg.'}
          </p>
        </motion.div>

        {/* Delivery */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }}
          className="p-5 rounded-xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="text-blue-400" size={20} />
            <h3 className="font-bold text-blue-400">{isHe ? 'מנגנוני משלוח' : 'Delivery Mechanisms'}</h3>
          </div>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• {isHe ? 'רימוני יד ABC-M7A2/M7A3 ומחסניות 38mm' : 'ABC-M7A2/M7A3 grenades & 38mm cartridges'}</li>
            <li>• {isHe ? 'רחפנים (מל"טים) — נושאים מטען של 7 ק"ג' : 'Drones — 7 kg payload capacity'}</li>
            <li>• {isHe ? 'מערכות "מייצר ערפל" על משאיות' : 'Vehicle-mounted Fog Generators'}</li>
            <li>• {isHe ? 'הזרקה למזגנים ומערכות אוורור — עוקפת מסכות ומיגון רגיל' : 'Injection into HVAC systems — bypasses masks and standard protection'}</li>
          </ul>
        </motion.div>

        {/* Aerosol */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }}
          className="p-5 rounded-xl border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="text-purple-400" size={20} />
            <h3 className="font-bold text-purple-400">{isHe ? 'הפצה באוויר (ריסוס)' : 'Aerosolization'}</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {isHe
              ? 'חלקיקים זעירים (1-5 מיקרון) שחודרים לריאות. החומר מרוסס באמצעות גז דחף (פרופאן או HFC134a) מעורבב באתנול. מנהרות רוח בקמפוס IHU שימשו לפיתוח טכנולוגיה זו.'
              : 'Particles 1-5 μm — lower respiratory penetration. Propellants: propane, HFC134a. Solvent: ethanol. Campus wind tunnels used for development.'}
          </p>
        </motion.div>

        {/* Precedent */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }}
          className="p-5 rounded-xl border border-gray-500/30 bg-gray-500/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-gray-400" size={20} />
            <h3 className="font-bold text-gray-300">{isHe ? 'תקדים — מוסקבה 2002' : 'Precedent — Moscow 2002'}</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {isHe
              ? 'נגזרת פנטניל באירוסול הרגה 15% (130 מ-850) מבני הערובה למרות פעולות חילוץ. זה האנלוג ההיסטורי העיקרי להבנת הסיכון.'
              : 'Aerosolized fentanyl derivative killed 15% (130 of 850) hostages despite rescue operations. Primary historical analog for risk assessment.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
