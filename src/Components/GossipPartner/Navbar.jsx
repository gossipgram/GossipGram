import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { useState, useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const Navbar = () => {
  const location = useLocation();
  const currPath = location.pathname;
  const [activeIcon, setActiveIcon] = useState(currPath.split("/")[2]);
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const pagesList = [
    {
      id: 1,
      title: "Home",
    },
    {
      id: 2,
      title: "Find",
    },
    {
      id: 3,
      title: "Profile",
    },
    {
      id: 4,
      title: "About",
    },
  ];

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
        {pagesList.map((item) => (
          <div className="flex flex-col items-center">
            <button
              onClick={() => setActiveSection(item.title)}
              className="text-lg hover:text-yellow-400 transition-all duration-200 hover:scale-105"
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5 mr-5">
        <button
          onClick={() => setActiveSection("Credits")}
          className="bg-yellow-500 px-4 py-1 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-105"
        >
          0 Credits
        </button>
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="bg-richblack-600 px-4 py-1 rounded-full hover:bg-richblack-500 transition-all duration-200 hover:scale-105"
        >
          Logout
        </button>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
