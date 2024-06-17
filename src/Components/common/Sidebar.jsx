import React, { useEffect, useState } from "react";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { TbMessage } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import Logo from "../../assets/GossipGram-logos_black.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import { logout } from "../../services/operations/authAPI";
import { getAllUserData } from "../../services/operations/profileAPI";
import { BsArrowThroughHeart } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationDrawer from "../Notifications/NotificationDrawer";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currPath = location.pathname;

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [activeIcon, setActiveIcon] = useState(currPath.replace("/", ""));

  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("token").split('"')[1];
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUserData(token);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    const iconset = currPath.split("/")[1];
    setActiveIcon(iconset);
  }, [currPath]);

  const notificationHandler = async () => {
    console.log("inside noti handle");
    setActiveIcon("notification");
    setIsSideDrawerOpen((prevState) => !prevState);
  };

  return (
    <div className="sticky top-0">
      {currPath === "/home" && !isSideDrawerOpen ? (
        <div className="flex w-[350px] transition-all duration-500 ease-out relative flex-col h-screen border-r-[1px] border-r-richblack-700 bg-richblack-900 py-1 ">
          <Link to="/home">
            <div className="flex items-center justify-center cursor-pointer ">
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
            <div
              onClick={() => setActiveIcon("home")}
              className={`flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIcon === "home" ? "text-yellow-400" : "text-white"
              }`}
            >
              <GoHomeFill fontSize={25} className="" />
              <p className="text-xl ">Home</p>
            </div>
          </Link>
          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/search">
            <div
              onClick={() => setActiveIcon("search")}
              className={`flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIcon === "search" ? "text-yellow-400 " : "text-white"
              }`}
            >
              <GoSearch fontSize={25} className="" />
              <p className="text-xl ">Search</p>
            </div>
          </Link>

          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/create">
            <div
              onClick={() => setActiveIcon("create")}
              className={`flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIcon === "create" ? "text-yellow-400" : "text-white"
              }`}
            >
              <CiCirclePlus fontSize={25} className="" />
              <p className="text-xl ">Create</p>
            </div>
          </Link>
          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/chat">
            <div
              onClick={() => setActiveIcon("chat")}
              className={`flex flex-row px-10 py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIcon === "chat" ? "text-yellow-400" : "text-white"
              }`}
            >
              <TbMessage fontSize={25} className="" />
              <p className="text-xl">Messages</p>
            </div>
          </Link>

          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/gossip-partner/home">
            <div
              onClick={() => setActiveIcon("gossip-partner")}
              className={`flex flex-row px-10 items-center py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIcon === "gossip-partner"
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              <BsArrowThroughHeart fontSize={25} />
              <p className="text-xl ">Gossip Partner</p>
            </div>
          </Link>

          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          {/* <Link to="/"> */}
          <div
            onClick={notificationHandler}
            className={`flex flex-row px-10 items-center py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
              activeIcon === "notification" ? "text-yellow-400" : "text-white"
            }`}
          >
            <IoIosNotificationsOutline fontSize={25} />
            <p className="text-xl ">Notifications</p>
          </div>
          {isSideDrawerOpen && (
            <NotificationDrawer
              isOpen={isSideDrawerOpen}
              onClose={notificationHandler}
              userData={userData.userDetails}
            />
          )}
          {/* </Link> */}

          <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <Link to="/profile">
            <div
              onClick={() => setActiveIcon("profile")}
              className={`flex flex-row px-10 items-center py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIcon === "profile" ? "text-yellow-400" : "text-white"
              }`}
            >
              <img
                src={userData?.userDetails?.image}
                fontSize={25}
                className="w-8 h-8 rounded-full"
              />
              <p className="text-xl ">Profile</p>
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
            className=" ml-5 text-sm font-medium text-richblack-300 absolute bottom-14 w-[90%] mx-auto "
          >
            <div className="flex items-center  flex-row px-10 py-3  gap-3 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
              <MdOutlineLogout fontSize={25} className="text-richblack-5" />
              <p className="text-xl ">Log Out</p>
            </div>
          </button>
          {confirmationModal && (
            <ConfirmationModal
              modalData={confirmationModal}
              closeModal={() => setConfirmationModal(false)}
            />
          )}

          {/* <div className="mx-auto mt-3 mb-6 h-[1px] w-10/12 bg-richblack-700" /> */}
        </div>
      ) : (
        <div className="flex gap-10 transition-all ease-out duration-500 relative flex-col w-32 h-screen border-r-[1px] border-r-richblack-700 bg-richblack-900 py-1 ">
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
            <div
              onClick={() => setActiveIcon("home")}
              className={`flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer  ${
                activeIcon === "home" ? "text-yellow-400" : "text-white"
              }`}
            >
              <GoHomeFill fontSize={35} className="" />
            </div>
          </Link>

          <Link to="/search">
            <div
              onClick={() => setActiveIcon("search")}
              className={`flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer ${
                activeIcon === "search" ? "text-yellow-400" : "text-white"
              }`}
            >
              <GoSearch fontSize={35} className=" " />
            </div>
          </Link>

          <Link to="/create">
            <div
              onClick={() => setActiveIcon("create")}
              className={`flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer ${
                activeIcon === "create" ? "text-yellow-400" : "text-white"
              }`}
            >
              <CiCirclePlus fontSize={35} className="" />
            </div>
          </Link>

          <Link to="/chat">
            <div
              onClick={() => setActiveIcon("chat")}
              className={`flex w-[80%] justify-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer ${
                activeIcon === "chat" ? "text-yellow-400" : "text-white"
              }`}
            >
              <TbMessage fontSize={35} className="" />
            </div>
          </Link>

          <Link to="/gossip-partner/home">
            <div
              onClick={() => setActiveIcon("gossip-partner")}
              className={`flex flex-row px-10 items-center py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIcon === "gossip-partner"
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              <BsArrowThroughHeart fontSize={35} />
            </div>
          </Link>

          {/* <Link to="/gossip-partner"> */}
          <div
            onClick={notificationHandler}
            className={`flex flex-row px-10 items-center py-3 mx-2 gap-3 hover:bg-richblack-700 rounded-lg transition-all duration-200 cursor-pointer ${
              activeIcon === "notification" ? "text-yellow-400" : "text-white"
            }`}
          >
            <IoIosNotificationsOutline fontSize={35} />
          </div>
          {isSideDrawerOpen && (
            <NotificationDrawer
              isOpen={isSideDrawerOpen}
              onClose={notificationHandler}
              userData={userData.userDetails}
            />
          )}
          {/* </Link> */}

          <Link to="/profile">
            <div
              onClick={() => setActiveIcon("profile")}
              className={`flex w-[80%] justify-center items-center py-3 mx-2 gap-3 hover:bg-richblack-700 hover:scale-110 transition-all duration-200 rounded-lg cursor-pointer ${
                activeIcon === "profile" ? "text-yellow-400" : "text-white"
              }`}
            >
              <img
                src={userData?.userDetails?.image}
                fontSize={25}
                className="w-10 h-10 rounded-full"
              />
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
            className=" py-2 text-sm font-medium text-richblack-300 absolute bottom-14 w-[80%] mx-2"
          >
            <div className="flex justify-center py-3 gap-3 hover:scale-110 hover:bg-richblack-700 transition-all rounded-lg duration-200 cursor-pointer">
              <MdOutlineLogout fontSize={35} className="text-richblack-5" />
            </div>
          </button>
          {confirmationModal && (
            <ConfirmationModal
              modalData={confirmationModal}
              closeModal={() => setConfirmationModal(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
