'use client';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="py-8 text-center border-t border-gray-800/50 space-y-2">
      <p className="text-sm text-gray-400 font-semibold">
        {lang === 'he' ? 'פותח על ידי רועי צוקרמן — מומחה לחומ"ס וטב"ק' : 'Developed by Roie Zukerman — HazMat & CBRN Expert'}
      </p>
      <a href="mailto:roiez1@gmail.com" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">roiez1@gmail.com</a>
      <p className="text-xs text-gray-600">60 שניות של חומ״ס | Intelligence Research Report | March 2026</p>
    </footer>
  );
}
