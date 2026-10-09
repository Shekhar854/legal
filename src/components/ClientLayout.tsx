'use client';

import { ReactNode } from 'react';
import { LocaleProvider } from '@/contexts/LocaleContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerModal from '@/components/DisclaimerModal';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <DisclaimerModal />
      <Header />
      <div style={{ paddingTop: '72px' }}>
        {children}
      </div>
      <Footer />
    </LocaleProvider>
  );
}
