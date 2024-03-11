import React from 'react';

const ChatListItem = ({ username, dpUrl, lastMessage }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
      <img src={dpUrl} alt={`${username}'s DP`} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold text-lg">{username}</h3>
        <p className="text-gray-500">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
