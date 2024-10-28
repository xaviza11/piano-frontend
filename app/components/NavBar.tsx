import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Navbar: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cookies = new Cookies();
    setUserName(cookies.get('username'));
  }, []);

  return (
    <nav className="bg-blue-600 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white font-bold text-xl">MusicApp</h1>
          </div>

          <div className="flex-grow flex justify-center">
            <div className="hidden md:flex space-x-4">
              <Link to="/piano" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Piano
              </Link>
              <Link to="/player" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Piano Player
              </Link>
              <Link to="/search-song" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Search Song
              </Link>
              <Link to="/upload-song" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Upload Song
              </Link>
            </div>
          </div>

          {userName ? (
            <div className="text-white text-sm font-medium">
              Welcome, {userName}
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link to="/signin" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link to="/register" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
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
