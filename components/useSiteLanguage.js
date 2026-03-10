'use client';

import { useEffect, useState } from 'react';

export function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const saved = window.localStorage.getItem('fullcal_language');
  return saved || 'en';
}

export default function useSiteLanguage() {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    const onLanguageChange = (event) => {
      const nextLanguage = event?.detail?.language || getInitialLanguage();
      setLanguage(nextLanguage || 'en');
    };

    const onStorage = (event) => {
      if (event.key === 'fullcal_language') {
        setLanguage(event.newValue || 'en');
      }
    };

    window.addEventListener('fullcal-language-change', onLanguageChange);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('fullcal-language-change', onLanguageChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return language || 'en';
}
