'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t';

const sections = [
  'home','timeline','paradigm','chemistry','chain','network',
  'platforms','response','hazmat','glossary','gallery'
];

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0d0d1a]/80 border-b border-blue-500/20"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo 60sec + WhatsApp link */}
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-lg shadow-amber-500/20">
              <img
                src="/images/logo-60sec.png"
                alt="60 שניות של חומ״ס"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f59e0b,#ef4444);color:white;font-weight:bold;font-size:11px;">60s</div>';
                }}
              />
            </div>
            <motion.span
              className="text-xs text-amber-400/80 hidden sm:block"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              60 שניות חומ״ס
            </motion.span>
          </motion.a>

          {/* Center title */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-red-500 font-mono text-xs animate-pulse">●</span>
            <span className="text-sm font-semibold text-gray-300 tracking-wider">
              {t('nav.title')}
            </span>
          </motion.div>

          {/* Right side: nav links (desktop) + lang toggle + menu button */}
          <div className="flex items-center gap-3">
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.map((s, i) => (
                <motion.button
                  key={s}
                  onClick={() => scrollTo(s)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.05, color: '#60a5fa' }}
                  className="px-2 py-1 text-xs text-gray-400 hover:text-blue-400 transition-colors rounded"
                >
                  {t(`nav.${s}`)}
                </motion.button>
              ))}
            </div>

            {/* Language toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-bold hover:bg-blue-500/20"
            >
              <motion.div
                animate={{ rotate: lang === 'he' ? 0 : 360 }}
                transition={{ duration: 0.5 }}
              >
                <Globe size={14} />
              </motion.div>
              {t('nav.lang')}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 text-gray-400"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl bg-[#0d0d1a]/95 border-b border-blue-500/20 lg:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {sections.map((s, i) => (
                <motion.button
                  key={s}
                  onClick={() => scrollTo(s)}
                  initial={{ opacity: 0, x: lang === 'he' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="py-3 px-4 text-right text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all text-sm"
                >
                  {t(`nav.${s}`)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
