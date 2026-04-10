'use client';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { lang } = useLang();
  const he = lang === 'he';
  return (
    <footer className="py-10 text-center border-t border-amber-500/20" style={{ background: '#0a0a18' }}>
      {/* Logo + brand */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <img src="/images/logo-60sec.png" alt="" className="w-8 h-8 rounded-md" />
        <span className="text-sm font-bold" style={{ color: '#c8a44e' }}>
          {he ? 'ניתוח 60 שניות של חומ״ס' : '60 Seconds HazMat'}
        </span>
      </div>

      {/* Author */}
      <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
        <b style={{ color: '#ffffff' }}>{he ? 'רועי צוקרמן' : 'Roei Zukerman'}</b>
        {' — '}{he ? 'מומחה לחומ״ס וטב״ק' : 'HazMat & CBRN Expert'}
      </p>

      {/* Links */}
      <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
        <a href="mailto:roiez1@gmail.com" className="text-xs no-underline" style={{ color: '#c8a44e' }}>
          ✉️ roiez1@gmail.com
        </a>
        <a 
          href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" 
          target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold no-underline px-3 py-1 rounded-md"
          style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
        >
          💬 WhatsApp
        </a>
      </div>

      {/* Gold line */}
      <div className="mx-auto mb-3" style={{ height: 1, maxWidth: 300, background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.4), transparent)' }} />

      {/* Sources line */}
      <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {he ? 'מקורות פתוחים בלבד | לא מסווג' : 'Open sources only | Unclassified'} | {he ? 'אפריל 2026' : 'April 2026'}
      </p>

      {/* Copyright box */}
      <div className="mx-auto rounded-lg p-3" style={{ maxWidth: 350, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs font-bold mb-1" style={{ color: '#c8a44e', fontSize: 10 }}>
          © 2026 {he ? 'רועי צוקרמן — מומחה לחומ״ס וטב״ק' : 'Roei Zukerman — HazMat & CBRN Expert'}
        </p>
        <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
          {he 
            ? 'כל הזכויות שמורות. מבוסס על מקורות פתוחים בלבד. למטרות מקצועיות והדרכתיות. אין להשתמש ללא אישור בכתב.'
            : 'All rights reserved. Open sources only. Professional & educational use. Written permission required.'}
        </p>
      </div>
    </footer>
  );
}
