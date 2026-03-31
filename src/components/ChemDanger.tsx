'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, AlertTriangle, Syringe } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

interface Chemical {
  id: string;
  color: string;
  icon: typeof Skull;
  potencyVsFentanyl: string;
  he: { name: string; ld50: string; onset: string; mechanism: string; routes: string; antidote: string; source: string };
  en: { name: string; ld50: string; onset: string; mechanism: string; routes: string; antidote: string; source: string };
}

const chemicals: Chemical[] = [
  {
    id: 'fentanyl', color: '#ef4444', icon: Skull, potencyVsFentanyl: '×1',
    he: {
      name: 'פנטניל',
      ld50: 'LD50 מוערך: ~0.03 mg/kg (אדם, IV) — כ-2 מ"ג למבוגר 70 ק"ג. בשאיפה: מוערך ~0.004 mg/kg.',
      onset: 'שניות עד דקות בשאיפה, דקות בספיגה עורית',
      mechanism: 'נקשר לקולטני אופיואיד מיו (μ) במוח וגזע המוח. גורם לדיכוי נשימתי מרכזי, איבוד הכרה, ומוות ללא טיפול.',
      routes: 'שאיפה (אירוסול), ספיגה עורית, בליעה, הזרקה',
      antidote: 'נלוקסון (Narcan) — אנטגוניסט תחרותי לקולטן μ. יש לתת תוך דקות. עשויות להידרש מנות חוזרות (זמן מחצית חיים קצר מפנטניל).',
      source: 'NIOSH, CDC, Pubchem CID 3345',
    },
    en: {
      name: 'Fentanyl',
      ld50: 'Estimated LD50: ~0.03 mg/kg (human, IV) — ~2 mg for 70 kg adult. Inhalation: estimated ~0.004 mg/kg.',
      onset: 'Seconds to minutes (inhalation), minutes (dermal)',
      mechanism: 'Binds to μ-opioid receptors in brain and brainstem. Causes central respiratory depression, loss of consciousness, and death without treatment.',
      routes: 'Inhalation (aerosol), dermal absorption, ingestion, injection',
      antidote: 'Naloxone (Narcan) — competitive μ-receptor antagonist. Must administer within minutes. Repeat doses often needed (shorter half-life than fentanyl).',
      source: 'NIOSH, CDC, PubChem CID 3345',
    },
  },
  {
    id: 'carfentanil', color: '#dc2626', icon: Skull, potencyVsFentanyl: '×100',
    he: {
      name: 'קרפנטניל',
      ld50: 'LD50 מוערך: ~0.02 mg/kg (קופים, IV). חזק פי 100 מפנטניל, פי 10,000 ממורפין. מנה של מיקרוגרמים בודדים עלולה להיות קטלנית לאדם.',
      onset: 'שניות בשאיפה',
      mechanism: 'אותו מנגנון כפנטניל — קשירה לקולטן μ — אבל עם זיקה גבוהה משמעותית. נגזרת של פנטניל שפותחה ב-1974 לשימוש וטרינרי בלבד (הרדמת פילים). ככל הנראה שימש באירוע תיאטרון מוסקבה 2002.',
      routes: 'שאיפה, ספיגה עורית מיידית, בליעה',
      antidote: 'נלוקסון — נדרשות מנות גבוהות מאוד וחוזרות. סיכון גבוה למוות גם עם טיפול בגלל העוצמה.',
      source: 'Van Bever et al. 1976, OPCW, CDC Emergency Response Card',
    },
    en: {
      name: 'Carfentanil',
      ld50: 'Estimated LD50: ~0.02 mg/kg (primates, IV). 100× fentanyl potency, 10,000× morphine. Microgram quantities potentially lethal to humans.',
      onset: 'Seconds (inhalation)',
      mechanism: 'Same μ-opioid mechanism as fentanyl but with significantly higher binding affinity. Fentanyl derivative developed 1974 for veterinary use only (elephant sedation). Likely used in Moscow theater incident 2002.',
      routes: 'Inhalation, immediate dermal absorption, ingestion',
      antidote: 'Naloxone — very high and repeated doses required. High mortality risk even with treatment due to extreme potency.',
      source: 'Van Bever et al. 1976, OPCW, CDC Emergency Response Card',
    },
  },
  {
    id: 'medetomidine', color: '#f59e0b', icon: Syringe, potencyVsFentanyl: 'N/A',
    he: {
      name: 'מדטומידין',
      ld50: 'LD50 (עכברים, IV): 6.4 mg/kg. לא קטלני בפני עצמו ברוב המקרים — גורם לסדציה עמוקה ואיבוד הכרה. המטרה: נטרול ללא מוות (אבל סיכון למוות מנפילה, חסימת נתיבי אוויר, היפותרמיה).',
      onset: 'דקות ספורות בשאיפה מאירוסול',
      mechanism: 'אגוניסט סלקטיבי של קולטני אלפא-2 אדרנרגיים. גורם לסדציה, ירידה בלחץ דם (היפוטנסיה), האטת קצב לב (ברדיקרדיה), ואיבוד הכרה. משמש ברפואה וטרינרית להרדמת בעלי חיים.',
      routes: 'שאיפה (אירוסול מרימון ABC-M7A2/A3 או מייצר ערפל), הזרקה',
      antidote: 'אטיפמזול (Atipamezole) — אנטגוניסט ספציפי לאלפא-2. לא זמין בצוותי חירום רגילים. ריכוז ברימון: 40% מדטומידין, 18 גרם מילוי.',
      source: 'U.S. State Dept Compliance Report 2023, Iran Watch, Pfizer veterinary data',
    },
    en: {
      name: 'Medetomidine',
      ld50: 'LD50 (mice, IV): 6.4 mg/kg. Not typically lethal alone — causes deep sedation and unconsciousness. Goal: incapacitation without death (but risk of death from falls, airway obstruction, hypothermia).',
      onset: 'Minutes (aerosol inhalation)',
      mechanism: 'Selective alpha-2 adrenergic agonist. Causes sedation, hypotension, bradycardia, and loss of consciousness. Used in veterinary medicine for large animal sedation.',
      routes: 'Inhalation (aerosol from ABC-M7A2/A3 grenade or fog generator), injection',
      antidote: 'Atipamezole — specific alpha-2 antagonist. Not available to standard emergency responders. Grenade fill: 40% medetomidine, 18g payload.',
      source: 'U.S. State Dept Compliance Report 2023, Iran Watch, Pfizer veterinary data',
    },
  },
  {
    id: 'analogs', color: '#8b5cf6', icon: AlertTriangle, potencyVsFentanyl: '×1–10,000',
    he: {
      name: 'אנלוגים של פנטניל (70+)',
      ld50: 'משתנה מאוד — טווח עוצמה מפנטניל (×1) עד פי 10,000 ממורפין. חלק מהאנלוגים לא תועדו בספרות המדעית ואין להם LD50 ידוע.',
      onset: 'שניות עד דקות',
      mechanism: 'נגזרות כימיות של פנטניל עם שינויים במבנה המולקולרי. IHU פרסם מחקרים על סינתזת למעלה מ-70 אנלוגים שונים. חלקם לא מוכרים לרפואה המערבית ועשויים להתחמק מבדיקות טוקסיקולוגיות סטנדרטיות.',
      routes: 'שאיפה, ספיגה עורית, בליעה',
      antidote: 'נלוקסון — יעילות חלקית בלבד. לא ניתן לדעת מראש אם יעבוד נגד אנלוג לא מוכר. ייתכן צורך במינונים גבוהים בהרבה מהרגיל.',
      source: 'Gorwitz/ISIS Report 2025, IHU published research papers',
    },
    en: {
      name: 'Fentanyl Analogues (70+)',
      ld50: 'Highly variable — potency range from fentanyl (×1) to 10,000× morphine. Some analogues lack published LD50 data in scientific literature.',
      onset: 'Seconds to minutes',
      mechanism: 'Chemical derivatives of fentanyl with molecular structure modifications. IHU published research on synthesis of 70+ different analogues. Some unknown to Western medicine, potentially evading standard toxicological screening.',
      routes: 'Inhalation, dermal absorption, ingestion',
      antidote: 'Naloxone — partial efficacy only. Cannot predict effectiveness against unknown analogues. Much higher doses than standard may be required.',
      source: 'Gorwitz/ISIS Report 2025, IHU published research papers',
    },
  },
];

export default function ChemDanger() {
  const { lang } = useLang();
  const isHe = lang === 'he';
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="chemistry" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
          {isHe ? 'החומרים בתוכנית' : 'The Agents'}
        </h2>
        <p className="text-gray-400 text-sm">
          {isHe ? 'ארבעת החומרים המרכזיים — לחצו לפרטים טוקסיקולוגיים' : 'The four key agents — click for toxicological details'}
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${chem.color}15`, border: `1px solid ${chem.color}40` }}>
                    <Icon size={20} style={{ color: chem.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">{d.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ color: chem.color, backgroundColor: `${chem.color}15`, border: `1px solid ${chem.color}30` }}>
                        {isHe ? 'עוצמה vs פנטניל' : 'Potency vs Fentanyl'}: {chem.potencyVsFentanyl}
                      </span>
                    </div>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-500 text-xs">▼</motion.span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">{d.ld50}</p>
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
                      {/* Source */}
                      <div className="pt-1 border-t border-gray-800/30">
                        <span className="text-[8px] text-gray-600 font-mono">{isHe ? 'מקורות' : 'Sources'}: {d.source}</span>
                      </div>
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
