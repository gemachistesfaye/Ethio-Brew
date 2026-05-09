import React, { createContext, useState, useEffect, useCallback } from 'react';
import en from '../locales/en/common.json';
import am from '../locales/am/common.json';
import om from '../locales/om/common.json';

const translations = { en, am, om };

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('ethio_brew_lang') || 'en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('ethio_brew_lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((path, replacements = {}) => {
    const keys = path.split('.');
    let value = translations[language];

    for (const key of keys) {
      if (value[key] !== undefined) {
        value = value[key];
      } else {
        return path; // Fallback to path if key missing
      }
    }

    if (typeof value !== 'string') return path;

    // Handle replacements like {{percent}}
    Object.keys(replacements).forEach(key => {
      value = value.replace(`{{${key}}}`, replacements[key]);
    });

    return value;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
