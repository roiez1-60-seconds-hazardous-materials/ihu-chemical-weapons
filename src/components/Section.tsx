'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  accent?: 'blue' | 'red' | 'amber';
}

const colors = {
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/10' },
  red: { border: 'border-red-500/30', text: 'text-red-400', glow: 'shadow-red-500/10' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/10' },
};

export default function Section({ id, title, subtitle, children, accent = 'blue' }: Props) {
  const c = colors[accent];
  return (
    <section id={id} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            className={`inline-block px-4 py-1 rounded-full border ${c.border} bg-gray-900/50 mb-4`}
            whileInView={{ boxShadow: `0 0 20px ${accent === 'blue' ? 'rgba(59,130,246,0.2)' : accent === 'red' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}` }}
            viewport={{ once: true }}
          >
            <span className={`font-mono text-xs ${c.text} tracking-wider`}>
              ■ {id.toUpperCase()}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{title}</h2>
          {subtitle && <p className="text-base text-gray-500">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

export function Card({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(59,130,246,0.1)' }}
      className={`rounded-2xl border border-gray-700/50 bg-gray-900/40 backdrop-blur-sm p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
