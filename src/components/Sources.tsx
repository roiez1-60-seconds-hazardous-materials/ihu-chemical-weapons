'use client';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Building2, Scale, Newspaper, GraduationCap } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const sources = [
  { icon: FileText, cat: 'research', title: 'The Islamic Republic\'s Work on Pharmaceutical Based Agents', author: 'Giveh, M. & ISIS Team', date: 'Nov 2024', url: 'https://isis-online.org/isis-reports/the-islamic-republics-work-on-pharmaceutical-based-agents' },
  { icon: GraduationCap, cat: 'research', title: 'Iranian Research on Incapacitating and Lethal Agents, Part I', author: 'Gorwitz, M.', date: 'Jun 2025', url: 'https://www.researchgate.net/publication/392596753' },
  { icon: FileText, cat: 'research', title: 'Tehran\'s Tactical Knockout: Weaponized Pharmaceutical-Based Agents', author: 'Levitt, M. — CTC Sentinel', date: 'Oct 2024', url: 'https://ctc.westpoint.edu/tehrans-tactical-knockout-weaponized-pharmaceutical-based-agents/' },
  { icon: FileText, cat: 'research', title: 'Countering Iran\'s Covert Chemical Weapons Program', author: 'Stricker, A. — FDD', date: 'Feb 2026', url: 'https://www.fdd.org/analysis/2026/02/24/countering-irans-covert-chemical-weapons-program/' },
  { icon: Scale, cat: 'gov', title: 'CWC Compliance Report — Iran Section', author: 'U.S. State Department', date: '2023-2025', url: 'https://www.state.gov/condition-10c-annual-report-on-compliance-with-the-chemical-weapons-convention-cwc' },
  { icon: Building2, cat: 'gov', title: 'Treasury Designates Entity Subordinate to Iran\'s Military Firm (Shahid Meisami)', author: 'U.S. Department of the Treasury', date: 'Dec 2020', url: 'https://home.treasury.gov/news/press-releases/sm1200' },
  { icon: Scale, cat: 'gov', title: 'Sanctions Targeting Iran\'s Chemical Weapons R&D (Hakiman Shargh)', author: 'U.S. State Department', date: 'Jul 2024', url: 'https://2021-2025.state.gov/united-states-imposes-sanctions-targeting-irans-chemical-weapons-research-and-development/' },
  { icon: GraduationCap, cat: 'academic', title: 'Toxin and Bioregulator Weapons: Preventing the Misuse of the Chemical and Life Sciences', author: 'Crowley, M. & Dando, M.', date: '2022', url: 'https://link.springer.com/book/10.1007/978-3-030-69900-5' },
  { icon: GraduationCap, cat: 'academic', title: 'Down the Slippery Slope? Dual-Use Research Applicable to ICAs', author: 'Crowley & Dando — OPCW Paper #8', date: '2014', url: 'https://www.opcw.org/sites/default/files/documents/PDF/Down_the_Slippery_Slope_Final_LQ.pdf' },
  { icon: Newspaper, cat: 'intel', title: 'Imam Hussein University (IHU) — Entity Profile', author: 'Iran Watch', date: 'Updated', url: 'https://www.iranwatch.org/iranian-entities/imam-hussein-university-ihu' },
  { icon: Newspaper, cat: 'intel', title: 'SPND is still hooked on fentanyl', author: 'Iranredline.org', date: 'Sep 2024', url: 'https://www.iranredline.org/2024/09/spnd-is-still-hooked-on-fentanyl.html' },
  { icon: GraduationCap, cat: 'academic', title: 'Rapid screening of CWA using DMMP as simulant in beverages (HF-SPME/CD-IMS)', author: 'IHU Researchers — J. Chromatography A', date: '2021', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0021967321008268' },
  { icon: GraduationCap, cat: 'academic', title: 'H. Fakhraian — Publication Record', author: 'ResearchGate / Google Scholar', date: '2005-2023', url: 'https://www.researchgate.net/profile/H-Fakhraian-2' },
  { icon: FileText, cat: 'intel', title: 'The IRGC Pharmaceutical Weapon Program (Presentation)', author: 'Intelligence Briefing', date: 'Mar 2026', url: '' },
];

const catColors: Record<string, { bg: string; text: string; label_he: string; label_en: string }> = {
  research: { bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-400', label_he: 'מחקר', label_en: 'Research' },
  gov: { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', label_he: 'ממשלתי', label_en: 'Government' },
  academic: { bg: 'bg-purple-500/10 border-purple-500/30', text: 'text-purple-400', label_he: 'אקדמי', label_en: 'Academic' },
  intel: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', label_he: 'מודיעיני', label_en: 'Intelligence' },
};

export default function Sources() {
  const { lang } = useLang();
  return (
    <section id="sources" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{lang === 'he' ? 'מקורות מידע' : 'Sources & References'}</h2>
        <p className="text-gray-500 text-sm">{lang === 'he' ? `${sources.length} מקורות מאומתים` : `${sources.length} verified sources`}</p>
      </motion.div>
      <div className="space-y-3">
        {sources.map((s, i) => {
          const Icon = s.icon;
          const cc = catColors[s.cat];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: lang === 'he' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.01, x: lang === 'he' ? -4 : 4 }}
              className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/20 backdrop-blur-sm flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-lg border ${cc.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon size={15} className={cc.text} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${cc.bg} ${cc.text} font-semibold`}>
                    {lang === 'he' ? cc.label_he : cc.label_en}
                  </span>
                  <span className="text-[10px] text-gray-600 font-mono">{s.date}</span>
                </div>
                <div className="text-sm font-semibold text-gray-200 mb-0.5 leading-snug">{s.title}</div>
                <div className="text-[11px] text-gray-500">{s.author}</div>
              </div>
              {s.url && (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mt-1">
                  <motion.div whileHover={{ scale: 1.2 }} className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <ExternalLink size={13} className="text-blue-400" />
                  </motion.div>
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
