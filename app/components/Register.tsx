import React, { useState } from "react";
import { useAlert } from "~/context/AlertContext";
import { registerUser } from "~/handlers/registerUser";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { showAlert } = useAlert();

  const {t} = useTranslation('translation')

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userName || !email || !password || !confirmPassword) {
      showAlert("All the fields are required", "warning", true);
      return;
    }
    if (password !== confirmPassword) {
      showAlert("Passwords do not match", "warning", true);
      return;
    }

    try {
      await registerUser(userName, email, password);
      navigate("/signin");
    } catch (error: any) {
      showAlert(error.message, "warning", true);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg">
      <h2 className="text-[1.4rem] font-bold text-white mb-2 font-pacifico">{t('register.register')}</h2>

      <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 mb-4 space-y-4">
        <div className="w-full sm:w-1/2">
          <label
            className="block text-white text-[0.8rem] font-bold font-montserrat mb-2"
            htmlFor="userName"
          >
            {t('register.username')}
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={t('register.username')}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-black"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="block text-white text-[0.8rem] font-bold mb-2 font-montserrat"
            htmlFor="email"
          >
            {t('register.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('register.emailAddress')}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-black"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 mb-4 space-y-4">
        <div className="w-full sm:w-1/2">
          <label
            className="block text-white text-[0.8rem] font-bold mb-2 font-montserrat"
            htmlFor="password"
          >
            {t('register.password')}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('register.password')}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-black"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="block text-white text-[0.8rem] font-bold mb-2 font-montserrat"
            htmlFor="confirm-password"
          >
            {t('register.confirm')}
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('register.confirm')}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-black"
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 font-pacifico"
      >
        {t('register.register')}
      </button>
      </div>
    </div>
  );
};

export default Register;
