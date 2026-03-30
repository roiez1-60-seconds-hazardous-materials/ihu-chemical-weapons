'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, FlaskConical, User, BookOpen } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

type Cat = 'all' | 'org' | 'chem' | 'person' | 'tech';
const cats: { key: Cat; icon: any; he: string; en: string }[] = [
  { key: 'all', icon: BookOpen, he: 'הכל', en: 'All' },
  { key: 'org', icon: Building2, he: 'ארגונים', en: 'Organizations' },
  { key: 'chem', icon: FlaskConical, he: 'חומרים', en: 'Chemicals' },
  { key: 'person', icon: User, he: 'אנשים', en: 'People' },
  { key: 'tech', icon: BookOpen, he: 'מונחים', en: 'Terms' },
];

const terms: { term: string; cat: Cat; he: string; en: string }[] = [
  { term: 'IHU', cat: 'org', he: 'אוניברסיטת אימאם חוסיין — המוסד האקדמי של IRGC. הוקם 1986, סומן ע"י OFAC 2012.', en: 'Imam Hossein University — IRGC\'s academic institution. Founded 1986, OFAC-designated 2012.' },
  { term: 'IRGC', cat: 'org', he: 'משמרות המהפכה האיסלאמית — הזרוע הצבאית-מודיעינית המרכזית של איראן.', en: 'Islamic Revolutionary Guard Corps — Iran\'s main military-intelligence force.' },
  { term: 'SPND', cat: 'org', he: 'ארגון המחקר והחדשנות ההגנתית — מתאם פרויקטי נשק רגישים, הוקם ע"י פח\'ריזאדה.', en: 'Organization of Defensive Innovation & Research — coordinates sensitive weapons projects.' },
  { term: 'MUT', cat: 'org', he: 'אוניברסיטת מאלק אשתר לטכנולוגיה — כפופה למשרד ההגנה (MODAFL), סומנה באו"ם.', en: 'Malek Ashtar University of Technology — MODAFL subordinate, UN-designated.' },
  { term: 'MODAFL', cat: 'org', he: 'משרד ההגנה האיראני — מפקח על תעשיות הנשק.', en: 'Iran\'s Ministry of Defense — oversees weapons industries.' },
  { term: 'SMG', cat: 'org', he: 'קבוצת שהיד מייסמי — חברת בת של SPND, ייצרה רימונים כימיים. הושמדה 2025.', en: 'Shahid Meisami Group — SPND subsidiary, produced chemical grenades. Destroyed 2025.' },
  { term: 'ISAEM', cat: 'org', he: 'האגודה המדעית האיראנית לחומרים אנרגטיים — משתפת פעולה עם IHU ו-SPND.', en: 'Iranian Scientific Association of Energetic Materials — collaborates with IHU and SPND.' },
  { term: 'OPCW', cat: 'org', he: 'הארגון לאיסור נשק כימי — אחראי על אכיפת CWC.', en: 'Organisation for the Prohibition of Chemical Weapons — enforces the CWC.' },
  { term: 'CWC', cat: 'tech', he: 'אמנת הנשק הכימי — אוסרת פיתוח, ייצור ושימוש בנשק כימי.', en: 'Chemical Weapons Convention — prohibits development, production and use of chemical weapons.' },
  { term: 'PBA', cat: 'tech', he: 'חומרים מבוססי תרופות — חומרים פרמצבטיים שהוסבו לשימוש נשקי.', en: 'Pharmaceutical-Based Agents — pharmaceutical agents weaponized for military use.' },
  { term: 'CNS', cat: 'tech', he: 'מערכת העצבים המרכזית — המטרה העיקרית של PBAs.', en: 'Central Nervous System — primary target of PBAs.' },
  { term: 'AChE', cat: 'tech', he: 'אצטילכולינאסטראז — אנזים שנחסם ע"י חומרי עצב מסורתיים (סארין, VX).', en: 'Acetylcholinesterase — enzyme inhibited by traditional nerve agents (sarin, VX).' },
  { term: 'RCA', cat: 'tech', he: 'חומרי פיזור מהומות — כגון CS, גז מדמיע. רימוני "אשכן".', en: 'Riot Control Agents — e.g. CS tear gas. "Ashkan" grenades.' },
  { term: 'SAR', cat: 'tech', he: 'יחסי מבנה-פעילות — מסגרת המקשרת שינויים מולקולריים להשפעות ביולוגיות.', en: 'Structure-Activity Relationship — framework linking molecular changes to biological effects.' },
  { term: 'פנטניל / Fentanyl', cat: 'chem', he: 'אופיואיד סינתטי חזק — קטלני מעל 2 מ"ג. משמש כסוכן משתק/קטלני.', en: 'Potent synthetic opioid — lethal above 2 mg. Used as incapacitating/lethal agent.' },
  { term: 'מדטומידין / Medetomidine', cat: 'chem', he: 'אגוניסט אלפא-2 אדרנרגי — מרגיע וטרינרי שהוסב לנשק. מנטרל נלוקסון בשילוב עם פנטניל.', en: 'Alpha-2 adrenergic agonist — veterinary sedative weaponized. Neutralizes naloxone when combined with fentanyl.' },
  { term: 'נלוקסון / Naloxone', cat: 'chem', he: 'תרופה נגד מנת יתר של אופיואידים — עלולה להיות לא יעילה נגד שילוב פנטניל+מדטומידין.', en: 'Opioid overdose antidote — may be ineffective against fentanyl+medetomidine combination.' },
  { term: 'קטמין / Ketamine', cat: 'chem', he: 'חומר הרדמה המנתק תחושות — יוצר ב-IHU כולל הצורה הפעילה (S) של החומר.', en: 'Dissociative anesthetic — synthesized at IHU including active (S)-enantiomer.' },
  { term: 'סבופלורן / Sevoflurane', cat: 'chem', he: 'חומר הרדמה בשאיפה — יוצר לראשונה באיראן ב-IHU (2015).', en: 'Inhalation anesthetic — first Iranian synthesis at IHU (2015).' },
  { term: 'נוביצ\'וק / Novichok', cat: 'chem', he: 'סדרת חומרי עצב מתקדמים — מחקר וייצור בקנה מידה קטן באיראן.', en: 'Advanced nerve agent series — small-scale research and production in Iran.' },
  { term: 'חוסיין פח\'ראיאן / Fakhraian', cat: 'person', he: 'פרופסור חבר בכימיה ב-IHU, עורך ראשי של כתבי עת ביטחוניים. מוביל המחקר על חומרים מבוססי תרופות וחומרי גלם לייצור חומרי עצב.', en: 'Associate Prof. of Chemistry at IHU, editor-in-chief of defense journals. Lead PBA and nerve agent precursor researcher.' },
  { term: 'מהראן באברי / Babri', cat: 'person', he: 'מנהל קבוצת שהיד מייסמי. סומן ע"י ארה"ב 2020. שמר קשר עם OPCW.', en: 'Director of Shahid Meisami Group. US-designated 2020. Maintained OPCW ties.' },
  { term: 'מוחסן פח\'ריזאדה / Fakhrizadeh', cat: 'person', he: 'מייסד SPND, אבי תוכנית הנשק הגרעיני. הרצה ב-IHU. חוסל 2020.', en: 'SPND founder, father of nuclear weapons program. Lectured at IHU. Assassinated 2020.' },
  { term: 'פרויקט הרתעה / Deterrence', cat: 'tech', he: 'פרויקט IHU לפיתוח רימונים מבוססי מדטומידין — נחשף ב-2023 ע"י האקרים.', en: 'IHU project for medetomidine-based grenades — exposed by hackers in 2023.' },
  { term: 'ארבעין / Arbaeen', cat: 'tech', he: 'מל"ט קרב מרובה רוטורים של IRGC — נושא 7 ק"ג, טווח 10 ק"מ.', en: 'IRGC multirotor combat drone — 7 kg payload, 10 km range.' },
];

export default function Glossary() {
  const { t, lang } = useLang();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<Cat>('all');

  const filtered = terms.filter(tm => {
    const matchCat = cat === 'all' || tm.cat === cat;
    const matchSearch = search === '' || tm.term.toLowerCase().includes(search.toLowerCase()) || (lang === 'he' ? tm.he : tm.en).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="glossary" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('glossary.title')}</h2>
      </motion.div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute top-3 left-3 text-gray-500" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'he' ? 'חיפוש...' : 'Search...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/40 text-sm text-gray-200 placeholder-gray-600 focus:border-blue-500/50 focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          {cats.map(c => {
            const Icon = c.icon;
            return (
              <motion.button
                key={c.key} onClick={() => setCat(c.key)} whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${cat === c.key ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-gray-800/30 text-gray-500 border border-gray-700/20 hover:text-gray-300'}`}
              >
                <Icon size={13} />
                {lang === 'he' ? c.he : c.en}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Terms list */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((tm, i) => (
            <motion.div
              key={tm.term} layout
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ scale: 1.01, x: lang === 'he' ? -4 : 4 }}
              className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-blue-400">{tm.term}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${tm.cat === 'org' ? 'bg-purple-500/10 text-purple-400' : tm.cat === 'chem' ? 'bg-red-500/10 text-red-400' : tm.cat === 'person' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  {cats.find(c => c.key === tm.cat)?.[lang === 'he' ? 'he' : 'en']}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{lang === 'he' ? tm.he : tm.en}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
