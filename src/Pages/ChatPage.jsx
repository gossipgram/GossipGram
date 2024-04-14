import React, { useEffect, useState } from "react";
import ListChats from "../Components/Chat/ListChats";
import MessageUser from "../Components/Chat/MessageUser";
import MessageBox from "../Components/Chat/MessageBox";
import SendMessage from "../Components/Chat/SendMessage";
import { getAllUserData } from "../services/operations/profileAPI";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import SideDrawer from "../Components/Chat/SideDrawer";

const ChatPage = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const [messages, setMessages] = useState([]);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [userData, setUserData] = useState([]);
  // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<",showSendMessage)
  const [chatId, setChatId] = useState(""); //__
  const [chatUser, setChatUser] = useState([]); //__
  const [chatFinal, setChatFinal] = useState([]);
  const [showSideDrawer, setShowSideDrawer] = useState(false);

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

  const handleToggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer); 
  };

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden flex flex-row mt-10 mx-auto">
      <div className=" w-4/12 h-full flex flex-col bg-richblack-700 rounded-md mx-10 gap-5">
        <div className="flex flex-row items-center justify-between px-5">
          <h1 className="text-white text-4xl  mt-5">INBOX</h1>
          
          <AiOutlineUsergroupAdd className="w-10 h-10 text-white mt-4 cursor-pointer" onClick={handleToggleSideDrawer}/>
        </div>
        
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
      {showSideDrawer && <SideDrawer handleToggleSideDrawer={handleToggleSideDrawer}/>} 
    </div>
  );
};
export default ChatPage;
