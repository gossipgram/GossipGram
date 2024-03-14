import React, { useState, useEffect } from "react";
import ListChats from "../Components/Chat/ListChats";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];

  useEffect(() => {
    const fetchUserChats = async () => {
      setLoading(true);
      try {
        const response = await fetchChats(token);
        // console.log(response);
        setChats(response.data);

        // if (response && response.data) {
        //   setChats(response.data);
        // } else {
        //   throw new Error("Invalid response data format");
        // }
      } catch (error) {
        console.error("Error fetching chats:", error.message);
        toast.error("Failed to fetch chats. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserChats();
    }
  }, [token]);

  return (
    <div className="w-full overflow-x-hidden flex flex-row mt-10 mx-auto">
      <div className=" w-4/12 h-full flex flex-col bg-richblack-700 rounded-md mx-10 gap-5">
        <h1 className="text-white text-4xl mx-auto mt-5">INBOX</h1>
        <ListChats />
      </div>

      <div className="w-full h-full flex flex-row bg-richblack-700 rounded-md mx-10"></div>
    </div>
  );
};
export default ChatPage;
