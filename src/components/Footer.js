import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center">
              <i className="fas fa-exchange-alt text-blue-500 text-2xl mr-2"></i>
              <span className="text-white text-xl font-bold">SkillSwap</span>
            </div>
            <p className="mt-4 text-gray-400">
              Exchange skills and knowledge with your community.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-gray-400 hover:text-blue-500">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-blue-500">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/skills/technology" className="text-gray-400 hover:text-blue-500">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/skills/arts" className="text-gray-400 hover:text-blue-500">
                  Arts & Crafts
                </Link>
              </li>
              <li>
                <Link to="/skills/language" className="text-gray-400 hover:text-blue-500">
                  Languages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <i className="fas fa-envelope mr-2"></i>
                support@skillswap.com
              </li>
              <li className="text-gray-400">
                <i className="fas fa-phone mr-2"></i>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;