import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { useState, useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

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

const Navbar = () => {
  const location = useLocation();
  const currPath = location.pathname;
  const [activeIcon, setActiveIcon] = useState(currPath.split("/")[2]);
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveIcon(currPath);
  }, [currPath]);

  return (
    <nav className=" w-2/3 flex  h-14 items-center justify-evenly rounded-full  bg-richblack-700  text-white  mt-3 ">
      <div className="ml-5">
        <Link
          to="/home"
          className=" hover:text-yellow-400 transition-all duration-200 text-3xl hover:scale-105"
        >
          <GoChevronLeft />
        </Link>
      </div>

      <div className="flex gap-16 items-center justify-center h-full mx-auto ">
        {pagesList.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <NavLink
              to={item.pathname}
              className={`text-xl ${
                activeIcon === item.pathname
                  ? "text-yellow-300"
                  : "text-richblack-25"
              } hover:text-yellow-400  transition-all duration-200 hover:scale-105`}
            >
              {item.title}
            </NavLink>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5 mr-5">
        <NavLink
          to={"/gossip-partner/credits"}
          className="bg-yellow-500 px-4 py-1 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-105"
        >
          0 Credits
        </NavLink>
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
          <ConfirmationModal
            modalData={confirmationModal}
            closeModal={() => setConfirmationModal(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
