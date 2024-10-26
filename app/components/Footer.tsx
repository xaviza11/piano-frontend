import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 w-full fixed bottom-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} MusicApp. All rights reserved.
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <ul className="flex space-x-4 justify-center md:justify-end">
              <li>
                <Link to="/about" className="text-sm hover:text-blue-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-blue-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-blue-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-blue-300">
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
