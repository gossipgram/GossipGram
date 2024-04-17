// import React, { useEffect, useRef } from "react";
// import LeftChat from "./LeftChat";
// import RightChat from "./RightChat";
// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:4000";
// var socket;

// const MessageBox = ({ messages, setMessages, userData }) => {
//   const messageBoxRef = useRef(null);

//   useEffect(() => {
//     if (messageBoxRef.current) {
//       messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
//     }
//   }, [messages]); // yeh dono useEffect scrollbar ki setting k liye hai

//   useEffect(() => {
//     if (messageBoxRef.current) {
//       messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
//     }
//   }, []);

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     socket.emit("setup", userData);
//     socket.on("connection", () => console.log("Socket connected"));
//   }, []);

//   useEffect(() => {
//     socket.on("message recieved", (newMessageRecieved) => {
//       // if (
//       //   !selectedChatCompare || // if chat is not selected or doesn't match current chat
//       //   selectedChatCompare._id !== newMessageRecieved.chat._id
//       // ) {
//       //   if (!notification.includes(newMessageRecieved)) {
//       //     setNotification([newMessageRecieved, ...notification]);
//       //     setFetchAgain(!fetchAgain);
//       //   }
//       // } else {
//       //   setMessages([...messages, newMessageRecieved]);
//       // }
//       setMessages([...messages, newMessageRecieved]);
//       // console.log("messages---------", messages);
//       // console.log("newMessageRecieved++++++++++++", newMessageRecieved);
//     });
//   });

//     const groupMessagesByDate = (messages) => {
//       // Group messages by their date
//       const groups = messages.reduce((acc, message) => {
//         const date = new Date(message.createdAt).toDateString(); // Convert the date to a string format
//         if (!acc[date]) {
//           acc[date] = [];
//         }
//         acc[date].push(message);
//         return acc;
//       }, {});

//       // Sort the keys (dates) of the grouped messages
//       const sortedDates = Object.keys(groups).sort((a, b) => {
//         // Convert the date strings back to Date objects to compare
//         return new Date(a) - new Date(b);
//       });

//       // Create a new sorted object
//       const sortedGroups = {};
//       sortedDates.forEach(date => {
//         sortedGroups[date] = groups[date];
//       });

//       return sortedGroups;
//     };


//     const messageGroups = groupMessagesByDate(messages);
//     console.log("messageGroups",messageGroups)

//   return (
//     <div
//       ref={messageBoxRef}
//       className="bg-richblack-600 p-5 rounded-xl min-h-[700px] max-h-[700px] overflow-scroll overflow-x-hidden scroll-smooth scrolling"
//     >
//       {messages.map((message, index) => {
//         const isSenderCurrentUser =
//           message?.sender?.username === userData?.userDetails?.username;

//         const messageStyle = {
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: isSenderCurrentUser ? "flex-end" : "flex-start",
//           padding: isSenderCurrentUser ? "0 20px 0 0" : "0 0 0 20px",
//         };

//         // time extract krne k liye use hua hai
//         const messageDate = new Date(message.createdAt);
//         let hour = messageDate.getHours();
//         const minute = messageDate.getMinutes();
//         const amPm = hour >= 12 ? "PM" : "AM";
//         hour = hour % 12 || 12;

//         const time = `${hour}:${minute < 10 ? "0" + minute : minute} ${amPm}`;

//         return (
//           <div key={index} style={messageStyle}>
            
//             {isSenderCurrentUser ? (
//               <RightChat message={message?.content} time={time} />
//             ) : (
//               <LeftChat message={message?.content} time={time} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MessageBox;


import React, { useEffect, useRef } from "react";
import LeftChat from "./LeftChat";
import RightChat from "./RightChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
var socket;

const MessageBox = ({ messages, setMessages, userData }) => {
  const messageBoxRef = useRef(null);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => console.log("Socket connected"));
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      setMessages(prevMessages => [...prevMessages, newMessageReceived]);
    });

    // Don't forget to cleanup to prevent memory leaks
    return () => {
      socket.off("message received");
    };
  }, [setMessages, messages]);

  const groupMessagesByDate = (messages) => {
    const groups = messages.reduce((acc, message) => {
      const date = new Date(message.createdAt).toDateString(); // Convert the date to a string format
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    }, {});

    const sortedDates = Object.keys(groups).sort((a, b) => new Date(a) - new Date(b));
    const sortedGroups = {};
    sortedDates.forEach(date => {
      sortedGroups[date] = groups[date];
    });

    return sortedGroups;
  };

  const messageGroups = groupMessagesByDate(messages);

  const formatDate = (dateString) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const date = new Date(dateString);

    // Compare only the date part (not time)
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toDateString(); // You can adjust formatting here if desired
    }
  };


  return (
  <div
    ref={messageBoxRef}
    className="bg-richblack-600 p-5 rounded-xl min-h-[700px] max-h-[700px] overflow-scroll overflow-x-hidden scroll-smooth scrolling"
  >
    {Object.entries(messageGroups).map(([date, groupedMessages]) => (
      <div key={date}>
        <div className="flex justify-center items-center text-richblack-900 rounded-xl px-6 bg-richblack-400 w-fit mx-auto mb-3">
          {formatDate(date)}
        </div>
        {groupedMessages.map((message, index) => {
          console.log("message_____________",message)
          const isSenderCurrentUser = message?.sender?.username === userData?.userDetails?.username;
          const messageStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: isSenderCurrentUser ? "flex-end" : "flex-start",
            padding: isSenderCurrentUser ? "0 20px 0 0" : "0 0 0 20px",
          };
          const messageDate = new Date(message.createdAt);
          let hour = messageDate.getHours();
          const minute = messageDate.getMinutes();
          const amPm = hour >= 12 ? "PM" : "AM";
          hour = hour % 12 || 12;
          const time = `${hour}:${minute < 10 ? '0' + minute : minute} ${amPm}`;

          return (
            <div key={index} style={messageStyle}>
              {isSenderCurrentUser ? (
                <RightChat message={message.content} time={time} />
              ) : (
                <LeftChat message={message} time={time} />
              )}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

};

export default MessageBox;
