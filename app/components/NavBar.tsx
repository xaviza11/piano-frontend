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
    <nav className="bg-blue-600 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white font-bold text-[2vw] ml-2">
              MusicApp
            </h1>
          </div>

          <div className="flex-grow flex justify-center">
            <div className="space-x-2 text-white text-[1.5vw]">
              <Link
                to="/piano"
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Piano
              </Link>
              <Link
                to={playerParam}
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Piano Player
              </Link>
              <Link
                to="/search-songs"
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Search Song
              </Link>
              <Link
                to="/upload-song"
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
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
            <div className="space-x-2 text-white text-[1.7vw] mr-2">
              <Link
                to="/signin"
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="hover:bg-blue-700 px-3 py-2 rounded-md"
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
