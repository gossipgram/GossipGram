import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" w-2/3 flex  h-14 items-center rounded-full  bg-richblack-700  text-white  mt-3">
      <div className="flex gap-10 items-center justify-center h-full mx-auto ">
        <Link
          to="/home"
          className="text-lg hover:text-yellow-400 transition-all duration-200 hover:scale-105"
        >
          Home
        </Link>

        <Link
          to="/home"
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
