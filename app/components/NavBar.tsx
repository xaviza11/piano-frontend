import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSongSelected } from "~/store";

const Navbar: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const { songSelected } = useSongSelected();

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
        <div className="flex justify-center items-center h-8 flex w-[100vw]">
          <div className="flex-shrink-0">
            <h1 className="text-white font-pacifico font-bold text-[2vw] ml-2">
              Musapp
            </h1>
          </div>

          <div className="flex-grow flex justify-center">
            <div className="space-x-2 text-white text-[1.3vw] font-pacifico">
              <Link
                to="/piano"
                className="px-3 py-2 rounded-md"
              >
                Piano
              </Link>
              <Link
                to={playerParam}
                className="px-3 py-2 rounded-md"
              >
                Piano Player
              </Link>
              <Link
                to="/search-songs"
                className="px-3 py-2 rounded-md"
              >
                Search Song
              </Link>
              <Link
                to="/upload-song"
                className="px-3 py-2 rounded-md"
              >
                Upload Song
              </Link>
            </div>
          </div>

          {userName ? (
            <div className="text-white text-[1.7vw] font-medium mr-2">
              Welcome, {userName}
            </div>
          ) : (
            <div className="space-x-2 text-white text-[1.7vw] mr-2 font-pacifico">
              <Link
                to="/signin"
                className="px-3 py-2 rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
