import React from 'react';
import LeftChat from './LeftChat';
import RightChat from './RightChat';

const MessageBox = ({ messages }) => {
  return (
    <div className="bg-richblack-600 p-5 rounded-xl min-h-full overflow-scroll scroll-smooth scrollbar-hidden">
      {messages.map((message, index) => {
        const isSenderCurrentUser = message?.sender?._id === message?.chat?.users[0]?._id;

        const messageStyle = {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isSenderCurrentUser ? 'flex-end' : 'flex-start',
          padding: isSenderCurrentUser ? '0 20px 0 0' : '0 0 0 20px', // Padding for x-axis

        };

        return (
          <div key={index} style={messageStyle}>
            {isSenderCurrentUser ? (
              <RightChat message={message?.content} />
            ) : (
              <LeftChat message={message?.content} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageBox;
