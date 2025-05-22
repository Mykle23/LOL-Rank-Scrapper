import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#0D1421] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-md">
            <span className="text-white font-bold">DT</span>
          </div>
          <h1 className="text-xl font-semibold text-white">Accounts Dashboard</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 