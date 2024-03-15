import React, { useState, useEffect } from "react";
import ListChats from "../Components/Chat/ListChats";
import toast from "react-hot-toast";
import { fetchChats } from "../services/operations/chatAPI";
import MessageUser from "../Components/Chat/MessageUser";
import MessageBox from "../Components/Chat/MessageBox";

const ChatPage = () => {
  // const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const fetchUserChats = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetchChats(token);
  //       setChats(response.data);
  //       console.log("DEKH DEKH DEKH DEKH DEKH DEKH DEKH DEKH ", response)

  //     } catch (error) {
  //       console.error("Error fetching chats:", error.message);
  //       toast.error("Failed to fetch chats. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (token) {
  //     fetchUserChats();
  //   }
  // }, [token]);

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden flex flex-row mt-10 mx-auto">
      <div className=" w-4/12 h-full flex flex-col bg-richblack-700 rounded-md mx-10 gap-5">
        <h1 className="text-white text-4xl mx-auto mt-5">INBOX</h1>
        <ListChats setMessages={setMessages}/>
      </div>

      <div className="w-full h-full flex flex-col p-6 bg-richblack-700 rounded-md mx-10">

        <MessageUser messages={messages}/>

        <MessageBox messages={messages}/>

      </div>
    </div>
  );
};
export default ChatPage;
