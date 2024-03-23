import React, { useEffect, useState } from 'react';
import { FaVideo } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";

const MessageUser = ({ messages, userData, chatId }) => {
  const [currentChatId, setCurrentChatId] = useState(chatId);

  useEffect(() => {
    setCurrentChatId(chatId);
  }, [chatId]);

  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBb", currentChatId);

  const user = messages.length > 0 ? messages[0]?.chat?.users[1] : null;
  const userUsername = userData?.userDetails?.username;
  console.log(userUsername);

  const { username: userName, image: userImage } = messages[0]?.chat?.users.find(user => user.username !== userUsername) || {};

  console.log("userName", userName);
  console.log("userImage", userImage);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-richblack-700">
      <div className="flex items-center">
        <img src={userImage} loading='lazy' alt='' className="w-14 h-14 rounded-full mr-4" />
        <div className='flex flex-col'>
          <h3 className="font-semibold text-richblack-5 text-2xl">{userName}</h3>
          {/* active status  */}
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className='p-2 hover:bg-richblack-600 cursor-pointer transition-all duration-200'>
          <FaVideo className='w-10 h-10 text-white' />
        </div>
        <div className='p-2 hover:bg-richblack-600 cursor-pointer transition-all duration-200'>
          <MdAddIcCall className='w-10 h-10 text-white' />
        </div>
      </div>
    </div>
  );
}

export default MessageUser;
