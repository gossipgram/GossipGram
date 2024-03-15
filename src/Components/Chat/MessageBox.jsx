import React from 'react';
import LeftChat from './LeftChat';
import RightChat from './RightChat';

const MessageBox = ({ messages }) => {
  console.log("?????????????????????????????????????????????",messages)
  return (
    <div className="bg-richblack-600 p-5 rounded-xl min-h-[700px] max-h-[700px] overflow-scroll overflow-x-hidden scroll-smooth scrolling">
      {messages.map((message, index) => {
        const isSenderCurrentUser = message?.sender?._id === message?.chat?.users[0]?._id;

        const messageStyle = {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isSenderCurrentUser ? 'flex-end' : 'flex-start',
          padding: isSenderCurrentUser ? '0 20px 0 0' : '0 0 0 20px', // Padding for x-axis

        };

        // Extracting hour, minute, and AM/PM from the createdAt field
        const messageDate = new Date(message.createdAt);
        let hour = messageDate.getHours();
        const minute = messageDate.getMinutes();
        const amPm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // Convert to 12-hour clock format

        const time = `${hour}:${minute < 10 ? '0' + minute : minute} ${amPm}`;

        return (
          <div key={index} style={messageStyle}>
            {isSenderCurrentUser ? (
              <RightChat message={message?.content} time={time}/>
            ) : (
              <LeftChat message={message?.content} time={time}/>
            )}
          </div>
        );
      })}
      
    </div>
  );
};

export default MessageBox;
