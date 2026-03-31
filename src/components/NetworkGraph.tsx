'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

interface NodeData {
  id: string;
  x: number; y: number;
  r: number;
  color: string;
  glow: string;
  he: { label: string; role: string; detail: string };
  en: { label: string; role: string; detail: string };
}

const nodes: NodeData[] = [
  { id: 'ihu', x: 300, y: 100, r: 38, color: '#3b82f6', glow: '#3b82f680',
    he: { label: 'IHU', role: 'מו"פ מרכזי', detail: 'אוניברסיטת אימאם חוסיין — המוסד האקדמי היחיד של משמרות המהפכה. מרכז הפיתוח של PBAs כולל סינתזת פנטניל, מדטומידין ונגזרותיהם. 25 פקולטות, 78 מרכזי מדע וטכנולוגיה.' },
    en: { label: 'IHU', role: 'Central R&D', detail: 'Imam Hossein University — IRGC\'s sole academic institution. PBA development hub including fentanyl, medetomidine synthesis. 25 faculties, 78 S&T centers.' } },
  { id: 'spnd', x: 150, y: 220, r: 30, color: '#a855f7', glow: '#a855f780',
    he: { label: 'SPND', role: 'פיקוח ומימון', detail: 'ארגון חדשנות ומחקר ביטחוני. תיאום בין IHU לגורמי ייצור. ניהל את תוכנית הנשק הגרעיני ומנהל תוכניות נשק כימי. ראשו לשעבר: מוחסן פקריזאדה.' },
    en: { label: 'SPND', role: 'Oversight & Funding', detail: 'Organization of Defensive Innovation and Research. Coordinates IHU with production entities. Formerly led by Mohsen Fakhrizadeh. Manages CW & nuclear programs.' } },
  { id: 'meisami', x: 480, y: 220, r: 28, color: '#f59e0b', glow: '#f59e0b80',
    he: { label: 'שהיד מייסמי', role: 'ייצור', detail: 'קבוצת שהיד מייסמי — מתקן ייצור רימונים, מערכות פיזור ומייצרי ערפל. מופעל על ידי משרד ההגנה. הושמד בתקיפה ב-2025.' },
    en: { label: 'Shahid Meisami', role: 'Manufacturing', detail: 'Shahid Meisami Group — grenade, dispersal system & fog generator production. Operated by MoD. Destroyed in 2025 strikes.' } },
  { id: 'hezb', x: 300, y: 350, r: 32, color: '#ef4444', glow: '#ef444480',
    he: { label: 'חיזבאללה', role: 'שימוש מבצעי', detail: 'מקבל נשק כימי מוכן מאיראן. מיליציות פרוקסי נוספות בעיראק, תימן וסוריה. הדרכת מפעילי רחפנים בוצעה ב-IHU. פריסה טקטית: חטיפות, פשיטות גבול.' },
    en: { label: 'Hezbollah', role: 'Operational Use', detail: 'Receives ready-made CW from Iran. Additional proxy militias in Iraq, Yemen, Syria. IHU trained drone operators. Tactical deployment: abductions, border raids.' } },
  { id: 'china', x: 80, y: 100, r: 22, color: '#6366f1', glow: '#6366f180',
    he: { label: 'ספקי סין', role: 'חומרי גלם', detail: 'ב-2014, מחלקת הכימיה של IHU ביקשה לרכוש כמויות קילוגרם של מדטומידין מספקים סיניים. סין מספקת פרקורסורים כימיים נוספים.' },
    en: { label: 'China Suppliers', role: 'Precursors', detail: 'In 2014, IHU chemistry dept sought kg quantities of medetomidine from Chinese suppliers. China provides additional chemical precursors.' } },
  { id: 'vira', x: 520, y: 100, r: 20, color: '#14b8a6', glow: '#14b8a680',
    he: { label: 'מעבדות וירא', role: 'מעבדה כימית', detail: 'מעבדות כימיות של משרד ההגנה. 4,000+ עובדים. מאחסנים חומרים כימיים ומבצעים מחקר שוטף.' },
    en: { label: 'Vira Labs', role: 'Chemical Lab', detail: 'MoD chemical laboratories. 4,000+ employees. Chemical storage and ongoing research facility.' } },
  { id: 'parchin', x: 150, y: 350, r: 22, color: '#f97316', glow: '#f9731680',
    he: { label: 'פרצ\'ין', role: 'מפעל נשק', detail: 'תעשיות כימיות פרצ\'ין — דרום טהראן. מתקני אחסון וציוד זכוכית לייצור גז עצבים קטלני.' },
    en: { label: 'Parchin', role: 'Arms Factory', detail: 'Parchin Chemical Industries — south Tehran. Storage and glass equipment for lethal nerve gas production.' } },
  { id: 'fakhri', x: 480, y: 350, r: 20, color: '#ec4899', glow: '#ec489980',
    he: { label: 'פקריזאדה', role: 'מנהיג מדעי', detail: 'מוחסן פקריזאדה — "אבי התוכנית הגרעינית". הרצה פיזיקה שבועית ב-IHU. ראש SPND. חוסל נובמבר 2020.' },
    en: { label: 'Fakhrizadeh', role: 'Scientific Lead', detail: 'Mohsen Fakhrizadeh — "Father of nuclear program." Lectured weekly at IHU. Head of SPND. Assassinated Nov 2020.' } },
];

const edges: { from: string; to: string; type: 'knowledge' | 'material' | 'funding' | 'command'; label?: { he: string; en: string } }[] = [
  { from: 'ihu', to: 'spnd', type: 'command', label: { he: 'פיקוח', en: 'oversight' } },
  { from: 'ihu', to: 'meisami', type: 'knowledge', label: { he: 'נוסחאות', en: 'formulas' } },
  { from: 'ihu', to: 'vira', type: 'knowledge', label: { he: 'מחקר משותף', en: 'joint research' } },
  { from: 'spnd', to: 'meisami', type: 'funding', label: { he: 'מימון', en: 'funding' } },
  { from: 'spnd', to: 'hezb', type: 'command', label: { he: 'פקודה', en: 'command' } },
  { from: 'meisami', to: 'hezb', type: 'material', label: { he: 'נשק מוכן', en: 'ready weapons' } },
  { from: 'china', to: 'ihu', type: 'material', label: { he: 'פרקורסורים', en: 'precursors' } },
  { from: 'parchin', to: 'meisami', type: 'material', label: { he: 'חומרים', en: 'materials' } },
  { from: 'fakhri', to: 'ihu', type: 'knowledge', label: { he: 'הנחייה', en: 'direction' } },
  { from: 'fakhri', to: 'spnd', type: 'command', label: { he: 'ניהול', en: 'management' } },
];

const edgeColors: Record<string, string> = {
  knowledge: '#3b82f6',
  material: '#f59e0b',
  funding: '#a855f7',
  command: '#ef4444',
};

function getNodeById(id: string) { return nodes.find(n => n.id === id)!; }

export default function NetworkGraph() {
  const { lang } = useLang();
  const isHe = lang === 'he';
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const selected = selectedNode ? getNodeById(selectedNode) : null;

  return (
    <section id="network" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
          {isHe ? 'רשת הקשרים' : 'Connection Network'}
        </h2>
        <p className="text-gray-400 text-sm">
          {isHe ? 'לחצו על צומת כדי לחשוף מידע מפורט' : 'Click a node to reveal detailed information'}
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* SVG Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-gray-700/40 bg-[#0a0a14] overflow-hidden"
        >
          <svg viewBox="0 0 600 430" className="w-full" xmlns="http://www.w3.org/2000/svg">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="600" height="430" fill="url(#grid)" />

            {/* Edges */}
            {edges.map((edge, i) => {
              const from = getNodeById(edge.from);
              const to = getNodeById(edge.to);
              const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to || selectedNode === edge.from || selectedNode === edge.to;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;
              return (
                <g key={i}>
                  <motion.line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={edgeColors[edge.type]}
                    strokeWidth={isHighlighted ? 2 : 0.8}
                    opacity={isHighlighted ? 0.7 : 0.15}
                    strokeDasharray={edge.type === 'funding' ? '6 4' : edge.type === 'command' ? '0' : '3 3'}
                    animate={{ opacity: isHighlighted ? [0.5, 0.8, 0.5] : 0.15 }}
                    transition={isHighlighted ? { duration: 1.5, repeat: Infinity } : {}}
                  />
                  {isHighlighted && edge.label && (
                    <text x={midX} y={midY - 6} textAnchor="middle" fill={edgeColors[edge.type]} fontSize="8" fontFamily="monospace" opacity="0.7">
                      {isHe ? edge.label.he : edge.label.en}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const data = isHe ? node.he : node.en;
              const isActive = hoveredNode === node.id || selectedNode === node.id;
              return (
                <g key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(prev => prev === node.id ? null : node.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Glow */}
                  {isActive && (
                    <motion.circle
                      cx={node.x} cy={node.y} r={node.r + 8}
                      fill="none" stroke={node.color} strokeWidth="1"
                      opacity={0.4}
                      animate={{ r: [node.r + 6, node.r + 12, node.r + 6], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  {/* Circle */}
                  <circle cx={node.x} cy={node.y} r={node.r}
                    fill={`${node.color}15`} stroke={node.color}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={isActive ? 1 : 0.7}
                  />
                  {/* Label */}
                  <text x={node.x} y={node.y - 4} textAnchor="middle" fill="white" fontSize={node.r > 25 ? "12" : "9"} fontWeight="bold" fontFamily="monospace">
                    {data.label}
                  </text>
                  {/* Role */}
                  <text x={node.x} y={node.y + 10} textAnchor="middle" fill={node.color} fontSize="7" fontFamily="monospace">
                    {data.role}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {[
            { type: 'command', he: 'פיקוד', en: 'Command', dash: '' },
            { type: 'knowledge', he: 'ידע', en: 'Knowledge', dash: '3 3' },
            { type: 'material', he: 'חומרים', en: 'Materials', dash: '3 3' },
            { type: 'funding', he: 'מימון', en: 'Funding', dash: '6 4' },
          ].map((leg) => (
            <div key={leg.type} className="flex items-center gap-2">
              <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke={edgeColors[leg.type]} strokeWidth="2" strokeDasharray={leg.dash} /></svg>
              <span className="text-[10px] text-gray-500">{isHe ? leg.he : leg.en}</span>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mt-4 p-5 rounded-2xl border bg-gray-900/80 backdrop-blur-sm"
              style={{ borderColor: `${selected.color}40` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selected.color }} />
                  <span className="font-bold text-white">{isHe ? selected.he.label : selected.en.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: selected.color, backgroundColor: `${selected.color}15`, border: `1px solid ${selected.color}30` }}>
                    {isHe ? selected.he.role : selected.en.role}
                  </span>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white">
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isHe ? selected.he.detail : selected.en.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
