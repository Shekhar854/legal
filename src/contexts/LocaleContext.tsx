'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale, defaultLocale, t as translate } from '@/lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key: string) => key,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = useCallback(
    (key: string) => translate(key, locale),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
