'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const slides = [
  { src: '/images/slide-01.jpg', he: 'שער — אנטומיה של איום', en: 'Cover — Anatomy of a Threat' },
  { src: '/images/slide-02.jpg', he: 'קמפוס אקדמי או בסיס צבאי?', en: 'Academic Campus or Military Base?' },
  { src: '/images/slide-03.jpg', he: 'שינוי פרדיגמה — נשק באזור האפור', en: 'Paradigm Shift — Gray Zone Weapons' },
  { src: '/images/slide-04.jpg', he: 'וקטור ההסלמה', en: 'Escalation Vector' },
  { src: '/images/slide-05.jpg', he: 'הכימיה של נטרול — פרויקט הרתעה', en: 'Chemistry of Neutralization — Project Deterrence' },
  { src: '/images/slide-06.jpg', he: 'ממעבדה לענן רעיל — פיצוח אתגר הפיזור', en: 'From Lab to Toxic Cloud — Dispersal Challenge' },
  { src: '/images/slide-07.jpg', he: 'השרשרת התעשייתית', en: 'The Industrial Chain' },
  { src: '/images/slide-08.jpg', he: 'חומרה מבצעית — פלטפורמות מסירה', en: 'Operational Hardware — Delivery Platforms' },
  { src: '/images/slide-09.jpg', he: 'סיכול ממוקד — תקיפות צה"ל', en: 'Targeted Strikes — IDF Operations' },
  { src: '/images/slide-10.jpg', he: 'סיכום תובנות — מלחמת המעבדות', en: 'Key Insights — Laboratory War' },
];

export default function Gallery() {
  const { t, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [full, setFull] = useState(false);

  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx(i => (i + 1) % slides.length);

  return (
    <section id="gallery" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('gallery.title')}</h2>
      </motion.div>

      {/* Main viewer */}
      <div className="relative rounded-2xl border border-gray-700/40 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={slides[idx].src}
            alt={lang === 'he' ? slides[idx].he : slides[idx].en}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full object-contain cursor-pointer"
            onClick={() => setFull(true)}
          />
        </AnimatePresence>

        {/* Controls */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition">
          <ChevronRight size={20} />
        </button>
        <button onClick={() => setFull(true)} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition">
          <Maximize2 size={14} />
        </button>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-200 font-semibold">{lang === 'he' ? slides[idx].he : slides[idx].en}</span>
            <span className="text-xs text-gray-500 font-mono">{idx + 1}/{slides.length}</span>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {slides.map((s, i) => (
          <motion.button
            key={i} onClick={() => setIdx(i)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition ${i === idx ? 'border-blue-500' : 'border-gray-700/30 opacity-50 hover:opacity-80'}`}
          >
            <img src={s.src} alt="" className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      {/* Infographic */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
        <h3 className="text-xl font-bold text-gray-300 mb-4 text-center">
          {lang === 'he' ? 'אינפוגרפיקה: חימוש הפנטניל' : 'Infographic: Fentanyl Weaponization'}
        </h3>
        <div className="rounded-2xl border border-gray-700/40 overflow-hidden cursor-pointer" onClick={() => { setIdx(0); setFull(true); }}>
          <img src="/images/infographic.png" alt="Infographic" className="w-full" />
        </div>
      </motion.div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {full && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setFull(false)}
          >
            <button className="absolute top-4 right-4 text-white" onClick={() => setFull(false)}><X size={28} /></button>
            <motion.img
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={slides[idx].src} alt="" className="max-w-full max-h-full object-contain"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
