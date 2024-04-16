import React, { useEffect, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import GroupUsers from './GroupUsers';

const InfoChatUser = ({ handleShowInfo, userData, chatUser , showInfo}) => {

  console.log('userData', userData);
  console.log('chatUser', chatUser);
  const isGroup = chatUser.isGroupChat
  const userUsername = userData?.userDetails?.username;
  let userName, userImage, id;

  if (chatUser.isGroupChat) {
    userName = chatUser.chatName;
    userImage = chatUser.groupImage;
    id = chatUser._id;
  } else {
    const currentUser = chatUser.users.find((user) => user.username !== userUsername);
    userName = currentUser.username;
    userImage = currentUser.image;
    id = currentUser._id;
  }

  return (
    <div className={`flex flex-col fixed top-0 right-0 h-full w-[27%] bg-richblack-700 text-white p-4 m-10 transition-transform duration-300 transform ${showInfo ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-yellow-300 text-2xl mt-5">{isGroup ? "Group Info" : "User Info"}</h1>
        <RxCross2
          className="w-10 h-10 text-white mt-4 cursor-pointer"
          onClick={handleShowInfo}
        />
      </div>

      <div className='flex flex-col w-full m-1 mt-10 border items-center justify-center gap-3 border-yellow-500 p-3'>
        <img
          src={userImage}
          alt={``}
          className="aspect-square w-40 rounded-full object-cover"
        />
        <h3 className="font-semibold text-richblack-5 text-2xl">
          {userName}
        </h3>
        {isGroup && 
        <p className="text-richblack-200 text-lg">
          Group- <span className='text-yellow-400'>{chatUser.users.length}</span> members
        </p>
        }
        
      </div>
      {
        isGroup &&
        <div className='flex flex-col w-full m-1 mt-10 border gap-3 border-yellow-500 p-3'>
          <p className="text-richblack-200 text-lg"><span className='text-yellow-400'>{chatUser.users.length}</span> members</p>

          {chatUser.users.map((user) => (
            <GroupUsers key={user._id} infoUserName={user.username} infoUserImage={user.image} adminId={chatUser.groupAdmin.username}/>
          ))}

        </div>
      }
      
    </div>

  );
};

export default InfoChatUser;
