import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import GroupUsers from './GroupUsers';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { renameGroup } from '../../services/operations/chatAPI';

const InfoChatUser = ({ handleShowInfo, userData, chatUser , showInfo , setUpdatedGroupName , updatedGroupName}) => {
  
  console.log('userData', userData);
  console.log('chatUser', chatUser);
  const token = localStorage.getItem("token").split('"')[1];
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
    console.log("userName",userName)
    userImage = currentUser.image;
    id = currentUser._id;
  }

  const [isRenameGroup, setIsRenameGroup] = useState(false)
  const [editedGroupName, setEditedGroupName] = useState(userName)

  const handleChangeGroupName = () => {
    setIsRenameGroup(true);
    // setIsMenuOpen(false);  
  };

  const renameCancel = () => {
    setIsRenameGroup(false)
  }

  const GroupNameChangeHandler = (event) => {
    setEditedGroupName(event.target.value);
  }

  const editSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {};
      data.chatName = editedGroupName;
      data.chatId = chatUser._id;

      const response = await renameGroup(data , token);
      console.log("response",response)
      setUpdatedGroupName(response.chatName)
      
    } catch (error) {
      alert("error while rename group");
      console.log(error);
    } finally {
      setIsRenameGroup(false);
    }
  }
  console.log("updatedGroupName",updatedGroupName)

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

        <div className='flex items-center'>
          {isRenameGroup ? 
          
            <div className='flex flex-col gap-3 items-center'>
              <input
                  className="bg-richblack-600 outline-none border-none rounded-lg text-lg text-richblack-50 px-5 py-2"
                  value={editedGroupName}
                  onChange={GroupNameChangeHandler}
                />
              <div className='flex flex-row gap-5'>
                <MdOutlineDone className="w-5 h-5 text-richblack-5 rounded-lg  hover:text-yellow-200 transition-all duration-200"
                onClick={editSubmit}
                />

                <RxCross2 
                onClick={renameCancel}
                className="w-5 h-5 text-richblack-5 rounded-lg  hover:text-yellow-200 transition-all duration-200"
                />
              </div>
                
            </div>
            :
            <>
              <h3 className="font-semibold text-richblack-5 text-2xl">
                {updatedGroupName ? updatedGroupName : userName}  
              </h3>
              {chatUser?.groupAdmin?.username === userUsername &&
                <MdDriveFileRenameOutline
                  className="w-5 h-5 text-yellow-300 cursor-pointer mt-3 hover:text-yellow-400"
                  onClick={handleChangeGroupName}
                />
              }
            </>
          }
        </div>

        
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
