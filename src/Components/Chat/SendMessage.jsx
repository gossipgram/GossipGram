import React, { useState, useEffect } from "react";
import { MdSend } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import { sendDirectMessage } from "../../services/operations/messageAPI";
import toast from "react-hot-toast";
import io from "socket.io-client"; //____

const ENDPOINT = "https://gossip-gram.vercel.app";
var socket, selectedChatCompare;

const SendMessage = ({ chatId, userData, setMessages, messages }) => {
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  const [socketConnected, setSocketConnected] = useState(false); //_____

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  const handleMessageChange = (event) => {
    setMessageText(event.target.value);
  };

  const sendMessageHandler = async () => {
    if (!messageText.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const tempData = {
        content: messageText,
        chatId: chatId,
      };

      const data = await sendDirectMessage(tempData, token);
      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      console.error("Error sending message:", error.message);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
      setMessageText(""); // Clear the message input after sending
    }
  };

  return (
    <div className="flex flex-row items-center bg-richblack-800 px-2 py-2 gap-3 rounded-lg">
      <div className="p-2 hover:bg-richblack-600 rounded-xl cursor-pointer transition-all duration-200">
        <MdOutlineEmojiEmotions className="w-10 h-10 text-white" />
      </div>
      <div className="p-2 hover:bg-richblack-600 rounded-xl cursor-pointer transition-all duration-200">
        <MdOutlineAdd className="w-10 h-auto text-white" />
      </div>
      <div className="flex-grow">
        <textarea
          className="w-full h-fit bg-richblack-500 p-1 rounded-md text-richblack-5 resize-none overflow-auto appearance-none"
          placeholder="Write a message..."
          value={messageText}
          onChange={handleMessageChange}
        />
      </div>
      <div className="p-2 hover:bg-richblue-300 rounded-xl cursor-pointer transition-all duration-200">
        <MdSend
          className="w-10 h-10 text-white hover:text-richblue-700 cursor-pointer transition-all duration-200"
          onClick={sendMessageHandler}
        />
      </div>
    </div>
  );
};

export default SendMessage;
