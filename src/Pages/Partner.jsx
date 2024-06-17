import React from "react";
import Navbar from "../Components/GossipPartner/Navbar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Partner = () => {
  const { loading } = useSelector((state) => state.partner);
  if (loading) {
    return (
      <div className="w-full grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center min-h-[calc(100vh-3.5rem)]">
      <Navbar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Partner;
