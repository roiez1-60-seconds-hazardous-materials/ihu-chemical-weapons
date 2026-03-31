'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Lang = 'he' | 'en';

interface LangCtx {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
  toggle: () => void;
}

const dict: Record<string, Record<Lang, string>> = {
  'nav.title': { he: 'דו"ח מודיעיני | מעבדות הנשק הכימי', en: 'Intelligence Report | IRGC Chemical Weapons Labs' },
  'nav.home': { he: 'בית', en: 'Home' },
  'nav.timeline': { he: 'ציר זמן', en: 'Timeline' },
  'nav.paradigm': { he: 'פרדיגמה', en: 'Paradigm' },
  'nav.chemistry': { he: 'כימיה', en: 'Chemistry' },
  'nav.chain': { he: 'שרשרת', en: 'Chain' },
  'nav.network': { he: 'רשת קשרים', en: 'Network' },
  'nav.platforms': { he: 'פלטפורמות', en: 'Platforms' },
  'nav.response': { he: 'תגובה', en: 'Response' },
  'nav.hazmat': { he: 'טב"ק כימי', en: 'Chem CBRN' },
  'nav.glossary': { he: 'מילון', en: 'Glossary' },
  'nav.gallery': { he: 'גלריה', en: 'Gallery' },
  'nav.lang': { he: 'EN', en: 'עב' },
  'hero.classified': { he: '[ לא מסווג ]', en: '[ UNCLASSIFIED ]' },
  'hero.title': { he: 'אנטומיה של איום', en: 'Anatomy of a Threat' },
  'hero.subtitle': { he: 'מעבדות הנשק הכימי של משמרות המהפכה', en: "The IRGC's Chemical Weapons Laboratories" },
  'hero.desc': { he: 'חשיפת תוכנית הלוחמה הכימית (PBAs) באוניברסיטת אל-אימאם חוסיין בטהראן', en: "Exposing Iran's Pharmaceutical-Based Chemical Warfare Program at Imam Hossein University, Tehran" },
  'hero.date': { he: 'מרץ 2026', en: 'March 2026' },
  'hero.cta': { he: 'לדו"ח המלא ↓', en: 'Full Report ↓' },
  'summary.title': { he: 'תקציר מנהלים', en: 'Executive Summary' },
  'summary.p1': { he: 'איראן פיתחה וחימשה חומרים מבוססי תרופות באמצעות תוכנית מחקר בת שני עשורים שמרכזה באוניברסיטת אימאם חוסיין (IHU) של משמרות המהפכה.', en: 'Iran has developed and weaponized pharmaceutical-based agents (PBAs) through a two-decade research program centered at Imam Hossein University (IHU), the IRGC\'s sole academic institution.' },
  'summary.p2': { he: 'תוכנית החומרים מבוססי התרופות מסמלת מעבר מנשק השמדה המונית לנשק הגורם לאיבוד הכרה ומוות — כלים המיועדים לשימוש יומיומי במלחמות פרוקסי באזור האפור.', en: "Iran's PBA program represents a paradigm shift from WMDs to tactical incapacitation weapons — tools designed for everyday use in proxy wars in the gray zone." },
  'summary.p3': { he: 'המחקר שולב ישירות בשרשרת הייצור הצבאית של SPND וסופק לארגוני פרוקסי כולל חיזבאללה.', en: 'Research was integrated directly into SPND\'s military production chain and supplied to proxy organizations including Hezbollah.' },
  'campus.title': { he: 'קמפוס אקדמי או בסיס צבאי?', en: 'Academic Campus or Military Base?' },
  'campus.subtitle': { he: 'מרכז המחקר והפיתוח של משמרות המהפכה ללוחמה אסימטרית', en: "The IRGC's central R&D complex for asymmetric warfare" },
  'campus.facade': { he: 'חזות אזרחית', en: 'Civilian Facade' },
  'campus.reality': { he: 'שליטת משמרות המהפכה', en: 'IRGC Control' },
  'paradigm.title': { he: 'שינוי פרדיגמה: נשק כימי באזור האפור', en: 'Paradigm Shift: Chemical Weapons in the Gray Zone' },
  'paradigm.subtitle': { he: 'כלי נשק שנועדו לנטרל, לחטוף, ולפעול מתחת לסף התגובה הבינלאומית', en: 'Weapons designed to neutralize, abduct, and operate below the threshold of international response' },
  'timeline.title': { he: 'וקטור ההסלמה', en: 'Escalation Vector' },
  'timeline.subtitle': { he: 'מתיאוריה לנשק מבצעי', en: 'From Theory to Operational Weapon' },
  'chain.title': { he: 'השרשרת התעשייתית', en: 'The Industrial Chain' },
  'chain.subtitle': { he: 'מהמעבדה לשדה הקרב', en: 'From the Lab to the Battlefield' },
  'platforms.title': { he: 'חומרה מבצעית', en: 'Operational Hardware' },
  'platforms.subtitle': { he: 'פלטפורמות מסירה טקטיות', en: 'Tactical Delivery Platforms' },
  'strikes.title': { he: 'סיכול ממוקד', en: 'Targeted Strikes' },
  'strikes.subtitle': { he: 'תקיפות צה"ל במרץ 2026', en: 'IDF Strikes, March 2026' },
  'hazmat.title': { he: 'השלכות מבצעיות באירוע טב"ק כימי', en: 'Operational Implications for Chemical CBRN Event' },
  'glossary.title': { he: 'מילון מונחים', en: 'Glossary' },
  'gallery.title': { he: 'גלריה', en: 'Gallery' },
  'insights.title': { he: 'סיכום תובנות: מלחמת המעבדות', en: 'Key Insights: The Laboratory War' },
};

const LangContext = createContext<LangCtx>({
  lang: 'he', dir: 'rtl', t: (k) => k, toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he');

  const toggle = useCallback(() => {
    setLang(prev => {
      const next = prev === 'he' ? 'en' : 'he';
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
      return next;
    });
  }, []);

  const t = useCallback((key: string) => dict[key]?.[lang] ?? key, [lang]);
  const dir = lang === 'he' ? 'rtl' as const : 'ltr' as const;

  return (
    <LangContext.Provider value={{ lang, dir, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
