'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { t, lang } = useLang();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Crosshair background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-96 h-96 border-2 border-red-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          className="absolute w-64 h-64 border border-red-500 rounded-full"
        />
        <div className="absolute w-px h-96 bg-red-500/30" />
        <div className="absolute w-96 h-px bg-red-500/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* CLASSIFIED stamp */}
        <motion.div
          initial={{ scale: 4, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: -12, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 200 }}
          className="inline-block mb-8"
        >
          <div className="border-4 border-red-600 px-6 py-2 inline-block" style={{ transform: 'rotate(-12deg)' }}>
            <motion.span
              className="text-red-600 font-mono font-black text-lg tracking-widest"
              animate={{ textShadow: ['0 0 5px rgba(239,68,68,0.5)', '0 0 20px rgba(239,68,68,0.8)', '0 0 5px rgba(239,68,68,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t('hero.classified')}
            </motion.span>
          </div>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-4"
        >
          <span className="font-mono text-sm text-blue-400/70 tracking-[0.3em]">{t('hero.date')}</span>
        </motion.div>

        {/* Main title with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-4 leading-tight"
        >
          <motion.span
            className="text-white"
            animate={{
              textShadow: [
                '0 0 0 transparent',
                '2px 0 #ef4444, -2px 0 #3b82f6',
                '0 0 0 transparent',
              ]
            }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 5 }}
          >
            {t('hero.title')}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-amber-400 mb-6"
        >
          {t('hero.subtitle')}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.desc')}
        </motion.p>

        {/* Stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <CounterStat value={20} label={lang === 'he' ? 'שנות מחקר' : 'Years of Research'} suffix="+" />
          <CounterStat value={2} label={lang === 'he' ? 'מ"ג — סף קטלני' : 'mg — Lethal Dose'} />
          <CounterStat value={10000} label={lang === 'he' ? 'מנות שנרכשו' : 'Doses Procured'} suffix="+" />
          <CounterStat value={70} label={lang === 'he' ? 'אנלוגים של פנטניל' : 'Fentanyl Analogues'} />
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={() => document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-400 font-semibold hover:bg-blue-600/30 transition-all"
        >
          {t('hero.cta')}
          <motion.div
            className="inline-block ml-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={18} className="inline" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

function CounterStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, borderColor: 'rgba(59,130,246,0.5)' }}
      className="px-5 py-3 rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm min-w-[120px]"
    >
      <motion.div
        className="text-2xl font-black text-white font-mono"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <CountUp target={value} />{suffix}
      </motion.div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </motion.div>
  );
}

function CountUp({ target }: { target: number }) {
  return (
    <span>{target.toLocaleString()}</span>
  );
}
