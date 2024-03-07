import React, { useState } from "react";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { TbMessage } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import Logo from "../../assets/GossipGram-logos_black.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import { logout } from "../../services/operations/authAPI";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

    // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  const currPath = location.pathname;
  return (
    <div className="">
      {currPath === "/home" ? (
        <div className="flex w-[350px] relative flex-col h-screen border-r-[1px] border-r-richblack-700 bg-richblack-900 py-1 ">
          <Link to="/home">
            <div className="flex items-center justify-center cursor-pointer">
              <img
                src={Logo}
                width={200}
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                className=""
                alt="logo"
              />
            </div>
          </Link>

          <Link to="/home">
            <div className="flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700  rounded-lg transition-all duration-200 cursor-pointer">
              <GoHomeFill fontSize={25} className="text-richblack-5" />
              <p className="text-xl text-white">Home</p>
            </div>
          </Link>
          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className="flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
            <GoSearch fontSize={25} className="text-richblack-5" />
            <p className="text-xl text-white">Search</p>
          </div>
          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/chat">
            <div className="flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
              <TbMessage fontSize={25} className="text-richblack-5" />
              <p className="text-xl text-white">Messages</p>
            </div>
          </Link>

          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/notification">
            <div className="flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
              <IoMdNotifications fontSize={25} className="text-richblack-5" />
              <p className="text-xl text-white">Notifications</p>
            </div>
          </Link>
          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/create">
            <div className="flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
              <CiCirclePlus fontSize={25} className="text-richblack-5" />
              <p className="text-xl text-white">Create</p>
            </div>
          </Link>
          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

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
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex flex-row absolute bottom-10 mt-52 px-10 py-3 mx-2  gap-3 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
              <MdOutlineLogout fontSize={25} className="text-richblack-5" />
              <p className="text-xl text-white">Log Out</p>
            </div>
          </button>
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

          {/* <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" /> */}
        </div>
      ) : (
        <div className="flex gap-10 relative flex-col w-32 h-screen border-r-[1px] border-r-richblack-700 bg-richblack-900 py-1 ">
          <Link to="/home">
            <div className="flex items-center justify-center cursor-pointer">
              <img
                src={Logo}
                width={200}
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                className=""
                alt=""
              />
            </div>
          </Link>
          <Link to="/home">
            <div className="flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer">
              <GoHomeFill fontSize={35} className="text-richblack-5" />
            </div>
          </Link>

          <div className="flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer">
            <GoSearch fontSize={35} className="text-richblack-5" />
          </div>
          <Link to="/chat">
            <div className="flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer">
              <TbMessage fontSize={35} className="text-richblack-5" />
            </div>
          </Link>

          <Link to="/notification">
            <div className="flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer">
              <IoMdNotifications fontSize={35} className="text-richblack-5" />
            </div>
          </Link>

          <Link to="/create">
            <div className="flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer">
              <CiCirclePlus fontSize={35} className="text-richblack-5" />
            </div>
          </Link>
          
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
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex w-[80%] absolute bottom-10 left-4 justify-center py-3 mx-auto mt-[200px] gap-3 hover:scale-110 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
              <MdOutlineLogout fontSize={35} className="text-richblack-5" />
            </div>
          </button>
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
