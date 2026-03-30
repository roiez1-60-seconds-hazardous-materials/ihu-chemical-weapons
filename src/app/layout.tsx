import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IHU Intelligence Report | דו"ח מודיעיני',
  description: 'Anatomy of a Threat: The IRGC Pharmaceutical Weapon Program',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Heebo:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0d0d1a] text-gray-200 antialiased" style={{ fontFamily: 'Heebo, Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
