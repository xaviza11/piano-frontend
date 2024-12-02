import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSongSelected } from "~/store";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const { songSelected } = useSongSelected();

  const {t} = useTranslation()

  let playerParam;

  if (songSelected) playerParam = `/player/${songSelected.id}`;
  else playerParam = `/player/none`;

  useEffect(() => {
    const cookies = new Cookies();
    setUserName(cookies.get("username"));
  }, []);

  return (
    <nav className="bg-blue-600 shadow-lg fixed top-0 w-full z-50 h-[8vh] sm:h-[7vh] flex justify-center">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="flex justify-center items-center h-8 flex w-[100vw] portrait:w-[90vw]">
          <div className="flex-shrink-0">
            <h1 className="text-white font-pacifico font-bold text-[2vw] ml-2 portrait:hidden">
              {t('navbar.title')}
            </h1>
          </div>

          <div className="flex-grow flex justify-center">
            <div className="space-x-2 text-white text-[1.3vw] font-pacifico portrait:text-[1.3vw] portrait:space-x-1">
              <Link
                to="/piano"
                className="px-3 py-2 rounded-md"
              >
                {t('navbar.piano')}
              </Link>
              <Link
                to={playerParam}
                className="px-3 py-2 rounded-md"
              >
                {t('navbar.player')}
              </Link>
              <Link
                to="/search-songs"
                className="px-3 py-2 rounded-md"
              >
                {t('navbar.search')}
              </Link>
              <Link
                to="/upload-song"
                className="px-3 py-2 rounded-md"
              >
                {t('navbar.upload')}
              </Link>
            </div>
          </div>

          {userName ? (
            <div className="text-white text-[1.7vw] font-medium mr-2">
              {t('navbar.welcome')}, {userName}
            </div>
          ) : (
            <div className="space-x-2 text-white text-[1.7vw] mr-2 font-pacifico portrait:text-[0.8vw] portrait:space-x-1">
              <Link
                to="/signin"
                className="px-3 py-2 rounded-md"
              >
               {t('navbar.signIn')}
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded-md"
              >
                {t('navbar.register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
