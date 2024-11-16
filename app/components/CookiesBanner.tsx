// app/components/CookieConsent.tsx
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

const CookieConsent: React.FC = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const {t} = useTranslation('translation')

  useEffect(() => {
    const cookies = new Cookies();
    const areAccepted = cookies.get('cookiesAccepted');
    if (areAccepted !== true) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const cookies = new Cookies();
    cookies.set('cookiesAccepted', 'true', { path: '/' });
    setIsBannerVisible(false);
  };

  if (isBannerVisible === false) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-white w-80 border border-green-400 text-center">
        <p className="text-sm mb-4">
          {t('cookies.banner')}
        </p>
        <div className="flex justify-center">
          <button 
            onClick={handleAccept} 
            className="px-4 py-2 bg-green-400 border border-green-600 hover:bg-gray-700 rounded text-white text-sm"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
