import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 w-[100vw] fixed bottom-0 left-0 h-[1vh] flex items-center font-pacifico">
      <div className="mx-auto px-4 flex w-[100vw]">
        <div className="flex flex-row justify-between items-center w-[100vw]">
          <div className="text-center">
            <p className="text-[1.4vw]">
              &copy; {new Date().getFullYear()} MusicApp. All rights reserved.
            </p>
          </div>
          <div>
            <ul className="flex space-x-4 justify-center text-[1.2vw]">
              <li>
                <Link to="/about" className="hover:text-blue-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
