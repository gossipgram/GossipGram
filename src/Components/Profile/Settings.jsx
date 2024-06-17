import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { MdArrowBack } from "react-icons/md";
import AccountPrivacy from '../Settings/AccountPrivacy';
// import EditProfile from '../../Pages/EditProfile';
import ChangeDp from './ChangeDp';
import EditUser from './EditUser';
import ChangePassword from './ChangePassword';
import DeleteUserProfile from './DeleteUserProfile';
import Likes from '../Settings/Likes';

const Settings = ({ setIsSetting , userData , setUserData }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const menuItems = [
    { index: 1, name: 'Edit Profile', component: 'EditProfile' },
    { index: 2, name: 'Notification', component: 'Notification' },
    { index: 3, name: 'Likes', component: 'Likes' },
    { index: 4, name: 'Muted Accounts', component: 'MutedAccounts' },
    { index: 5, name: 'Account Privacy', component: 'AccountPrivacy' },
    { index: 6, name: 'Blocked', component: 'Blocked' },
    { index: 7, name: 'Tags and Mentions', component: 'TagsAndMentions' },
    { index: 8, name: 'Comments', component: 'Comments' },
    { index: 9, name: 'Archived', component: 'Archived' },
    { index: 10, name: 'Restricted accounts', component: 'RestrictedAccounts' },
  ];

  const renderComponent = () => {
    switch (activeMenuItem) {
      case 'EditProfile':
        return (
          <div className="mx-auto w-11/12 max-w-[1000px] py-10 overflow-x-hidden p-10">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
            <ChangeDp userData={userData} />
            <EditUser userData={userData} />
            <ChangePassword />
            <DeleteUserProfile />
          </div>
        );
      case 'AccountPrivacy':
        return <AccountPrivacy userData={userData} setUserData={setUserData} />;
      case 'Likes':
        return <Likes userData={userData} setUserData={setUserData} />;
      default:
        return <div className="text-richblack-5 mx-auto mt-10"></div>;
    }
  };

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
        <div className="w-1/6 min-h-[calc(100vh-7rem)] overflow-y-scroll scrolling m-3">
          <div className="text-richblack-5 shadow-md rounded-md mt-1 bg-richblack-800">
            <ul>
              {menuItems.map(item => (
                <li
                  key={item.index}
                  className={`text-richblack-25 p-3 hover:bg-richblack-700 cursor-pointer transition-all duration-200 ${activeMenuItem === item.component ? ' font-extrabold' : ''}`}
                  onClick={() => setActiveMenuItem(item.component)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-5/6 max-h-[calc(100vh-7rem)] flex overflow-y-scroll scrolling m-3 mx-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
