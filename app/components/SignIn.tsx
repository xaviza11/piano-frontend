import React, { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { useAlert } from '~/context/AlertContext';
import { authenticateUser } from '~/handlers/authenticate';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const {t} = useTranslation('translation')

  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const cookies = new Cookies();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const existingUsername = cookies.get('username');
    const existingAccessToken = cookies.get('accessToken');
    if (typeof existingUsername === 'string' && typeof existingAccessToken === 'string') {
      showAlert("Session is already active.", "warning", true);
      return;
    }

    try {
      const response = await authenticateUser(email, password);
      const result = await response.json();

      const expires = new Date();
      expires.setDate(expires.getDate() + 7); 

      cookies.set('username', result.username, { path: '/', expires });
      cookies.set('accessToken', result.access_token, { path: '/', expires });
      cookies.set('accessTokenDate', result.date, { path: '/', expires });

      navigate("/");
    } catch (error: any) {
      showAlert(error.message, "warning", true);
    }

    setError(null);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg h-[70vh] flex flex-col justify-center">
      <h2 className="text-[1.4rem] font-bold text-white y-800 mb-2 font-pacifico">{t('signin.signIn')}</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2 font-montserrat" htmlFor="email">
          {t('signin.email')}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('signin.emailAddress')}
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2 font-montserrat" htmlFor="password">
          {t('signin.password')}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('signin.password')}
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white"
        />
      </div>

        <div className='flex justify-center w-full'>
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 font-pacifico"
      >
        {t('signin.signIn')}
      </button>
      </div>
    </div>
  );
};

export default SignIn;
