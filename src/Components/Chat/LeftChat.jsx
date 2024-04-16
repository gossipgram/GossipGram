import React from 'react';

const LeftChat = ({ message, time }) => {
  const senderUsername = message.chat.isGroupChat ? message.sender.username : message.sender.username;
  const senderImage = message.chat.isGroupChat ? message.sender.image : message.sender.image;

  return (
    <div className="flex">
      {message.chat.isGroupChat && (
          <img src={senderImage} alt={senderUsername} className="w-8 h-8 rounded-full mr-2" />
        )}
        <div className="flex flex-col bg-richblack-700 p-3 rounded-lg shadow-md mb-2 max-w-[40rem]">
          <div className="flex flex-col">
            {message.chat.isGroupChat && (
              <h className={"text-yellow-200"}>~{message.sender.username}</h>
            )}
            <div className='flex'>
              <p className="text-richblack-5 max-w-[34rem]">{message.content}</p>
              <p className='text-richblack-100 text-xs flex justify-end items-end ml-2'>{time}</p>
            </div>
            
          </div>
          {/* <p className='text-richblack-100 text-xs flex justify-end'>{time}</p> */}
        </div>
    </div>
    
  );
};

export default LeftChat;
