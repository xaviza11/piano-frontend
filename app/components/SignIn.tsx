import React, { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { useAlert } from '~/context/AlertContext';
import { authenticateUser } from '~/handlers/authenticate';
import Cookies from 'universal-cookie';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

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
    <div className="p-6 max-w-lg mx-auto bg-white border border-blue-400 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
