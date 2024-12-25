import React from 'react';
import SideNavbar from './SideNavbar';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="bg-gray-100 w-full h-screen flex flex-col lg:flex-row justify-center items-center">
      <div className="bg-white w-full lg:w-[95%] h-full lg:h-[95%] rounded-lg flex flex-col lg:flex-row shadow-lg overflow-hidden">
        {/* Side Navbar */}
        <SideNavbar />

        {/* Main Content Area */}
        <div className="w-full lg:w-[80%] bg-gray-50 h-full flex flex-col">
          {/* Header Section */}
          <div className="w-full bg-white h-[10vh] flex justify-between items-center shadow-md px-4 sm:px-6">
            {/* Profile Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={localStorage.getItem('image')}
                  alt="Profile"
                />
              </div>
              <div>
                <h1 className="text-sm sm:text-xl font-semibold text-gray-700">
                  {localStorage.getItem('name')}
                </h1>
              </div>
            </div>

            {/* Logout Button */}
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-auto">
            <Outlet /> {/* Render child routes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
