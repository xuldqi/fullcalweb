import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://fullcal.colletools.com'),
  title: 'FullCal - The Most Complete Online Calculator | colletools.com',
  description:
    'Free online calculators for finance, health, sports, utilities and more. Privacy-focused calculations performed locally in your browser. Part of colletools.com suite.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FullCal - Complete Online Calculator Suite',
    description:
      '45+ Free calculators for all your needs. Fast, private, and always available.',
    url: 'https://fullcal.colletools.com/',
    siteName: 'FullCal by colletools.com',
    type: 'website',
  },
};

const legacyScripts = [
  { src: '/js/i18n.js', strategy: 'beforeInteractive' },
  { src: '/js/main.js?v=20250928', strategy: 'beforeInteractive' },
  { src: '/js/calculators.js', strategy: 'beforeInteractive' },
  { src: '/js/calculator-implementations.js', strategy: 'beforeInteractive' },
  { src: '/js/tax-config.js', strategy: 'beforeInteractive' },
  { src: '/js/auto-tax-updater.js', strategy: 'beforeInteractive' },
  { src: '/js/test-suite.js', strategy: 'beforeInteractive' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
        {legacyScripts.map((script) => (
          <Script key={script.src} src={script.src} strategy={script.strategy} />
        ))}
      </body>
    </html>
  );
}
