import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center w-full justify-center h-screen flex-col">
      <h1 className="text-2xl text-richblack-5 font-semibold">
        404 Page Not Found
      </h1>
      <p className="text-xl text-richblack-25">
        The page you're looking for does not exist.
      </p>
      <Link to="/home">
        <button className="bg-yellow-100 text-richblack-900 rounded-lg text-lg px-7 py-3 mt-6 hover:bg-yellow-200">
          Return Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
