'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Syringe, Wind as WindIcon, Eye, Users } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function EmergencyCard() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
          {h ? 'כרטיס תגובת חירום' : 'Emergency Response Card'}
        </h2>
        <p className="text-gray-400 text-sm">
          {h ? 'אירוע במעורבות חומרים מבוססי תרופות (PBA) \u2022 לחצו להפוך' : 'Pharmaceutical-Based Agent (PBA) Event \u2022 Click to flip'}
        </p>
      </motion.div>

      <div className="cursor-pointer" onClick={() => setFlipped(!flipped)} style={{ perspective: '1200px' }}>
        <motion.div className="relative w-full" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }}>

          {/* ══════ FRONT ══════ */}
          <div className="rounded-2xl overflow-hidden border-2 border-red-600/60" style={{ backfaceVisibility: 'hidden' }}>
            <div className="bg-red-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-white" />
                <div>
                  <div className="text-white font-black text-xs tracking-wider">
                    {h ? 'כרטיס תגובת חירום \u2014 אירוע PBA' : 'EMERGENCY RESPONSE \u2014 PBA EVENT'}
                  </div>
                  <div className="text-red-200 text-[9px]">
                    {h ? 'חומרים מבוססי תרופות: פנטניל, קרפנטניל, מדטומידין' : 'Pharmaceutical-Based Agents: Fentanyl, Carfentanil, Medetomidine'}
                  </div>
                </div>
              </div>
              <span className="text-red-200 text-[9px] font-mono">1/2</span>
            </div>

            <div className="bg-[#0e0e14] p-4 space-y-3">
              {/* DIFFERENTIAL TABLE */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={13} className="text-amber-400" />
                  <span className="text-amber-400 text-[10px] font-black tracking-wider uppercase">
                    {h ? 'איך להבדיל \u2014 PBA מול חומר עצב' : 'HOW TO DIFFERENTIATE \u2014 PBA vs Nerve Agent'}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[9px]">
                    <thead>
                      <tr className="border-b border-gray-700/40">
                        <th className="text-gray-500 text-start py-1.5 w-[28%]">{h ? 'סימן' : 'Sign'}</th>
                        <th className="text-start py-1.5 text-red-400 w-[36%]">PBA \u2014 {h ? 'יבש ושקט' : 'Dry & Quiet'}</th>
                        <th className="text-start py-1.5 text-orange-400 w-[36%]">{h ? 'חומר עצב \u2014 רטוב' : 'Nerve Agent \u2014 Wet'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800/20">
                        <td className="py-1.5 text-gray-500">{h ? 'אישונים' : 'Pupils'}</td>
                        <td className="py-1.5">{h ? 'מכווצים (נקודתיים)' : 'Constricted (pinpoint)'}</td>
                        <td className="py-1.5">{h ? 'מכווצים (נקודתיים)' : 'Constricted (pinpoint)'}</td>
                      </tr>
                      <tr className="border-b border-gray-800/20">
                        <td className="py-1.5 text-gray-500">{h ? 'נשימה' : 'Breathing'}</td>
                        <td className="py-1.5 text-red-300">{h ? 'איטית עד עצירה, נחירות, שפתיים כחולות' : 'Slow to absent, snoring, blue lips'}</td>
                        <td className="py-1.5 text-orange-300">{h ? 'צפצופים, הצפה של נוזלים בריאות, שיעול' : 'Wheezing, fluid flooding the lungs, cough'}</td>
                      </tr>
                      <tr className="border-b border-gray-800/20">
                        <td className="py-1.5 text-gray-500">{h ? 'הפרשות גוף' : 'Body secretions'}</td>
                        <td className="py-1.5 font-bold text-red-300">{h ? 'יבש \u2014 אין ריור, דמעות, זיעה' : 'DRY \u2014 no saliva, tears, sweat'}</td>
                        <td className="py-1.5 font-bold text-orange-300">{h ? 'רטוב \u2014 ריור, דמעות, זיעה, שלשול, הקאות' : 'WET \u2014 saliva, tears, sweat, diarrhea, vomiting'}</td>
                      </tr>
                      <tr className="border-b border-gray-800/20">
                        <td className="py-1.5 text-gray-500">{h ? 'שרירים' : 'Muscles'}</td>
                        <td className="py-1.5">{h ? 'רפויים \u2014 ללא עוויתות' : 'Flaccid \u2014 no twitching'}</td>
                        <td className="py-1.5">{h ? 'רעד, עוויתות (קפיצות שרירים), פרכוסים' : 'Tremors, fasciculations (muscle twitching), seizures'}</td>
                      </tr>
                      <tr className="border-b border-gray-800/20">
                        <td className="py-1.5 text-gray-500">{h ? 'מצב הנפגע' : 'Presentation'}</td>
                        <td className="py-1.5">{h ? 'שוכב שקט, מאבד הכרה בהדרגה' : 'Lying still, gradual loss of consciousness'}</td>
                        <td className="py-1.5">{h ? 'בלבול, חוסר שקט, קריסה עם פרכוסים' : 'Confusion, agitation, collapse with seizures'}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-gray-500">{h ? 'נוגדן' : 'Antidote'}</td>
                        <td className="py-1.5 text-green-400 font-bold">{h ? 'נלוקסון' : 'Naloxone'}</td>
                        <td className="py-1.5 text-green-400 font-bold">{h ? 'אטרופין + 2-PAM' : 'Atropine + 2-PAM'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-1 text-[8px] text-gray-600 font-mono">
                  {h ? 'מקורות: NCBI StatPearls, CDC CHEMM, Canadian J. Anesthesia 2017' : 'Sources: NCBI StatPearls, CDC CHEMM, Canadian J. Anesthesia 2017'}
                </div>
              </div>

              {/* KEY RULE */}
              <div className="bg-amber-500/8 border border-amber-500/20 rounded-lg px-3 py-2">
                <span className="text-[10px] text-amber-300 font-bold leading-relaxed">
                  {h
                    ? 'כלל אצבע: נפגע שוכב שקט, יבש, לא נושם כראוי = חשד PBA. נפגע רטוב, מזיע, עם עוויתות = חשד חומר עצב.'
                    : 'Rule of thumb: Casualty lying quiet, dry, poor breathing = suspect PBA. Casualty wet, sweating, twitching = suspect nerve agent.'}
                </span>
              </div>

              {/* IMMEDIATE ACTIONS */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={13} className="text-red-400" />
                  <span className="text-red-400 text-[10px] font-black tracking-wider uppercase">
                    {h ? 'פעולות מיידיות \u2014 אירוע PBA' : 'IMMEDIATE ACTIONS \u2014 PBA EVENT'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {(h ? [
                    { n: '1', t: 'הגנה \u2014 ציוד נשימתי מלא (SCBA). אין כניסה ללא מיגון!', c: '#ef4444' },
                    { n: '2', t: 'בידוד ראשוני \u2014 במבנה: 100 מטר. בשטח פתוח: 200 מטר נגד כיוון הרוח', c: '#f59e0b' },
                    { n: '3', t: 'נלוקסון \u2014 2 מ"ג IM (תוך-שרירי) או IN (תוך-אפי) לכל נפגע ללא הכרה. חזור כל 2-3 דקות אם אין תגובה', c: '#22c55e' },
                    { n: '4', t: 'דווח \u2014 "אירוע חשוד PBA" + מספר נפגעים + כיוון רוח + תיאור סימנים (יבש/שקט)', c: '#3b82f6' },
                  ] : [
                    { n: '1', t: 'Protection \u2014 full SCBA. Do not enter without PPE!', c: '#ef4444' },
                    { n: '2', t: 'Initial isolation \u2014 enclosed: 100m. Open area: 200m upwind', c: '#f59e0b' },
                    { n: '3', t: 'Naloxone \u2014 2mg IM (intramuscular) or IN (intranasal) to each unconscious casualty. Repeat every 2-3 min if no response', c: '#22c55e' },
                    { n: '4', t: 'Report \u2014 "Suspected PBA event" + casualty count + wind direction + signs (dry/quiet)', c: '#3b82f6' },
                  ]).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: `${item.c}08`, border: `1px solid ${item.c}20` }}>
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px]" style={{ backgroundColor: `${item.c}20`, color: item.c }}>
                        {item.n}
                      </div>
                      <span className="text-[10px] text-gray-200 leading-relaxed">{item.t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-1">
                <span className="text-[9px] text-gray-600 font-mono">{h ? '\u2190 לחצו להפוך \u2014 נתוני חומרים ופרוטוקול נלוקסון \u2192' : '\u2190 Click to flip \u2014 Agent data & naloxone protocol \u2192'}</span>
              </div>
            </div>
          </div>

          {/* ══════ BACK ══════ */}
          <div className="rounded-2xl overflow-hidden border-2 border-blue-600/60 absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="bg-blue-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Syringe size={18} className="text-white" />
                <div>
                  <div className="text-white font-black text-xs tracking-wider">
                    {h ? 'נתוני חומרים ופרוטוקול טיפול' : 'AGENT DATA & TREATMENT PROTOCOL'}
                  </div>
                  <div className="text-blue-200 text-[9px]">
                    {h ? 'מרחקי בידוד ראשוני (מב"ר) ונלוקסון' : 'Initial isolation distances & naloxone'}
                  </div>
                </div>
              </div>
              <span className="text-blue-200 text-[9px] font-mono">2/2</span>
            </div>

            <div className="bg-[#0e0e14] p-4 space-y-3">
              {/* AGENT TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-[9px]">
                  <thead>
                    <tr className="border-b border-gray-700/30">
                      <th className="text-gray-500 text-start py-1.5 font-mono">{h ? 'חומר' : 'Agent'}</th>
                      <th className="text-gray-500 text-start py-1.5 font-mono">{h ? 'מינון קטלני' : 'Lethal Dose'}</th>
                      <th className="text-gray-500 text-start py-1.5 font-mono">{h ? 'נוגדן' : 'Antidote'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800/30">
                      <td className="py-1.5 text-red-400 font-bold">{h ? 'פנטניל' : 'Fentanyl'}</td>
                      <td className="py-1.5">~2 {h ? 'מ"ג (הערכה)' : 'mg (est.)'}</td>
                      <td className="py-1.5 text-green-400">{h ? 'נלוקסון 2 מ"ג' : 'Naloxone 2mg'}</td>
                    </tr>
                    <tr className="border-b border-gray-800/30">
                      <td className="py-1.5 text-red-500 font-bold">{h ? 'קרפנטניל' : 'Carfentanil'}</td>
                      <td className="py-1.5">{h ? 'מיקרוגרמים (\u00d7100)' : 'Micrograms (\u00d7100)'}</td>
                      <td className="py-1.5 text-green-400">{h ? 'נלוקסון מנות גבוהות וחוזרות' : 'Naloxone high repeated doses'}</td>
                    </tr>
                    <tr className="border-b border-gray-800/30">
                      <td className="py-1.5 text-amber-400 font-bold">{h ? 'מדטומידין' : 'Medetomidine'}</td>
                      <td className="py-1.5">{h ? 'לא פורסם' : 'Not published'}</td>
                      <td className="py-1.5 text-amber-400">{h ? 'אטיפמזול (לא זמין בשטח)' : 'Atipamezole (not field-available)'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-purple-400 font-bold">{h ? 'אנלוגים' : 'Analogues'}</td>
                      <td className="py-1.5">{h ? 'משתנה' : 'Variable'}</td>
                      <td className="py-1.5 text-yellow-400">{h ? 'נלוקסון \u2014 יעילות לא ודאית' : 'Naloxone \u2014 uncertain efficacy'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ISOLATION DISTANCES */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={13} className="text-amber-400" />
                  <span className="text-amber-400 text-[10px] font-black tracking-wider uppercase">
                    {h ? 'מרחק בידוד ראשוני (מב"ר)' : 'INITIAL ISOLATION DISTANCE'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(h ? [
                    { label: 'במבנה', dist: '100 מ\u05F3', color: '#ef4444' },
                    { label: 'שטח פתוח', dist: '200 מ\u05F3', color: '#3b82f6' },
                  ] : [
                    { label: 'Enclosed space', dist: '100m', color: '#ef4444' },
                    { label: 'Open area', dist: '200m', color: '#3b82f6' },
                  ]).map((d, i) => (
                    <div key={i} className="text-center p-2.5 rounded-lg" style={{ backgroundColor: `${d.color}08`, border: `1px solid ${d.color}20` }}>
                      <div className="font-mono font-black text-lg" style={{ color: d.color }}>{d.dist}</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">{d.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/15">
                  <div className="flex items-center gap-1.5 mb-1">
                    <WindIcon size={12} className="text-amber-400" />
                    <span className="text-[10px] text-amber-400 font-bold">{h ? 'מייצר ערפל' : 'Fog Generator'}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 leading-relaxed">
                    {h
                      ? 'מב"ר 200 מ\u05F3 + מרחק נוסף במורד הרוח (תלוי עוצמת המקור). יש להרחיב בידוד בהתאם לתנאי רוח ושטח.'
                      : 'Initial isolation 200m + additional distance downwind (depends on source intensity). Expand isolation based on wind and terrain.'}
                  </span>
                </div>
              </div>

              {/* NALOXONE PROTOCOL */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Syringe size={13} className="text-green-400" />
                  <span className="text-green-400 text-[10px] font-black tracking-wider uppercase">
                    {h ? 'פרוטוקול נלוקסון' : 'NALOXONE PROTOCOL'}
                  </span>
                </div>
                <div className="space-y-1">
                  {(h ? [
                    '2 מ"ג IM (הזרקה לשריר) או IN (ריסוס לאף) מיד',
                    'אם אין תגובה תוך 2-3 דקות \u2014 מנה נוספת',
                    'חשד לקרפנטניל \u2014 מנות גבוהות יותר וחוזרות (אין פרוטוקול ספציפי מפורסם)',
                    'המשך מעקב \u2014 הנלוקסון מתפרק מהר יותר מהחומר, הנפגע עלול לחזור לאיבוד הכרה',
                  ] : [
                    '2mg IM (injection to muscle) or IN (nasal spray) immediately',
                    'No response in 2-3 min \u2014 administer additional dose',
                    'Suspected carfentanil \u2014 higher and repeated doses (no specific published protocol)',
                    'Continue monitoring \u2014 naloxone wears off faster than agent, casualty may relapse',
                  ]).map((line, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-green-400 text-[10px] mt-0.5">{'\u2022'}</span>
                      <span className="text-[10px] text-gray-300 leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WARNING */}
              <div className="bg-red-500/8 border border-red-500/25 rounded-lg px-3 py-2 flex items-start gap-2">
                <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-[10px] text-red-300 leading-relaxed">
                  {h
                    ? 'שילוב מדטומידין+פנטניל: נלוקסון חוסם רק את הפנטניל אך לא משפיע על המדטומידין (מנגנון פעולה שונה). נפגע עלול להישאר מורדם גם לאחר מתן נלוקסון. נדרש טיפול רפואי מתקדם מיידי.'
                    : 'Medetomidine+fentanyl combination: naloxone only blocks fentanyl but has no effect on medetomidine (different mechanism). Casualty may remain sedated even after naloxone. Advanced medical care required immediately.'}
                </span>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[8px] text-gray-600 font-mono">60 {h ? 'שניות של חומ"ס' : 'Seconds HazMat'} | {h ? 'רועי צוקרמן' : 'Roie Zukerman'}</span>
                <span className="text-[9px] text-gray-600 font-mono">{h ? '\u2190 לחצו להפוך' : '\u2190 Click to flip'}</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
