import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { removeFromGroup } from '../../services/operations/chatAPI';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const GroupUsers = ({ infoUserImage, infoUserName, adminUsername, id, chatId , setChatUser , chatUser , userData}) => {
  console.log("infoUserName",infoUserName);
  console.log("adminUsername",adminUsername)
  const token = localStorage.getItem("token").split('"')[1];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      const data = {};
      data.userId = id;
      data.chatId = chatId;

      const response = await removeFromGroup(data, token);
      setChatUser(response);

    } catch (error) {
      alert("error while removing user from group");
      console.log(error);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const clickHandle = (id) => {
    if (id) {
      navigate(`/user/${id}`);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full flex items-center p-4 border-b border-yellow-500 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-all duration-200"
      >
        <img src={infoUserImage} alt="" className="w-10 h-10 rounded-full mr-4" />
        <div className="w-full flex justify-between">
          <h3 className="font-semibold text-richblack-5 text-lg">{infoUserName}</h3>
          {adminUsername.includes(infoUserName) ? (
            <p className="text-yellow-400 text-md">Admin</p>
          ) : (
            <MdKeyboardArrowDown className="w-5 h-5 text-white mt-4 cursor-pointer" onClick={toggleDropdown} />
          )}
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 top-10 right-0 w-4/12 text-richblack-5 shadow-md rounded-md mt-1 bg-richblack-700 ">
          {/* Dropdown content */}
          <ul>
            <li className='text-richblack-25 bg-richblack-700 p-3 hover:bg-richblack-600 cursor-pointer transition-all duration-200' onClick={() => clickHandle(id)}>profile</li>
            {adminUsername.includes(userData.userDetails.username) && (
              <li className='text-richblack-25 bg-richblack-700 p-3 hover:bg-richblack-600 cursor-pointer transition-all duration-200' onClick={() => handleRemoveUser(id)}>
                remove
              </li>
            )}
            {adminUsername.includes(userData.userDetails.username) && (
              <li className='text-richblack-25 bg-richblack-700 p-3 hover:bg-richblack-600 cursor-pointer transition-all duration-200'>
                Make admin
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupUsers;
