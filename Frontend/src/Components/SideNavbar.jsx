import React, { useState } from 'react';
import profileImg from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

const SideNavbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`md:w-[20%] w-full bg-gray-800 h-full flex flex-col items-center py-6 shadow-lg md:relative ${
          isMenuOpen ? 'fixed z-50' : ' md:relative'
        }`}
      >
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden w-full flex justify-between items-center px-4">
          <h2 className="text-xl text-white font-semibold">Institute 360</h2>
          <button className="text-white text-2xl" onClick={toggleMenu}>
            <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Profile Section */}
        <div
          className={`flex flex-col items-center mb-10 md:block ${
            isMenuOpen ? 'block' : 'hidden'
          } md:relative absolute bg-gray-800 w-full md:w-auto`}
        >
          <div className="w-20 h-20 border border-green-600 rounded-full overflow-hidden mb-4 mx-auto">
            <img className="w-full h-full object-cover" src={profileImg} alt="Profile" />
          </div>
          <h2 className="text-xl text-white font-semibold md:block hidden">Institute 360</h2>
          <p className="text-sm text-gray-400 md:block hidden">Empowering Education</p>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-col gap-5 w-full px-4 md:h-auto h-[calc(100vh-80px)]  ${
            isMenuOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <Link
            to="/dashboard"
            onClick={handleLinkClick}
            className={`flex items-center text-lg p-3 rounded-md transition-colors duration-300 ${
              location.pathname === '/dashboard'
                ? 'text-gray-100 hover:text-white bg-green-700 hover:bg-green-900'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="fa-solid fa-house mr-3"></i> Home
          </Link>
          <Link
            to="/dashboard/all-courses"
            onClick={handleLinkClick}
            className={`flex items-center text-lg p-3 rounded-md transition-colors duration-300 ${
              location.pathname === '/dashboard/all-courses'
                ? 'text-gray-100 hover:text-white bg-green-700 hover:bg-green-900'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="fa-solid fa-book mr-3"></i> All Courses
          </Link>
          <Link
            to="/dashboard/add-courses"
            onClick={handleLinkClick}
            className={`flex items-center text-lg p-3 rounded-md transition-colors duration-300 ${
              location.pathname === '/dashboard/add-courses'
                ? 'text-gray-100 hover:text-white bg-green-700 hover:bg-green-900'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="fa-solid fa-plus mr-3"></i> Add Courses
          </Link>
          <Link
            to="/dashboard/all-students"
            onClick={handleLinkClick}
            className={`flex items-center text-lg p-3 rounded-md transition-colors duration-300 ${
              location.pathname === '/dashboard/all-students'
                ? 'text-gray-100 hover:text-white bg-green-700 hover:bg-green-900'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="fa-solid fa-users mr-3"></i> All Students
          </Link>
          <Link
            to="/dashboard/add-students"
            onClick={handleLinkClick}
            className={`flex items-center text-lg p-3 rounded-md transition-colors duration-300 ${
              location.pathname === '/dashboard/add-students'
                ? 'text-gray-100 hover:text-white bg-green-700 hover:bg-green-900'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="fa-solid fa-user-plus mr-3"></i> Add Students
          </Link>
          <Link
            to="/dashboard/collect-payment"
            onClick={handleLinkClick}
            className={`flex items-center text-lg p-3 rounded-md transition-colors duration-300 ${
              location.pathname === '/dashboard/collect-payment'
                ? 'text-gray-100 hover:text-white bg-green-700 hover:bg-green-900'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="fa-solid fa-dollar-sign mr-3"></i> Collect Fees
          </Link>
          <Link
            to="/dashboard/payment-history"
            onClick={handleLinkClick}
            className={`flex items-center text-lg p-3 rounded-md transition-colors duration-300 ${
              location.pathname === '/dashboard/payment-history'
                ? 'text-gray-100 hover:text-white bg-green-700 hover:bg-green-900'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="fa-solid fa-file-invoice-dollar mr-3"></i> Payment History
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default SideNavbar;
