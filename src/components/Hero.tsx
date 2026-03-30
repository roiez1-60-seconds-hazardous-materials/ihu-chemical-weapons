'use client';
import { motion } from 'framer-motion';
import { ChevronDown, AlertTriangle, Shield } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function Hero() {
  const { t, lang } = useLang();

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }}
          animate={{ top: ['-5%', '105%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 w-16 h-16 border-l-2 border-t-2 border-blue-500/20" />
      <div className="absolute top-20 right-4 w-16 h-16 border-r-2 border-t-2 border-blue-500/20" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-blue-500/20" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-blue-500/20" />

      {/* CLASSIFIED stamp */}
      <motion.div
        initial={{ scale: 4, opacity: 0, rotate: -15 }}
        animate={{ scale: 1, opacity: 1, rotate: -12 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
        className="absolute top-28 sm:top-32 right-4 sm:right-12 z-10"
      >
        <div className="border-4 border-red-600 px-4 py-2 rounded-sm">
          <span className="text-red-600 font-mono font-black text-lg sm:text-2xl tracking-widest">
            {lang === 'he' ? 'מסווג' : 'CLASSIFIED'}
          </span>
        </div>
      </motion.div>

      {/* Warning icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-4"
      >
        <motion.div
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(245,158,11,0.2)',
              '0 0 40px rgba(245,158,11,0.4)',
              '0 0 20px rgba(245,158,11,0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center"
        >
          <AlertTriangle className="w-8 h-8 text-amber-500" />
        </motion.div>
      </motion.div>

      {/* Classified badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
        className="font-mono text-xs sm:text-sm text-blue-400/70 tracking-[0.3em] mb-6 flex items-center gap-2"
      >
        <Shield size={14} />
        {t('hero.classified')}
        <Shield size={14} />
      </motion.div>

      {/* Main title with typing/reveal effect */}
      <div className="text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight"
        >
          <motion.span
            className="inline-block"
            animate={{
              textShadow: [
                '0 0 10px rgba(239,68,68,0)',
                '0 0 20px rgba(239,68,68,0.3)',
                '0 0 10px rgba(239,68,68,0)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-red-500">{t('hero.title').split(':')[0] || t('hero.title')}</span>
          </motion.span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-6"
        >
          {t('hero.subtitle')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          {t('hero.desc')}
        </motion.p>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-mono text-sm text-red-400">{t('hero.date')}</span>
        </motion.div>
      </div>

      {/* Stats counters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6 }}
        className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12"
      >
        <StatCounter value={2} suffix={lang === 'he' ? ' מ"ג' : ' mg'} label={lang === 'he' ? 'סף קטלניות פנטניל' : 'Fentanyl lethal dose'} color="red" />
        <StatCounter value={10000} label={lang === 'he' ? 'מנות שנרכשו מסין' : 'Doses procured from China'} color="amber" />
        <StatCounter value={70} label={lang === 'he' ? 'אנלוגים שסונתזו' : 'Analogues synthesized'} color="blue" />
        <StatCounter value={20} suffix="+" label={lang === 'he' ? 'שנות מחקר' : 'Years of research'} color="purple" />
      </motion.div>

      {/* CTA */}
      <motion.button
        onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59,130,246,0.3)' }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-semibold flex items-center gap-2 hover:bg-blue-600/30 transition-colors"
      >
        {t('hero.cta')}
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}

function StatCounter({ value, suffix, label, color }: { value: number; suffix?: string; label: string; color: string }) {
  const colors: Record<string, string> = {
    red: 'text-red-400 border-red-500/30 bg-red-500/5',
    amber: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center px-4 py-3 rounded-xl border ${colors[color]}`}
    >
      <motion.span
        className="text-2xl sm:text-3xl font-black font-mono"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value.toLocaleString()}{suffix || ''}
      </motion.span>
      <span className="text-[10px] sm:text-xs text-gray-500 mt-1 text-center max-w-[100px]">{label}</span>
    </motion.div>
  );
}
