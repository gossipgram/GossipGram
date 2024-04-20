import React, { useEffect, useState } from "react";
import ListChats from "../Components/Chat/ListChats";
import MessageUser from "../Components/Chat/MessageUser";
import MessageBox from "../Components/Chat/MessageBox";
import SendMessage from "../Components/Chat/SendMessage";
import { getAllUserData } from "../services/operations/profileAPI";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import SideDrawer from "../Components/Chat/SideDrawer";
import InfoChatUser from "../Components/Chat/InfoChatUser";
import { Navigate, useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

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
  const [showInfo, setShowInfo] = useState(false)
  const [updatedGroupName, setUpdatedGroupName] = useState('')
  const [updateGroupDp, setUpdateGroupDp] = useState([]);
  const navigate = useNavigate()

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

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  }

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden flex flex-row mt-10 mx-auto">
      <div className={`w-4/12 h-full flex flex-col bg-richblack-700 rounded-md mx-10 gap-5 ${!showInfo ? '' : 'w-[22%]'}`}>
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
          setShowInfo={setShowInfo}
          updatedGroupName={updatedGroupName}
          updateGroupDp={updateGroupDp}
        />
      </div>

      <div className={`${showInfo ? `w-[40%] h-full flex flex-col p-6 bg-richblack-700 rounded-md mx-10 justify-evenly items-stretch` : `w-full h-full flex flex-col p-6 bg-richblack-700 rounded-md mx-10 justify-evenly items-stretch`}`}>
        {showSendMessage ? (
          <MessageUser
            userData={userData}
            chatId={chatId}
            chatUser={chatUser}
            handleShowInfo={handleShowInfo}
            updatedGroupName={updatedGroupName}
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
        {showInfo && <InfoChatUser 
        handleShowInfo={handleShowInfo} 
        userData={userData} 
        chatUser={chatUser} 
        showInfo={showInfo} 
        setUpdatedGroupName={setUpdatedGroupName} 
        updatedGroupName={updatedGroupName}
        setChatUser={setChatUser}
        setUpdateGroupDp={setUpdateGroupDp}/>}

      </div>
      {showSideDrawer && <SideDrawer handleToggleSideDrawer={handleToggleSideDrawer}/>} 
      
    </div>
  );
};
export default ChatPage;
