import React, { useEffect } from "react";
import Navbar from "../Components/GossipPartner/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import PartnerHome from "./PartnerHome";
import PartnerFind from "./PartnerFind";
import PartnerLandingPage from "./PartnerLandingPage";
import PartnerProfile from "./PartnerProfile";
import PartnerCredits from "./PartnerCredits";

const PartnerDefault = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("/");

  const pagesList = [
    {
      id: 1,
      title: "Home",
      pathname: "/gossip-partner",
    },
    {
      id: 2,
      title: "Find",
      pathname: "/gossip-partner/find",
    },
    {
      id: 3,
      title: "Profile",
      pathname: "/gossip-partner/profile",
    },
    {
      id: 4,
      title: "About",
      pathname: "/gossip-partner/about",
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    if (path === "/gossip-partner/credits") {
      setActiveSection("Credits");
    } else {
      const acitvePage = pagesList.find((page) => page.pathname === path);
      if (acitvePage) {
        setActiveSection(acitvePage.title);
      }
    }
  }, [location.pathname]);

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center mb-5">
        <Navbar pagesList={pagesList} />
      </div>
      <div className="w-full h-[90%]">
        {activeSection === "Home" && <PartnerHome />}
        {activeSection === "Find" && <PartnerFind />}
        {activeSection === "About" && <PartnerLandingPage />}
        {activeSection === "Profile" && <PartnerProfile />}
        {activeSection === "Credits" && <PartnerCredits />}
      </div>
    </div>
  );
};

export default PartnerDefault;
