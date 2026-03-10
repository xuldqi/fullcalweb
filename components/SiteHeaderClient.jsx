'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import useSiteLanguage from './useSiteLanguage';

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
  { value: 'fr', label: 'Français' },
];

const headerLabels = {
  en: {
    home: 'Home',
    financeHub: 'Finance Hub',
    language: 'Language',
    region: 'Region',
    tagline: 'Finance, tax, salary, and regional calculators',
    global: 'Global / Global Hub',
  },
  zh: {
    home: '首页',
    financeHub: '金融中心',
    language: '语言',
    region: '地区',
    tagline: '金融、税务、薪资与地区计算器',
    global: '全球 / 全局中心',
  },
};

const regionOptions = [
  { value: '/finance', label: 'Global / Global Hub' },
  { value: '/salary/california-paycheck-calculator', label: 'US / California' },
  { value: '/salary/texas-paycheck-calculator', label: 'US / Texas' },
  { value: '/tax/uk-tax-calculator', label: 'UK' },
  { value: '/tax/canada-income-tax-calculator', label: 'Canada' },
  { value: '/tax/australia-tax-calculator', label: 'Australia' },
  { value: '/salary/germany-salary-calculator', label: 'Germany' },
];

export default function SiteHeaderClient() {
  const router = useRouter();
  const pathname = usePathname();
  const language = useSiteLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const labels = headerLabels[language] || headerLabels.en;

  const regionValue = useMemo(() => {
    const exact = regionOptions.find((option) => option.value === pathname);
    return exact ? exact.value : '/finance';
  }, [pathname]);

  useEffect(() => {
    const saved = window.localStorage.getItem('fullcal_language');
    const nextLanguage = saved || 'en';
    setSelectedLanguage(nextLanguage);

    if (window.i18n && typeof window.i18n.setLanguage === 'function') {
      // Default to English on first visit to keep shell and calculator language aligned.
      window.i18n.setLanguage(nextLanguage);
      if (!saved) {
        window.localStorage.setItem('fullcal_language', nextLanguage);
      }
    }
  }, []);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    setSelectedLanguage(nextLanguage);
    window.localStorage.setItem('fullcal_language', nextLanguage);
    if (window.i18n && typeof window.i18n.setLanguage === 'function') {
      window.i18n.setLanguage(nextLanguage);
    }
    window.dispatchEvent(new CustomEvent('fullcal-language-change', { detail: { language: nextLanguage } }));
  };

  const handleRegionChange = (event) => {
    const targetPath = event.target.value;
    if (targetPath && targetPath !== pathname) {
      router.push(targetPath);
    }
  };

  return (
    <header className="site-header">
      <div className="page-shell site-header-inner">
        <div className="site-branding">
          <Link href="/" className="site-logo-link">FullCal</Link>
          <p className="site-tagline">{labels.tagline}</p>
        </div>

        <nav className="site-nav-links" aria-label="Primary">
          <Link href="/" className="site-nav-link">{labels.home}</Link>
          <Link href="/finance" className="site-nav-link">{labels.financeHub}</Link>
        </nav>

        <div className="site-controls">
          <label className="site-control-field">
            <span>{labels.language}</span>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="site-control-field">
            <span>{labels.region}</span>
            <select value={regionValue} onChange={handleRegionChange}>
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value === '/finance' ? labels.global : option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </header>
  );
}
