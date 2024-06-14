import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { MdArrowBack } from "react-icons/md";
import AccountPrivacy from '../Settings/AccountPrivacy';

const Settings = ({ setIsSetting , userData , setUserData}) => {

  const [isAccountPrivacy, setIsAccountPrivacy] = useState(false)

  const menuItems = [
    { index: 1, name: 'Edit Profile', onClick: () => console.log('Profile clicked') },
    { index: 2, name: 'Notification', onClick: () => console.log('Remove clicked') },
    { index: 3, name: 'Likes', onClick: () => console.log('Make admin clicked') },
    { index: 4, name: 'Muted Accounts', onClick: () => console.log('Make admin clicked') },
    { index: 5, name: 'Account Privacy', onClick: () => setIsAccountPrivacy(true) },
    { index: 6, name: 'Blocked', onClick: () => console.log('Make admin clicked') },
    { index: 7, name: 'Tags and Mentions', onClick: () => console.log('Make admin clicked') },
    { index: 8, name: 'Comments', onClick: () => console.log('Make admin clicked') },
    { index: 9, name: 'Archived', onClick: () => console.log('Make admin clicked') },
    { index: 10, name: 'Restricted accounts', onClick: () => console.log('Make admin clicked') },
  ];

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center w-full gap-5">
        <button
          onClick={() => setIsSetting(false)}
          className="cursor-pointer rounded-full text-white p-2 text-3xl"
        >
          <MdArrowBack />
        </button>
        <p className="text-xl font-semibold text-richblack-5">Settings</p>
      </div>

      <div className="flex flex-row w-full gap-1">
        <div className="w-1/6 overflow-y-scroll scrolling m-3">
          <div className="text-richblack-5 shadow-md rounded-md mt-1 bg-richblack-800">
            <ul>
              {menuItems.map(item => (
                <li
                  key={item.index}
                  className="text-richblack-25 p-3 hover:bg-richblack-700 cursor-pointer transition-all duration-200"
                  onClick={item.onClick}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-5/6 h-full flex overflow-y-scroll scrolling m-3 mx-auto">
          {isAccountPrivacy && <AccountPrivacy userData={userData} setUserData={setUserData}/>
          }
        </div>
      </div>
    </div>
  );
}

export default Settings;
