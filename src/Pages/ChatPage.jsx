import React, { useEffect, useState } from "react";
import ListChats from "../Components/Chat/ListChats";
import MessageUser from "../Components/Chat/MessageUser";
import MessageBox from "../Components/Chat/MessageBox";
import SendMessage from "../Components/Chat/SendMessage";
import { getAllUserData } from "../services/operations/profileAPI";

const ChatPage = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const [messages, setMessages] = useState([]);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [userData, setUserData] = useState([]);
  // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<",showSendMessage)
  const [chatId, setChatId] = useState(""); //__
  const [chatUser, setChatUser] = useState([]); //__
  const [chatFinal, setChatFinal] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getAllUserData(token);
        setUserData(res);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleSendMessageClick = (chat) => {
    setShowSendMessage(true);
    setChatUser(chat); // --
    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<",showSendMessage)
  };
  // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<",showSendMessage)
  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden flex flex-row mt-10 mx-auto">
      <div className=" w-4/12 h-full flex flex-col bg-richblack-700 rounded-md mx-10 gap-5">
        <h1 className="text-white text-4xl mx-auto mt-5">INBOX</h1>
        <ListChats
          setChatFinal={setChatFinal}
          setMessages={setMessages}
          setChatId={setChatId}
          handleSendMessageClick={handleSendMessageClick}
          setChatUser={setChatUser}
          userData={userData}
          messages={messages}
        />
      </div>

      <div className="w-full h-full flex flex-col p-6 bg-richblack-700 rounded-md mx-10 justify-evenly items-stretch">
        {showSendMessage ? (
          <MessageUser
            userData={userData}
            chatId={chatId}
            chatUser={chatUser}
          />
        ) : null}

        {showSendMessage ? (
          <MessageBox
            messages={messages}
            setMessages={setMessages}
            userData={userData}
          />
        ) : null}

        {showSendMessage ? (
          <SendMessage
            userData={userData}
            chatId={chatId}
            setMessages={setMessages}
            messages={messages}
          />
        ) : null}
      </div>
    </div>
  );
};
export default ChatPage;
