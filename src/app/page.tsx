'use client';
import { LangProvider } from '@/lib/LanguageContext';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Paradigm from '@/components/Paradigm';
import Chain from '@/components/Chain';
import Platforms from '@/components/Platforms';
import Strikes from '@/components/Strikes';
import HazMat from '@/components/HazMat';
import Glossary from '@/components/Glossary';
import Gallery from '@/components/Gallery';
import Sources from '@/components/Sources';
import Insights from '@/components/Insights';

export default function Home() {
  return (
    <LangProvider>
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-16">
        <Hero />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Timeline />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Paradigm />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Chain />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Platforms />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Strikes />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <HazMat />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Gallery />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Glossary />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Sources />
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
        <Insights />
        {/* Footer */}
        <footer className="py-8 text-center border-t border-gray-800/50">
          <p className="text-xs text-gray-600">60 שניות של חומ״ס | Intelligence Research Report | March 2026</p>
        </footer>
      </main>
    </LangProvider>
  );
}
