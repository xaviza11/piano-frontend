import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const cookies = new Cookies();
  const [locale, setLocale] = useState<string>('en');
  const { t } = useTranslation('translation');

  useEffect(() => {
    const storedLocale = cookies.get("language");
    if (storedLocale) {
      setLocale(storedLocale);
      i18n.changeLanguage(storedLocale); 
    } else {
      const browserLanguage = navigator.language.slice(0, 2);
      const defaultLanguage = browserLanguage === 'es' ? 'es' : 'en';
      cookies.set("language", defaultLanguage, { path: "/", expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
      setLocale(defaultLanguage);
      i18n.changeLanguage(defaultLanguage);
    }
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    cookies.set("language", newLocale, { path: "/", expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
    setLocale(newLocale); 
    i18n.changeLanguage(newLocale); 
  };

  return (
    <footer className="bg-blue-600 text-white py-4 w-[100vw] fixed bottom-0 left-0 h-[1vh] flex items-center font-pacifico">
      <div className="mx-auto px-4 flex w-[100vw]">
        <div className="flex flex-row justify-between items-center w-[100vw]">
          <div className="text-center">
            <p className="text-[1.4vw]">
              &copy; {new Date().getFullYear()} {t('footer.text')}
            </p>
          </div>
          <div>
            <ul className="flex space-x-4 justify-center text-[1.2vw]">
              <li>
                <Link to="/about" className="hover:text-blue-300">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-300">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-300">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-300">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
          <select
            value={locale}
            onChange={handleLanguageChange}
            className="bg-blue-600 text-white rounded-md text-[1.8vh] font-bold"
          >
            <option value="en">{t('footer.en')}</option>
            <option value="es">{t('footer.es')}</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
