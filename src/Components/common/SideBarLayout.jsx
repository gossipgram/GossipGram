import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const SideBarLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isSideBar = () => {
    return (
      pathname === "/" ||
      pathname === "/verify-email" ||
      pathname === "/404" ||
      pathname === "/forgot-password" ||
      pathname === "/update-password" ||
      pathname.includes("/gossip-partner")
    ); //ADD MORE CONDITION HERE WHERE WE SHOULD NOT RENDER SIDEBAR
  };
  return (
    <div className="sticky ">
      {!isSideBar() && <Sidebar />}
      <div>{children}</div>
    </div>
  );
};

export default SideBarLayout;
