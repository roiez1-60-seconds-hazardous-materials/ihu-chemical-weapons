'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, AlertTriangle, Droplets, Wind as WindIcon, Syringe } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

interface Chemical {
  id: string;
  color: string;
  lethality: number; // 0-100 scale
  icon: typeof Skull;
  he: { name: string; dose: string; onset: string; mechanism: string; routes: string; antidote: string };
  en: { name: string; dose: string; onset: string; mechanism: string; routes: string; antidote: string };
}

const chemicals: Chemical[] = [
  {
    id: 'fentanyl', color: '#ef4444', lethality: 70, icon: Skull,
    he: {
      name: 'פנטניל',
      dose: '2 מיליגרם — מנה קטלנית למבוגר',
      onset: 'שניות עד דקות בשאיפה, דקות בעור',
      mechanism: 'נקשר לקולטני אופיואיד מיו (μ) במוח. גורם לדיכוי נשימתי מוחלט, איבוד הכרה, ומוות בהיעדר טיפול.',
      routes: 'שאיפה (אירוסול), עורי (ספיגה), בליעה, הזרקה',
      antidote: 'נלוקסון (Narcan) — יש לתת תוך דקות. ייתכן צורך במנות חוזרות.',
    },
    en: {
      name: 'Fentanyl',
      dose: '2 milligrams — lethal dose for adult',
      onset: 'Seconds to minutes (inhalation), minutes (dermal)',
      mechanism: 'Binds to μ-opioid receptors in the brain. Causes complete respiratory depression, loss of consciousness, and death without treatment.',
      routes: 'Inhalation (aerosol), dermal (absorption), ingestion, injection',
      antidote: 'Naloxone (Narcan) — must be administered within minutes. Repeat doses may be needed.',
    },
  },
  {
    id: 'carfentanil', color: '#dc2626', lethality: 98, icon: Skull,
    he: {
      name: 'קרפנטניל',
      dose: '0.02 מיליגרם (20 מיקרוגרם) — מנה קטלנית',
      onset: 'שניות בשאיפה',
      mechanism: 'חזק פי 100 מפנטניל. אותו מנגנון — דיכוי נשימתי — אבל במינון זעיר בהרבה. שימש ככל הנראה באירוע תיאטרון מוסקבה (2002). נמצא במחקרי IHU.',
      routes: 'שאיפה, עורי (ספיגה מיידית), בליעה',
      antidote: 'נלוקסון — נדרשות מנות גבוהות מאוד וחוזרות. סיכון גבוה למוות גם עם טיפול.',
    },
    en: {
      name: 'Carfentanil',
      dose: '0.02 mg (20 micrograms) — lethal dose',
      onset: 'Seconds (inhalation)',
      mechanism: '100x more potent than fentanyl. Same mechanism — respiratory depression — but at trace doses. Likely used in Moscow theater incident (2002). Found in IHU research.',
      routes: 'Inhalation, dermal (immediate absorption), ingestion',
      antidote: 'Naloxone — very high and repeated doses required. High mortality risk even with treatment.',
    },
  },
  {
    id: 'medetomidine', color: '#f59e0b', lethality: 45, icon: Syringe,
    he: {
      name: 'מדטומידין',
      dose: '18 גרם מילוי ברימון (40% ריכוז) — גורם לאיבוד הכרה',
      onset: 'דקות ספורות בשאיפה',
      mechanism: 'אגוניסט אלפא-2 אדרנרגי. גורם לסדציה עמוקה, ירידה בלחץ דם, האטת קצב לב, ואיבוד הכרה. בשימוש וטרינרי להרדמת בעלי חיים גדולים.',
      routes: 'שאיפה (אירוסול מרימון או מייצר ערפל), הזרקה',
      antidote: 'אטיפמזול (Atipamezole) — נוגד ספציפי. לא זמין בדרך כלל בצוותי חירום.',
    },
    en: {
      name: 'Medetomidine',
      dose: '18g grenade fill (40% concentration) — causes unconsciousness',
      onset: 'Minutes (inhalation)',
      mechanism: 'Alpha-2 adrenergic agonist. Causes deep sedation, blood pressure drop, bradycardia, and loss of consciousness. Veterinary use for large animal sedation.',
      routes: 'Inhalation (aerosol from grenade or fog generator), injection',
      antidote: 'Atipamezole — specific antagonist. Not typically available to emergency responders.',
    },
  },
  {
    id: 'analogs', color: '#8b5cf6', lethality: 85, icon: AlertTriangle,
    he: {
      name: 'אנלוגים של פנטניל (70+)',
      dose: 'משתנה — חלקם חזקים פי 10,000 ממורפין',
      onset: 'שניות עד דקות',
      mechanism: 'נגזרות כימיות של פנטניל עם שינויים מולקולריים. IHU סינתז למעלה מ-70 אנלוגים שונים. חלקם לא מוכרים לרפואה המערבית ולא ניתנים לזיהוי בבדיקות סטנדרטיות.',
      routes: 'שאיפה, עורי, בליעה',
      antidote: 'נלוקסון — עשוי לעבוד חלקית. יעילות לא ידועה נגד אנלוגים לא מוכרים.',
    },
    en: {
      name: 'Fentanyl Analogues (70+)',
      dose: 'Variable — some 10,000x more potent than morphine',
      onset: 'Seconds to minutes',
      mechanism: 'Chemical derivatives of fentanyl with molecular modifications. IHU synthesized over 70 different analogues. Some are unknown to Western medicine and undetectable by standard tests.',
      routes: 'Inhalation, dermal, ingestion',
      antidote: 'Naloxone — may work partially. Efficacy unknown against novel analogues.',
    },
  },
];

function DangerMeter({ level, color }: { level: number; color: string }) {
  return (
    <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-white/70">
        {level}/100
      </div>
    </div>
  );
}

export default function ChemDanger() {
  const { lang } = useLang();
  const isHe = lang === 'he';
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="chemistry" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
          {isHe ? 'מדרג הסכנה' : 'Danger Scale'}
        </h2>
        <p className="text-gray-400 text-sm">
          {isHe ? 'ארבעת החומרים המרכזיים בתוכנית — לחצו לפרטים' : 'The four key agents in the program — click for details'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {chemicals.map((chem, i) => {
          const Icon = chem.icon;
          const d = isHe ? chem.he : chem.en;
          const isOpen = expanded === chem.id;

          return (
            <motion.div
              key={chem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setExpanded(isOpen ? null : chem.id)}
              className="rounded-2xl border border-gray-700/30 bg-gray-900/30 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-gray-600/40 transition-colors"
            >
              {/* Header */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${chem.color}15`, border: `1px solid ${chem.color}40` }}>
                    <Icon size={20} style={{ color: chem.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">{d.name}</h3>
                    <p className="text-[10px] text-gray-500">{d.dose}</p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-gray-500 text-xs"
                  >
                    ▼
                  </motion.span>
                </div>

                {/* Danger meter */}
                <div className="mb-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-[9px] font-mono text-gray-500">{isHe ? 'רמת קטלניות' : 'Lethality'}</span>
                  </div>
                  <DangerMeter level={chem.lethality} color={chem.color} />
                </div>
              </div>

              {/* Expandable detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2.5 border-t border-gray-700/20 pt-3">
                      {[
                        { label: isHe ? 'מנגנון פעולה' : 'Mechanism', value: d.mechanism },
                        { label: isHe ? 'זמן השפעה' : 'Onset', value: d.onset },
                        { label: isHe ? 'דרכי חשיפה' : 'Exposure Routes', value: d.routes },
                        { label: isHe ? 'נוגדן / טיפול' : 'Antidote', value: d.antidote },
                      ].map((field, j) => (
                        <div key={j}>
                          <span className="text-[9px] font-mono font-bold uppercase" style={{ color: chem.color }}>{field.label}</span>
                          <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">{field.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
