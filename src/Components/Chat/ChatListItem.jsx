import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllDirectMessage } from "../../services/operations/messageAPI"

const ChatListItem = ({ chat , setMessages , setChatId , handleSendMessageClick , userData}) => {
  
  const navigate = useNavigate();
  const userUsername = userData.userDetails.username ;                        // username of user logged in 
  const [user1 , user2] = chat.users;
  const chatId = chat._id;
  const token = localStorage.getItem("token").split('"')[1];
  console.log("chatchatchatchatchatchat", chat)

  const content = chat.latestMessage ? `${chat.latestMessage.content.substring(0, 25)}${chat.latestMessage.content.length > 25 ? '...' : ''}` : '';      // latest message ko chhota krne k liye
  const { username: userName, image: userImage } = chat.users.find(user => user.username !== userUsername) || {};                                        // chat.users me se voh user alag krna hai jiska username logged in user k username k equal na ho
 
  const handleChatItemClick = async () => {
    try {

      const messages = await getAllDirectMessage(chatId, token);

      console.log('Messages for chat', chatId, ':', messages);
      // console.log(messages , " ---------------------------------")
      setMessages(messages);
      setChatId(chatId)

      handleSendMessageClick()
      
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
      toast.error('Failed to fetch messages. Please try again.');
    }
  };

  return (
    <div className="flex items-center p-4 border-b border-yellow-500 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-all duration-200"
    onClick={handleChatItemClick}>
      <img src={userImage} alt='' className="w-10 h-10 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold text-richblack-5 text-lg">{userName}</h3>
        <p className="text-richblack-50">{content}</p>
       
      </div>
    </div>
  );
};

export default ChatListItem;
