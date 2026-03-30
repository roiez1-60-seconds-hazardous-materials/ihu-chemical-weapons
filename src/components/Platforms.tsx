'use client';
import { motion } from 'framer-motion';
import { Bomb, Plane, Wind } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const platforms = [
  { icon: Bomb, color: 'red', he: { title: 'רימוני גז טקטיים', desc: 'רימונים נושאי מדטומידין (ABC-M7A2/A3) שפותחו בפרויקט הרתעה. מילוי 18 גרם, 40% מדטומידין. מחסניות MK 2 38mm. רימוני "אשכן" (RCA).', spec: 'ניטרול מיידי בשטח בנוי' }, en: { title: 'Tactical Gas Grenades', desc: 'Medetomidine-loaded grenades (ABC-M7A2/A3) from Project Deterrence. 18g fill, 40% medetomidine. MK 2 38mm cartridges. "Ashkan" RCA grenades.', spec: 'Immediate neutralization in urban terrain' } },
  { icon: Plane, color: 'blue', he: { title: 'חימוש נישא רחפנים', desc: 'מל"ט "ארבעין" — קואדקופטר VTOL של כוחות היבשה IRGC. מטען 7 ק"ג, טווח 10 ק"מ, שעת טיסה.', spec: 'מסירה מדויקת מהאוויר לעמדות אויב' }, en: { title: 'Drone-Carried Munitions', desc: '"Arbaeen" VTOL quadcopter by IRGC Ground Forces. 7kg payload, 10km range, 1hr flight time.', spec: 'Precision delivery from air to enemy positions' } },
  { icon: Wind, color: 'amber', he: { title: 'מערכות יצרני ערפל', desc: 'מערכות "מייצר ערפל" (Fog Generator) על משאיות. פיתוח קבוצת שהיד מייסמי.', spec: 'פיזור נפח גבוה של חומרים משתקים על שטח נרחב בזמן קצר' }, en: { title: 'Fog Generator Systems', desc: 'Vehicle-mounted Fog Generator systems. Developed by Shahid Meisami Group.', spec: 'High-volume dispersal of incapacitating agents over large area quickly' } },
];

export default function Platforms() {
  const { t, lang } = useLang();
  const colorMap: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
    red: { border: 'border-red-500/30', bg: 'bg-red-500/5', text: 'text-red-400', iconBg: 'bg-red-500/10' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-400', iconBg: 'bg-blue-500/10' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/5', text: 'text-amber-400', iconBg: 'bg-amber-500/10' },
  };

  return (
    <section id="platforms" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{t('platforms.title')}</h2>
        <p className="text-gray-400">{t('platforms.subtitle')}</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p, i) => {
          const Icon = p.icon;
          const c = colorMap[p.color];
          const d = lang === 'he' ? p.he : p.en;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.01, y: -3 }}
              className={`rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm p-6 flex flex-col`}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i }}
                className={`w-14 h-14 rounded-xl ${c.iconBg} ${c.border} border flex items-center justify-center mb-4`}
              >
                <Icon size={28} className={c.text} />
              </motion.div>
              <h3 className={`text-lg font-bold mb-2 ${c.text}`}>{d.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">{d.desc}</p>
              <div className={`text-[11px] font-semibold ${c.text} px-3 py-1.5 rounded-full ${c.iconBg} text-center`}>
                {d.spec}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
