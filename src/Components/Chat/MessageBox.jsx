import React, { useEffect, useRef } from 'react';
import LeftChat from './LeftChat';
import RightChat from './RightChat';

const MessageBox = ({ messages , userData}) => {
  const messageBoxRef = useRef(null);
  // console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",messages);
  // console.log("UUUUUUUUUUUUUUUUUUUDDDDDDDDDDDDDDDDDD",userData)

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);                                                                     // yeh dono useEffect scrollbar ki setting k liye hai 

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, []); 


  return (
    <div
      ref={messageBoxRef}
      className="bg-richblack-600 p-5 rounded-xl min-h-[700px] max-h-[700px] overflow-scroll overflow-x-hidden scroll-smooth scrolling"
    >
      {messages.map((message, index) => {
        const isSenderCurrentUser = message?.sender?.username === userData?.userDetails?.username;

        const messageStyle = {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isSenderCurrentUser ? 'flex-end' : 'flex-start',
          padding: isSenderCurrentUser ? '0 20px 0 0' : '0 0 0 20px'
        };

        // time extract krne k liye use hua hai 
        const messageDate = new Date(message.createdAt);
        let hour = messageDate.getHours();
        const minute = messageDate.getMinutes();
        const amPm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; 

        const time = `${hour}:${minute < 10 ? '0' + minute : minute} ${amPm}`;

        return (
          <div key={index} style={messageStyle}>
            {isSenderCurrentUser ? (
              <RightChat message={message?.content} time={time} />
            ) : (
              <LeftChat message={message?.content} time={time} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageBox;
