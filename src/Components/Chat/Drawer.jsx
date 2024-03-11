import React, { useState } from 'react';

const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="font-sans bg-gray-100">

      {/* Drawer Button */}
      <button onClick={toggleDrawer} className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-full">
        {isDrawerOpen ? 'Close Drawer' : 'Open Drawer'}
      </button>

      {/* Drawer Container */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto transition-transform duration-300 ease-in-out`}>

        {/* Drawer Content */}
        <div className="p-4">
          <h1 className="text-lg font-semibold mb-4">Drawer Content</h1>
          <p>Your drawer content goes here.</p>
        </div>

        {/* Close Button */}
        <button onClick={toggleDrawer} className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full">
          Close
        </button>

      </div>
    </div>
  );
};

export default Drawer;
