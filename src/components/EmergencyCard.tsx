'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Syringe, Wind as WindIcon, Clock, Skull, Eye, Phone, Users } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function EmergencyCard() {
  const { lang } = useLang();
  const isHe = lang === 'he';
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
          {isHe ? 'כרטיס תגובת חירום' : 'Emergency Response Card'}
        </h2>
        <p className="text-gray-400 text-sm">
          {isHe ? 'לחצו להפוך • שמרו צילום מסך בטלפון' : 'Click to flip • Save a screenshot to your phone'}
        </p>
      </motion.div>

      {/* Card container */}
      <div className="perspective-1000 cursor-pointer" onClick={() => setFlipped(!flipped)} style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ══════ FRONT — Identification & Immediate Actions ══════ */}
          <div className="rounded-2xl overflow-hidden border-2 border-red-600/60" style={{ backfaceVisibility: 'hidden' }}>
            {/* Header bar */}
            <div className="bg-red-700 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-white" />
                <span className="text-white font-black text-sm tracking-wider">
                  {isHe ? 'אירוע טב"ק כימי — PBA' : 'CHEMICAL CBRN EVENT — PBA'}
                </span>
              </div>
              <span className="text-red-200 text-[10px] font-mono">ERG-PBA-2026</span>
            </div>

            <div className="bg-[#0e0e14] p-5 space-y-4">
              {/* IDENTIFY section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={14} className="text-amber-400" />
                  <span className="text-amber-400 text-xs font-black tracking-wider uppercase">
                    {isHe ? 'זהה — סימני אירוע PBA' : 'IDENTIFY — PBA Event Signs'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(isHe ? [
                    'נפגעים מאבדים הכרה בו-זמנית',
                    'אין ריח, אין צבע, אין עשן נראה',
                    'דיכוי נשימתי מהיר — נחירות, שפתיים כחולות',
                    'רימון/מכשיר לא מוכר בשטח',
                  ] : [
                    'Multiple casualties losing consciousness simultaneously',
                    'No smell, no color, no visible smoke',
                    'Rapid respiratory depression — snoring, blue lips',
                    'Unknown grenade/device at scene',
                  ]).map((sign, i) => (
                    <div key={i} className="flex items-start gap-1.5 bg-amber-500/5 border border-amber-500/15 rounded-lg px-2.5 py-2">
                      <span className="text-amber-400 text-[10px] mt-0.5 font-bold">{i + 1}</span>
                      <span className="text-[10px] text-gray-300 leading-relaxed">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IMMEDIATE ACTIONS */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={14} className="text-red-400" />
                  <span className="text-red-400 text-xs font-black tracking-wider uppercase">
                    {isHe ? 'פעל מיד' : 'IMMEDIATE ACTIONS'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {(isHe ? [
                    { action: 'הגנה עצמית — ציוד נשימתי מלא (SCBA). אין כניסה ללא מיגון!', color: '#ef4444' },
                    { action: 'ריחוק — פנה את האזור 100 מטר לפחות נגד כיוון הרוח', color: '#f59e0b' },
                    { action: 'נלוקסון — תן 2 מ"ג IM/IN לכל נפגע ללא הכרה. חזור כל 2-3 דקות', color: '#22c55e' },
                    { action: 'דווח — "אירוע טב"ק כימי חשוד PBA" + מספר נפגעים + כיוון רוח', color: '#3b82f6' },
                  ] : [
                    { action: 'Self-protection — full respiratory equipment (SCBA). Do not enter without PPE!', color: '#ef4444' },
                    { action: 'Evacuate — clear the area 100m minimum upwind', color: '#f59e0b' },
                    { action: 'Naloxone — administer 2mg IM/IN to each unconscious casualty. Repeat every 2-3 min', color: '#22c55e' },
                    { action: 'Report — "Suspected PBA chemical CBRN event" + casualty count + wind direction', color: '#3b82f6' },
                  ]).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-black text-xs" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                        {i + 1}
                      </div>
                      <span className="text-[11px] text-gray-200 leading-relaxed">{item.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flip hint */}
              <div className="text-center pt-1">
                <span className="text-[9px] text-gray-600 font-mono">
                  {isHe ? '← לחץ להפוך — נתוני חומרים ומרחקים →' : '← Click to flip — Agent data & distances →'}
                </span>
              </div>
            </div>
          </div>

          {/* ══════ BACK — Agent Data & Distances ══════ */}
          <div className="rounded-2xl overflow-hidden border-2 border-blue-600/60 absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            {/* Header */}
            <div className="bg-blue-800 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skull size={20} className="text-white" />
                <span className="text-white font-black text-sm tracking-wider">
                  {isHe ? 'נתוני חומרים ומרחקי ריחוק' : 'AGENT DATA & EVACUATION DISTANCES'}
                </span>
              </div>
              <span className="text-blue-200 text-[10px] font-mono">2/2</span>
            </div>

            <div className="bg-[#0e0e14] p-5 space-y-4">
              {/* Agent table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="border-b border-gray-700/30">
                      <th className="text-gray-500 text-start py-1.5 font-mono">{isHe ? 'חומר' : 'Agent'}</th>
                      <th className="text-gray-500 text-start py-1.5 font-mono">{isHe ? 'מינון קטלני' : 'Lethal Dose'}</th>
                      <th className="text-gray-500 text-start py-1.5 font-mono">{isHe ? 'נוגדן' : 'Antidote'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800/30">
                      <td className="py-1.5 text-red-400 font-bold">{isHe ? 'פנטניל' : 'Fentanyl'}</td>
                      <td className="py-1.5">~2 {isHe ? 'מ"ג' : 'mg'} (DEA)</td>
                      <td className="py-1.5 text-green-400">{isHe ? 'נלוקסון 2 מ"ג' : 'Naloxone 2mg'}</td>
                    </tr>
                    <tr className="border-b border-gray-800/30">
                      <td className="py-1.5 text-red-500 font-bold">{isHe ? 'קרפנטניל' : 'Carfentanil'}</td>
                      <td className="py-1.5">{isHe ? 'מיקרוגרמים' : 'Micrograms'} (×100)</td>
                      <td className="py-1.5 text-green-400">{isHe ? 'נלוקסון מנות גבוהות' : 'Naloxone high doses'}</td>
                    </tr>
                    <tr className="border-b border-gray-800/30">
                      <td className="py-1.5 text-amber-400 font-bold">{isHe ? 'מדטומידין' : 'Medetomidine'}</td>
                      <td className="py-1.5">{isHe ? 'לא פורסם' : 'Not published'}</td>
                      <td className="py-1.5 text-amber-400">{isHe ? 'אטיפמזול (לא זמין)' : 'Atipamezole (rare)'}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-purple-400 font-bold">{isHe ? 'אנלוגים' : 'Analogues'}</td>
                      <td className="py-1.5">{isHe ? 'משתנה' : 'Variable'}</td>
                      <td className="py-1.5 text-yellow-400">{isHe ? 'נלוקסון — יעילות חלקית' : 'Naloxone — partial'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Evacuation distances */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={14} className="text-amber-400" />
                  <span className="text-amber-400 text-xs font-black tracking-wider uppercase">
                    {isHe ? 'מרחקי ריחוק' : 'EVACUATION DISTANCES'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(isHe ? [
                    { label: 'רימון — חלל סגור', dist: '100 מ\'', color: '#ef4444' },
                    { label: 'רחפן — שטח פתוח', dist: '300 מ\'', color: '#3b82f6' },
                    { label: 'מייצר ערפל', dist: '500 מ\' נגד רוח', color: '#f59e0b' },
                  ] : [
                    { label: 'Grenade — enclosed', dist: '100m', color: '#ef4444' },
                    { label: 'Drone — open area', dist: '300m', color: '#3b82f6' },
                    { label: 'Fog generator', dist: '500m upwind', color: '#f59e0b' },
                  ]).map((d, i) => (
                    <div key={i} className="text-center p-2.5 rounded-lg" style={{ backgroundColor: `${d.color}08`, border: `1px solid ${d.color}20` }}>
                      <div className="font-mono font-black text-lg" style={{ color: d.color }}>{d.dist}</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">{d.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Naloxone protocol */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Syringe size={14} className="text-green-400" />
                  <span className="text-green-400 text-xs font-black tracking-wider uppercase">
                    {isHe ? 'פרוטוקול נלוקסון' : 'NALOXONE PROTOCOL'}
                  </span>
                </div>
                <div className="space-y-1">
                  {(isHe ? [
                    '2 מ"ג IM (תוך-שרירי) או IN (תוך-אפי) מיד',
                    'אם אין תגובה תוך 2-3 דקות — מנה נוספת',
                    'חשד לקרפנטניל — התחל עם 4 מ"ג, חזור על מנות',
                    'המשך מעקב — נלוקסון מתפרק מהר יותר מהחומר',
                  ] : [
                    '2mg IM (intramuscular) or IN (intranasal) immediately',
                    'No response in 2-3 min — administer additional dose',
                    'Suspected carfentanil — start with 4mg, repeat doses',
                    'Continue monitoring — naloxone wears off faster than agent',
                  ]).map((line, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-green-400 text-[10px] mt-0.5">•</span>
                      <span className="text-[10px] text-gray-300 leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning strip */}
              <div className="bg-red-500/8 border border-red-500/25 rounded-lg px-3 py-2 flex items-start gap-2">
                <AlertTriangle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-[10px] text-red-300 leading-relaxed">
                  {isHe
                    ? 'שילוב מדטומידין+פנטניל עלול לנטרל את הנלוקסון. בכל חשד לשילוב — דרוש טיפול רפואי מתקדם מיידי.'
                    : 'Medetomidine+fentanyl combination may neutralize naloxone. If combination suspected — advanced medical care required immediately.'}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[8px] text-gray-600 font-mono">60 {isHe ? 'שניות של חומ"ס' : 'Seconds HazMat'} | {isHe ? 'רועי צוקרמן' : 'Roie Zukerman'}</span>
                <span className="text-[9px] text-gray-600 font-mono">
                  {isHe ? '← לחץ להפוך' : '← Click to flip'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
