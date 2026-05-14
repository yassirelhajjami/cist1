import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN', flag: '🇨🇦' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

const LanguageSwitcher = ({ scrolled }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = languages.find(l => l.code === i18n.language) || languages[0];

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('cist-lang', code);
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: scrolled ? '#f5f5f5' : 'rgba(255,255,255,0.15)',
          border: scrolled ? '1px solid #e0e0e0' : '1px solid rgba(255,255,255,0.3)',
          color: scrolled ? '#333' : '#fff',
          padding: '0.4rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>▼</span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 999 }}
          />
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            zIndex: 1000,
            minWidth: '120px',
          }}>
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.6rem 1rem',
                  background: i18n.language === lang.code ? '#FFF5F5' : 'transparent',
                  border: 'none',
                  color: i18n.language === lang.code ? '#D32F2F' : '#333',
                  fontWeight: i18n.language === lang.code ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (i18n.language !== lang.code) e.currentTarget.style.background = '#f9f9f9'; }}
                onMouseLeave={e => { if (i18n.language !== lang.code) e.currentTarget.style.background = 'transparent'; }}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
