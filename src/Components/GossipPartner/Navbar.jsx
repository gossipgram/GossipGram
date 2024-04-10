import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const currPath = location.pathname;
  const [activeIcon, setActiveIcon] = useState(currPath.split("/")[2]);

  useEffect(() => {
    const iconset = currPath.split("/")[2];
    setActiveIcon(iconset);
  }, [currPath]);

  return (
    <nav className=" w-2/3 flex  h-14 items-center justify-evenly rounded-full  bg-richblack-700  text-white  mt-3">
      <div className="ml-5">
        <Link
          to="/home"
          className=" hover:text-yellow-400 transition-all duration-200 text-3xl hover:scale-105"
        >
          <GoChevronLeft />
        </Link>
      </div>
      <div className="flex gap-10 items-center justify-center h-full mx-auto ">
        <Link
          to="/"
          className="text-lg hover:text-yellow-400 transition-all duration-200 hover:scale-105"
        >
          Gossip
        </Link>

        <Link
          to="/home"
          className="text-lg hover:text-yellow-400 transition-all duration-200 hover:scale-105"
        >
          Profile
        </Link>

        <Link
          to="/home"
          className="text-lg hover:text-yellow-400 transition-all duration-200 hover:scale-105"
        >
          Home
        </Link>
      </div>

      <div className="flex items-center gap-5 mr-5">
        <button className="bg-yellow-500 px-4 py-1 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-105">
          0 Credits
        </button>
        <button className="bg-richblack-600 px-4 py-1 rounded-full hover:bg-richblack-500 transition-all duration-200 hover:scale-105">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
