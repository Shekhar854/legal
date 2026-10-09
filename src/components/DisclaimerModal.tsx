'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

const CONSENT_KEY = 'legalarjun_disclaimer_v1';
const CONSENT_EXPIRY_DAYS = 30;

interface ConsentRecord {
  version: string;
  timestamp: string;
  expiry: string;
}

export default function DisclaimerModal() {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const agreeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const record: ConsentRecord = JSON.parse(stored);
        const now = new Date();
        const expiry = new Date(record.expiry);
        if (now < expiry) {
          return; // Consent still valid
        }
      } catch {
        // Invalid stored data, show modal
      }
    }
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      agreeButtonRef.current?.focus();
    }
  }, [isVisible]);

  // Trap focus inside modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isVisible || !modalRef.current) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAgree = () => {
    const now = new Date();
    const expiry = new Date(now.getTime() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const record: ConsentRecord = {
      version: 'v1',
      timestamp: now.toISOString(),
      expiry: expiry.toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    setIsVisible(false);
    document.body.style.overflow = '';
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-text"
    >
      <div ref={modalRef} className="modal-content" style={{ maxWidth: '640px' }}>
        {/* Seal / Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-primary-bg)' }}
          >
            <svg className="w-7 h-7" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        <h2
          id="disclaimer-title"
          className="text-2xl font-bold text-center mb-4"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}
        >
          {t('disclaimer.title')}
        </h2>

        <div
          id="disclaimer-text"
          className="text-sm leading-relaxed mb-6 p-4 rounded-lg"
          style={{ background: 'var(--color-section-bg)', color: 'var(--color-text)' }}
        >
          <p>{t('disclaimer.text')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
          <Link href="/disclaimer" className="underline" style={{ color: 'var(--color-primary)' }}>
            {t('disclaimer.readFull')}
          </Link>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <Link href="/privacy" className="underline" style={{ color: 'var(--color-primary)' }}>
            {t('disclaimer.privacyLink')}
          </Link>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <Link href="/terms" className="underline" style={{ color: 'var(--color-primary)' }}>
            {t('disclaimer.termsLink')}
          </Link>
        </div>

        {/* Acknowledgement checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer text-sm" style={{ color: 'var(--color-text)' }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-[var(--color-primary)]"
          />
          <span>
            I have read and understood the disclaimer, privacy policy, and terms of use. I acknowledge that this website provides general legal information and does not create an attorney-client relationship.
          </span>
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            ref={agreeButtonRef}
            onClick={handleAgree}
            disabled={!isChecked}
            className="btn btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {t('disclaimer.agree')}
          </button>
          <button
            onClick={handleDecline}
            className="btn btn-secondary flex-1 justify-center"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            {t('disclaimer.decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
