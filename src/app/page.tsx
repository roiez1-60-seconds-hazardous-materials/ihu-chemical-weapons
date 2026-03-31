'use client';
import { LangProvider } from '@/lib/LanguageContext';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Paradigm from '@/components/Paradigm';
import Chain from '@/components/Chain';
import NetworkGraph from '@/components/NetworkGraph';
import Platforms from '@/components/Platforms';
import Strikes from '@/components/Strikes';
import HazMat from '@/components/HazMat';
import Glossary from '@/components/Glossary';
import Gallery from '@/components/Gallery';
import Sources from '@/components/Sources';
import Insights from '@/components/Insights';
import Footer from '@/components/Footer';

const Divider = () => (
  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-4" />
);

export default function Home() {
  return (
    <LangProvider>
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-16">
        <Hero />
        <Divider />
        <Timeline />
        <Divider />
        <Paradigm />
        <Divider />
        <Chain />
        <Divider />
        <NetworkGraph />
        <Divider />
        <Platforms />
        <Divider />
        <Strikes />
        <Divider />
        <HazMat />
        <Divider />
        <Gallery />
        <Divider />
        <Glossary />
        <Divider />
        <Sources />
        <Divider />
        <Insights />
        <Footer />
      </main>
    </LangProvider>
  );
}
