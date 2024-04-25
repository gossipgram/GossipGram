import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllDirectMessage } from "../../services/operations/messageAPI";
import toast from "react-hot-toast";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
var socket;

const ChatListItem = ({
  chat,
  setMessages,
  setChatId,
  handleSendMessageClick,
  userData,
  setChatUser,
  messages,
  setShowInfo,
  updatedGroupName,
  
}) => {
  console.log("chat_____________", chat);
  const navigate = useNavigate();
  const location = useLocation();
  const userUsername = userData?.userDetails?.username;
  const { _id: chatId, isGroupChat, chatName, groupImage, users } = chat;
  
  let userName, userImage;
  if (isGroupChat) {
    userName = chatName;
    userImage = groupImage;
  } else {
    const { username, image } = users.find((user) => user.username !== userUsername) || {};
    userName = username;
    userImage = image;
  }

  const token = localStorage.getItem("token").split('"')[1];
  const content = chat.latestMessage
    ? `${chat.latestMessage.content.substring(0, 25)}${
        chat.latestMessage.content.length > 25 ? "..." : ""
      }`
    : "";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => console.log("Socket connected"));
  }, []);

  useEffect(() => {
    // Extract chatId from the current path
    const currentChatId = location.pathname.split("/").pop();
    if (currentChatId === chatId) {
      handleChatItemClick();
    }
  }, []); // Listen for changes in the path

  const handleChatItemClick = async () => {
    try {
      const messagesData = await getAllDirectMessage(chatId, token);
      setChatUser(chat);
      setMessages(messagesData);
      setShowInfo(false);
      setChatId(chatId);
      handleSendMessageClick(chat);
      socket.emit("join chat", chatId);
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      toast.error("Failed to fetch messages. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center p-4 border-b border-yellow-500 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-all duration-200"
      onClick={handleChatItemClick}
    >
      <img src={userImage} alt="" className="w-10 h-10 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold text-richblack-5 text-lg">{isGroupChat && updatedGroupName ? updatedGroupName : userName}</h3>
        <p className="text-richblack-50">{content}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
