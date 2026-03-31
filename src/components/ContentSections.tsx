'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import Section, { Card } from './Section';
import { useState } from 'react';
import { AlertTriangle, Shield, Crosshair, Skull, Zap, Eye, BookOpen, ChevronRight, ExternalLink, Target, Plane, Wind, FlaskConical, Syringe, Building2 } from 'lucide-react';

/* ==================== SUMMARY ==================== */
export function SummarySection() {
  const { t } = useLang();
  return (
    <Section id="summary" title={t('summary.title')} accent="red">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <FlaskConical size={28} />, text: t('summary.p1'), color: 'text-blue-400', border: 'border-blue-500/20' },
          { icon: <Crosshair size={28} />, text: t('summary.p2'), color: 'text-red-400', border: 'border-red-500/20' },
          { icon: <Zap size={28} />, text: t('summary.p3'), color: 'text-amber-400', border: 'border-amber-500/20' },
        ].map((item, i) => (
          <Card key={i} delay={i * 0.2} className={`border ${item.border}`}>
            <div className={`mb-4 ${item.color}`}>{item.icon}</div>
            <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ==================== CAMPUS ==================== */
export function CampusSection() {
  const { t, lang } = useLang();
  return (
    <Section id="campus" title={t('campus.title')} subtitle={t('campus.subtitle')} accent="amber">
      <div className="relative">
        {/* Split view: civilian vs military */}
        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-700/50">
          {/* Civilian facade */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'he' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-gray-900/60 to-gray-800/40"
          >
            <div className="text-green-400 mb-3"><Building2 size={32} /></div>
            <h3 className="text-xl font-bold text-green-400 mb-4">{t('campus.facade')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                lang === 'he' ? 'הוקמה ב-1986' : 'Founded 1986',
                lang === 'he' ? '~6,000 סטודנטים' : '~6,000 students',
                lang === 'he' ? '15 מחלקות אקדמיות' : '15 academic departments',
                lang === 'he' ? 'תארים אקדמיים מוכרים' : 'Recognized degrees',
              ].map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Military reality */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'he' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-red-950/40 to-gray-900/60 border-s border-red-500/20"
          >
            <div className="text-red-400 mb-3"><Shield size={32} /></div>
            <h3 className="text-xl font-bold text-red-400 mb-4">{t('campus.reality')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                lang === 'he' ? 'כל פרופסור — חבר IRGC' : 'Every professor — IRGC member',
                lang === 'he' ? 'סומנה OFAC 2012 + טרור 2017' : 'OFAC designated 2012 + Terror 2017',
                lang === 'he' ? 'מו"פ נשק כימי ואסימטרי' : 'Chemical & asymmetric weapons R&D',
                lang === 'he' ? 'חסות SPND + MODAFL' : 'SPND + MODAFL oversight',
              ].map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Lightning bolt divider */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0d0d1a] rounded-full p-3 border border-amber-500/50"
        >
          <Zap size={24} className="text-amber-400" />
        </motion.div>
      </div>
    </Section>
  );
}

/* ==================== PARADIGM ==================== */
export function ParadigmSection() {
  const { t, lang } = useLang();
  const rows = [
    { param: lang === 'he' ? 'דוגמאות' : 'Examples', pba: lang === 'he' ? 'פנטניל, מדטומידין' : 'Fentanyl, Medetomidine', nerve: lang === 'he' ? 'סרין, VX' : 'Sarin, VX' },
    { param: lang === 'he' ? 'מטרה' : 'Objective', pba: lang === 'he' ? 'ניטרול, חטיפה, טשטוש' : 'Neutralize, abduct, disorient', nerve: lang === 'he' ? 'קטלניות, השמדה המונית' : 'Lethality, mass destruction' },
    { param: lang === 'he' ? 'מנגנון' : 'Mechanism', pba: lang === 'he' ? 'דיכוי CNS' : 'CNS Depression', nerve: lang === 'he' ? 'עיכוב AChE' : 'AChE Inhibition' },
    { param: lang === 'he' ? 'הכחשה' : 'Deniability', pba: lang === 'he' ? 'גבוהה מאוד' : 'Very High', nerve: lang === 'he' ? 'אפסית' : 'Zero' },
  ];

  return (
    <Section id="paradigm" title={t('paradigm.title')} subtitle={t('paradigm.subtitle')} accent="amber">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="p-3 text-gray-500" />
              <motion.th initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="p-3 text-amber-400 font-bold text-base bg-amber-500/5 border border-amber-500/20 rounded-t-xl">
                PBAs
              </motion.th>
              <motion.th initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="p-3 text-gray-400 font-bold text-base">
                {lang === 'he' ? 'גז עצבים' : 'Nerve Agent'}
              </motion.th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="border-b border-gray-800/50">
                <td className="p-3 text-gray-500 font-semibold">{row.param}</td>
                <td className="p-3 text-amber-300 bg-amber-500/5 border-x border-amber-500/10">{row.pba}</td>
                <td className="p-3 text-gray-400">{row.nerve}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Three pillars */}
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {[
          { icon: <Syringe size={24} />, title: 'PBAs', desc: lang === 'he' ? 'פנטניל קטלני ב-2 מ"ג. מדטומידין מנטרל נלוקסון.' : 'Fentanyl lethal at 2mg. Medetomidine neutralizes naloxone.', color: 'amber' },
          { icon: <Skull size={24} />, title: lang === 'he' ? 'סוכני עצבים' : 'Nerve Agents', desc: lang === 'he' ? 'מחקר וייצור בקנה מידה קטן כולל נוביצ\'וק.' : 'Small-scale research including Novichok.', color: 'red' },
          { icon: <AlertTriangle size={24} />, title: 'RCAs', desc: lang === 'he' ? 'רימוני "אשכן" ללא הצהרה מלאה.' : '"Ashkan" grenades without full declaration.', color: 'blue' },
        ].map((p, i) => (
          <Card key={i} delay={i * 0.15}>
            <div className={`text-${p.color}-400 mb-2`}>{p.icon}</div>
            <h4 className="font-bold text-white mb-1">{p.title}</h4>
            <p className="text-xs text-gray-400">{p.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ==================== TIMELINE ==================== */
export function TimelineSection() {
  const { t, lang } = useLang();
  const events = [
    { year: '2002', color: '#f59e0b', label: lang === 'he' ? 'השראה' : 'Inspiration', desc: lang === 'he' ? 'שימוש בנגזרת פנטניל בתיאטרון במוסקבה — 130 נהרגו' : 'Fentanyl derivative used at Moscow theater — 130 killed' },
    { year: '2005', color: '#3b82f6', label: lang === 'he' ? 'מחקר' : 'Research', desc: lang === 'he' ? 'תחילת פרסומים: סוכני עצב + פנטניל' : 'First publications: nerve agent precursors + fentanyl' },
    { year: '2014', color: '#8b5cf6', label: lang === 'he' ? 'רכש' : 'Procurement', desc: lang === 'he' ? 'ניסיון רכישת 10,000+ מנות מדטומידין מסין' : 'Attempted purchase of 10,000+ medetomidine doses from China' },
    { year: '2023', color: '#ef4444', label: lang === 'he' ? 'חשיפה' : 'Exposure', desc: lang === 'he' ? 'הדלפת מסמכי פרויקט הרתעה — רימוני מדטומידין' : 'Project Deterrence docs leaked — medetomidine grenades' },
    { year: '2025', color: '#dc2626', label: lang === 'he' ? 'השמדה' : 'Destruction', desc: lang === 'he' ? 'תקיפה ישראלית — השמדת מתחם שהיד מייסמי' : 'Israeli strike — Shahid Meisami complex destroyed' },
    { year: '2026', color: '#ff0000', label: lang === 'he' ? 'סיכול' : 'Interdiction', desc: lang === 'he' ? 'תקיפות צה"ל על 3 מטרות בקמפוס IHU' : 'IDF strikes on 3 targets within IHU campus' },
  ];

  return (
    <Section id="timeline" title={t('timeline.title')} subtitle={t('timeline.subtitle')} accent="red">
      <div className="relative">
        {/* Burning fuse line */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 rounded-full"
          style={{ left: '50%', marginLeft: '-2px' }}
          initial={{ background: 'linear-gradient(180deg, #f59e0b 0%, transparent 0%)' }}
          whileInView={{ background: 'linear-gradient(180deg, #f59e0b 0%, #ef4444 50%, #dc2626 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />

        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className={`flex items-center mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}
          >
            <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-end md:pe-8' : 'md:text-start md:ps-8'} mb-4 md:mb-0`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-block p-4 rounded-xl border border-gray-700/50 bg-gray-900/60 backdrop-blur-sm"
              >
                <span className="font-mono text-xs tracking-wider" style={{ color: ev.color }}>{ev.label}</span>
                <p className="text-sm text-gray-300 mt-1">{ev.desc}</p>
              </motion.div>
            </div>

            {/* Center dot */}
            <div className="md:w-2/12 flex justify-center relative z-10">
              <motion.div
                animate={{ scale: [1, 1.3, 1], boxShadow: [`0 0 0 0 ${ev.color}40`, `0 0 20px 5px ${ev.color}40`, `0 0 0 0 ${ev.color}40`] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center bg-[#0d0d1a]"
                style={{ borderColor: ev.color }}
              >
                <span className="text-sm font-black text-white">{ev.year}</span>
              </motion.div>
            </div>

            <div className="md:w-5/12" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ==================== CHAIN ==================== */
export function ChainSection() {
  const { t, lang } = useLang();
  const links = [
    { icon: <FlaskConical size={28} />, name: 'IHU', role: lang === 'he' ? 'מו"פ: סינתזה ומודלים' : 'R&D: Synthesis & Models', color: '#3b82f6' },
    { icon: <Eye size={28} />, name: 'SPND', role: lang === 'he' ? 'פיקוח: תיאום ומימון' : 'Oversight: Coordination & Funding', color: '#8b5cf6' },
    { icon: <Building2 size={28} />, name: lang === 'he' ? 'שהיד מייסמי' : 'Shahid Meisami', role: lang === 'he' ? 'ייצור: רימונים ומערכות' : 'Manufacturing: Grenades & Systems', color: '#ef4444', destroyed: true },
    { icon: <Target size={28} />, name: lang === 'he' ? 'חיזבאללה' : 'Hezbollah', role: lang === 'he' ? 'פריסה: חטיפות ופשיטות' : 'Deployment: Abductions & Raids', color: '#dc2626' },
  ];

  return (
    <Section id="chain" title={t('chain.title')} subtitle={t('chain.subtitle')} accent="blue">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {links.map((link, i) => (
          <div key={i} className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: 'spring' }}
              whileHover={{ scale: 1.08 }}
              className={`relative p-6 rounded-2xl border bg-gray-900/60 backdrop-blur-sm text-center min-w-[150px] ${link.destroyed ? 'border-red-500/50' : 'border-gray-700/50'}`}
            >
              {link.destroyed && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-2 -end-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold"
                >
                  {lang === 'he' ? 'הושמד 2025' : 'DESTROYED 2025'}
                </motion.div>
              )}
              <div className="mb-2" style={{ color: link.color }}>{link.icon}</div>
              <div className="font-bold text-white text-sm">{link.name}</div>
              <div className="text-xs text-gray-500 mt-1">{link.role}</div>
            </motion.div>

            {/* Arrow between links */}
            {i < links.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.1 }}
                className="hidden md:block"
              >
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight size={24} className="text-blue-500/50" />
                </motion.div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Flow animation line */}
      <motion.div
        className="mt-6 h-1 rounded-full overflow-hidden bg-gray-800"
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ef4444, #dc2626)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </Section>
  );
}

/* ==================== PLATFORMS ==================== */
export function PlatformsSection() {
  const { t, lang } = useLang();
  const platforms = [
    { icon: <AlertTriangle size={32} />, title: lang === 'he' ? 'רימוני גז טקטיים' : 'Tactical Gas Grenades', desc: lang === 'he' ? 'ABC-M7A2/M7A3 עם 40% מדטומידין. MK 2 38mm. רימוני "אשכן".' : 'ABC-M7A2/M7A3 with 40% medetomidine. MK 2 38mm. "Ashkan" grenades.', color: 'red' },
    { icon: <Plane size={32} />, title: lang === 'he' ? 'חימוש נישא רחפנים' : 'Drone-Carried Munitions', desc: lang === 'he' ? 'מל"ט "ארבעין" — 7 ק"ג מטען, 10 ק"מ טווח, שעת טיסה.' : '"Arbaeen" drone — 7kg payload, 10km range, 1hr flight.', color: 'blue' },
    { icon: <Wind size={32} />, title: lang === 'he' ? 'מערכות יצרני ערפל' : 'Fog Generator Systems', desc: lang === 'he' ? '"מייצר ערפל" על משאית — פיזור נפחי של חומרים הגורמים לאיבוד הכרה.' : 'Vehicle-mounted fog generator — volumetric dispersal of incapacitants.', color: 'amber' },
  ];

  return (
    <Section id="platforms" title={t('platforms.title')} subtitle={t('platforms.subtitle')} accent="red">
      <div className="grid md:grid-cols-3 gap-6">
        {platforms.map((p, i) => (
          <Card key={i} delay={i * 0.2}>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className={`text-${p.color}-400 mb-4`}
            >
              {p.icon}
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ==================== STRIKES ==================== */
export function StrikesSection() {
  const { t, lang } = useLang();
  const targets = [
    { id: 'TARGET 01', name: lang === 'he' ? 'המרכז לכימיה' : 'Chemistry Center', desc: lang === 'he' ? 'מוקד פיתוח וסינתזת נשק כימי מבוסס תרופות' : 'PBA development and synthesis hub', x: '70%', y: '25%' },
    { id: 'TARGET 02', name: lang === 'he' ? 'מנהרות הרוח' : 'Wind Tunnels', desc: lang === 'he' ? 'תשתית פיתוח מערכות פיזור אירוסוליות' : 'Aerosol dispersal system development', x: '25%', y: '45%' },
    { id: 'TARGET 03', name: lang === 'he' ? 'מרכז טכנולוגיה והנדסה' : 'Tech & Engineering Center', desc: lang === 'he' ? 'שילוב מטענים כימיים עם פלטפורמות' : 'Chemical payload integration with platforms', x: '50%', y: '75%' },
  ];

  return (
    <Section id="response" title={t('strikes.title')} subtitle={t('strikes.subtitle')} accent="red">
      <Card>
        <div className="relative bg-gray-950 rounded-xl overflow-hidden" style={{ minHeight: '400px' }}>
          {/* Map background placeholder */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          <div className="absolute top-4 start-4 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-red-950/80 border border-red-500/50 rounded-lg px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-red-400 font-mono text-sm font-bold">30.03.2026 | IDF STRIKE</span>
            </motion.div>
          </div>

          {/* Targets */}
          {targets.map((tgt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.4, type: 'spring' }}
              className="absolute z-10"
              style={{ left: tgt.x, top: tgt.y, transform: 'translate(-50%, -50%)' }}
            >
              {/* Crosshair pulse */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="absolute -inset-4 border-2 border-red-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1.5, 1, 1.5], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="absolute -inset-8 border border-red-500/50 rounded-full"
              />
              <div className="relative bg-red-950/90 border border-red-500 rounded-lg px-3 py-2 backdrop-blur-sm min-w-[160px]">
                <div className="text-red-400 font-mono text-[10px] font-bold">[{tgt.id}]</div>
                <div className="text-white text-sm font-bold">{tgt.name}</div>
                <div className="text-gray-400 text-[11px]">{tgt.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

/* ==================== HAZMAT ==================== */
export function HazmatSection() {
  const { t, lang } = useLang();
  return (
    <Section id="hazmat" title={t('hazmat.title')} accent="amber">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Skull size={24} className="text-red-400" />
            </motion.div>
            <h3 className="text-lg font-bold text-red-400">
              {lang === 'he' ? 'סיכון קריטי: נלוקסון לא יעבוד' : 'Critical: Naloxone May Fail'}
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {lang === 'he'
              ? 'שילוב פנטניל עם מדטומידין מנטרל את השפעת הנלוקסון — פרוטוקולי נוגד אופיואידים סטנדרטיים עלולים להיות לא מספקים. פנטניל קטלני במינון של מעל 2 מ"ג בלבד.'
              : 'Combining fentanyl with medetomidine neutralizes naloxone — standard opioid antidote protocols may be insufficient. Fentanyl is lethal at just 2mg.'}
          </p>
        </Card>

        <Card className="border-amber-500/30">
          <h3 className="text-lg font-bold text-amber-400 mb-3">
            {lang === 'he' ? 'מנגנוני משלוח' : 'Delivery Mechanisms'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {(lang === 'he'
              ? ['רימוני יד ABC-M7A2/M7A3 + מחסניות 38mm', 'מל"טי VTOL עם מטען 7 ק"ג', 'מערכות "מייצר ערפל" על משאיות', 'החדרה למערכות אוורור — עקיפת מיגון']
              : ['ABC-M7A2/M7A3 grenades + 38mm cartridges', 'VTOL drones with 7kg payload', 'Vehicle-mounted fog generators', 'Ventilation infiltration — bypasses protection']
            ).map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> {item}
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

/* ==================== GLOSSARY ==================== */
export function GlossarySection() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState('all');

  const terms = [
    { term: 'IHU', cat: 'org', he: 'אוניברסיטת אימאם חוסיין — המוסד האקדמי היחיד של IRGC', en: 'Imam Hossein University — IRGC\'s sole academic institution' },
    { term: 'IRGC', cat: 'org', he: 'משמרות המהפכה האיסלאמית', en: 'Islamic Revolutionary Guard Corps' },
    { term: 'SPND', cat: 'org', he: 'ארגון המחקר והחדשנות ההגנתית — מתאם נשק רגיש', en: 'Organization of Defensive Innovation and Research' },
    { term: 'MUT', cat: 'org', he: 'אוניברסיטת מאלק אשתר לטכנולוגיה — כפופה ל-MODAFL', en: 'Malek Ashtar University of Technology — under MODAFL' },
    { term: 'MODAFL', cat: 'org', he: 'משרד ההגנה והלוגיסטיקה של הכוחות המזוינים', en: 'Ministry of Defense and Armed Forces Logistics' },
    { term: 'SMG', cat: 'org', he: 'קבוצת שהיד מייסמי — חברת בת של SPND, ייצור נשק כימי. הושמדה 2025', en: 'Shahid Meisami Group — SPND subsidiary, CW production. Destroyed 2025' },
    { term: 'ISAEM', cat: 'org', he: 'האגודה המדעית האיראנית לחומרים אנרגטיים', en: 'Iranian Scientific Association of Energetic Materials' },
    { term: 'OPCW', cat: 'org', he: 'הארגון לאיסור נשק כימי', en: 'Organisation for the Prohibition of Chemical Weapons' },
    { term: 'PBA', cat: 'chem', he: 'סוכן מבוסס תרופות — נשק כימי באזור האפור', en: 'Pharmaceutical-Based Agent — gray zone chemical weapon' },
    { term: 'CWC', cat: 'legal', he: 'אמנת הנשק הכימי', en: 'Chemical Weapons Convention' },
    { term: 'CNS', cat: 'chem', he: 'מערכת העצבים המרכזית', en: 'Central Nervous System' },
    { term: 'AChE', cat: 'chem', he: 'אצטילכולינאסטראז — אנזים שסוכני עצב מעכבים', en: 'Acetylcholinesterase — enzyme inhibited by nerve agents' },
    { term: lang === 'he' ? 'פנטניל' : 'Fentanyl', cat: 'chem', he: 'אופיואיד סינתטי חזק. קטלני ב-2 מ"ג. 400× חזק ממורפין', en: 'Potent synthetic opioid. Lethal at 2mg. 400× morphine potency' },
    { term: lang === 'he' ? 'מדטומידין' : 'Medetomidine', cat: 'chem', he: 'אגוניסט אלפא-2. מרגיע וטרינרי שהוסב לנשק. מנטרל נלוקסון', en: 'Alpha-2 agonist. Vet sedative weaponized. Neutralizes naloxone' },
    { term: lang === 'he' ? 'נוביצ\'וק' : 'Novichok', cat: 'chem', he: 'סדרת סוכני עצב רוסית. עוצמה פי 5-10 מ-VX', en: 'Russian nerve agent series. 5-10× more potent than VX' },
    { term: lang === 'he' ? 'נלוקסון' : 'Naloxone', cat: 'chem', he: 'תרופת נגד לאופיואידים. לא יעיל בשילוב עם מדטומידין', en: 'Opioid antagonist. Ineffective when combined with medetomidine' },
    { term: lang === 'he' ? 'פח\'ראיאן' : 'Fakhraian', cat: 'person', he: 'חוסיין פח\'ראיאן — מוביל תוכנית ה-PBA ב-IHU. עורך כתבי עת', en: 'Hossein Fakhraian — PBA program lead at IHU. Journal editor' },
    { term: lang === 'he' ? 'באברי' : 'Babri', cat: 'person', he: 'מהראן באברי — מנהל שהיד מייסמי. קשר עם OPCW', en: 'Mehran Babri — SMG director. OPCW association' },
  ];

  const cats = [
    { id: 'all', label: lang === 'he' ? 'הכל' : 'All' },
    { id: 'org', label: lang === 'he' ? 'ארגונים' : 'Organizations' },
    { id: 'chem', label: lang === 'he' ? 'חומרים' : 'Chemicals' },
    { id: 'person', label: lang === 'he' ? 'אנשים' : 'People' },
    { id: 'legal', label: lang === 'he' ? 'משפטי' : 'Legal' },
  ];

  const filtered = filter === 'all' ? terms : terms.filter(t => t.cat === filter);

  return (
    <Section id="glossary" title={t('glossary.title')} accent="blue">
      <div className="flex flex-wrap gap-2 mb-6">
        {cats.map(c => (
          <motion.button key={c.id} whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(c.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === c.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            {c.label}
          </motion.button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div key={item.term}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 p-3 rounded-xl border border-gray-700/40 bg-gray-900/40 hover:border-blue-500/30 transition-colors">
              <span className="font-mono text-blue-400 font-bold text-sm shrink-0 min-w-[80px]">{item.term}</span>
              <span className="text-xs text-gray-400">{lang === 'he' ? item.he : item.en}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ==================== GALLERY ==================== */
export function GallerySection() {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState<number | null>(null);

  const slides = [
    { src: '/images/slide-01.jpg', title: lang === 'he' ? 'שער — אנטומיה של איום' : 'Cover — Anatomy of a Threat' },
    { src: '/images/slide-02.jpg', title: lang === 'he' ? 'קמפוס או בסיס צבאי?' : 'Campus or Military Base?' },
    { src: '/images/slide-03.jpg', title: lang === 'he' ? 'שינוי פרדיגמה' : 'Paradigm Shift' },
    { src: '/images/slide-04.jpg', title: lang === 'he' ? 'וקטור ההסלמה' : 'Escalation Vector' },
    { src: '/images/slide-05.jpg', title: lang === 'he' ? 'פרויקט הרתעה' : 'Project Deterrence' },
    { src: '/images/slide-06.jpg', title: lang === 'he' ? 'אתגר הפיזור' : 'Dispersal Challenge' },
    { src: '/images/slide-07.jpg', title: lang === 'he' ? 'השרשרת התעשייתית' : 'Industrial Chain' },
    { src: '/images/slide-08.jpg', title: lang === 'he' ? 'פלטפורמות מסירה' : 'Delivery Platforms' },
    { src: '/images/slide-09.jpg', title: lang === 'he' ? 'תקיפות צה"ל' : 'IDF Strikes' },
    { src: '/images/slide-10.jpg', title: lang === 'he' ? 'סיכום תובנות' : 'Key Insights' },
  ];

  return (
    <Section id="gallery" title={t('gallery.title')} accent="blue">
      {/* Infographic */}
      <Card className="mb-8">
        <h3 className="text-lg font-bold text-amber-400 mb-4">
          {lang === 'he' ? 'אינפוגרפיקה: חימוש הפנטניל' : 'Infographic: Fentanyl Weaponization'}
        </h3>
        <motion.img
          src="/images/infographic.png"
          alt="Infographic"
          className="w-full rounded-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelected(-1)}
        />
      </Card>

      {/* Slides grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {slides.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onClick={() => setSelected(i)}
            className="cursor-pointer rounded-lg overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all">
            <img src={s.src} alt={s.title} className="w-full aspect-video object-cover" />
            <div className="p-2 bg-gray-900/80">
              <span className="text-[10px] text-gray-400">{s.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer">
            <motion.img
              initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}
              src={selected === -1 ? '/images/infographic.png' : slides[selected].src}
              alt="Enlarged"
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ==================== INSIGHTS ==================== */
export function InsightsSection() {
  const { t, lang } = useLang();
  const circles = [
    { label: lang === 'he' ? 'כימיה מבוססת תרופות' : 'Pharmaceutical Chemistry', color: '#3b82f6' },
    { label: lang === 'he' ? 'הנדסת פיזור אזרחית' : 'Civilian Dispersal Engineering', color: '#f59e0b' },
    { label: lang === 'he' ? 'אסטרטגיית פרוקסי' : 'Proxy Strategy', color: '#ef4444' },
  ];

  return (
    <Section id="insights" title={t('insights.title')} accent="red">
      {/* Venn diagram */}
      <div className="flex justify-center mb-10">
        <div className="relative w-80 h-80">
          {circles.map((c, i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            const cx = 140 + Math.cos(angle) * 50;
            const cy = 140 + Math.sin(angle) * 50;
            return (
              <motion.div key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.3, type: 'spring' }}
                className="absolute w-40 h-40 rounded-full border-2 flex items-center justify-center"
                style={{ left: cx - 80, top: cy - 80, borderColor: c.color, background: `${c.color}10` }}>
                <span className="text-xs font-bold text-center px-2" style={{ color: c.color }}>{c.label}</span>
              </motion.div>
            );
          })}
          {/* Center */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, type: 'spring' }}
            animate={{ boxShadow: ['0 0 10px rgba(220,38,38,0.3)', '0 0 30px rgba(220,38,38,0.6)', '0 0 10px rgba(220,38,38,0.3)'] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-950 border-2 border-red-500 flex items-center justify-center z-10"
            style={{ marginTop: 10 }}
          >
            <span className="text-[10px] font-bold text-red-400 text-center leading-tight">
              {lang === 'he' ? 'נשק השמדה\nאסימטרי' : 'Asymmetric\nWMD'}
            </span>
          </motion.div>
        </div>
      </div>

      <Card className="border-red-500/30 text-center">
        <p className="text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {lang === 'he'
            ? 'תוכנית ה-PBA של איראן מסמלת מעבר מנשק השמדה המונית לנשק הגורם לאיבוד הכרה ומוות — כלים המיועדים לשימוש יומיומי במלחמות פרוקסי באזור האפור. האיום פעיל, היכולת הוכחה, ומערכות המשלוח מבצעיות.'
            : "Iran's PBA program represents a shift from WMDs to tactical incapacitation — tools for everyday proxy warfare in the gray zone. The threat is active, the capability demonstrated, and the delivery systems operational."}
        </p>
      </Card>
    </Section>
  );
}
