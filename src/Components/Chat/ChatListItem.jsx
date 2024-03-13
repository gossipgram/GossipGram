import React from 'react';

const ChatListItem = ({ chat }) => {
  
  const [user1 , user2] = chat.users;

  const { username, image } = user2;
  const content = chat.latestMessage ? `${chat.latestMessage.content.substring(0, 25)}${chat.latestMessage.content.length > 25 ? '...' : ''}` : '';

  return (
    <div className="flex items-center p-4 border-b border-yellow-500 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-all duration-200">
      <img src={image} alt='' className="w-10 h-10 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold text-richblack-5 text-lg">{username}</h3>
        <p className="text-richblack-50">{content}</p>
       
      </div>
    </div>
  );
};

export default ChatListItem;
