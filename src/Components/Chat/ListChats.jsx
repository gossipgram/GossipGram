import React, { useEffect, useState } from 'react'
import ChatListItem from './ChatListItem'
import { fetchChats } from '../../services/operations/chatAPI';
import toast from 'react-hot-toast';

const ListChats = ({ setMessages ,setChatId , handleSendMessageClick , userData}) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token").split('"')[1];


    useEffect(() => {
        const fetchUserChats = async () => {
        setLoading(true);
        try {
            const response = await fetchChats(token);
            console.log("chat all chat all chat all achat all ", response);
        
            setChats(response.data);

            
        } catch (error) {
            console.error("Error fetching chats:", error.message);
            toast.error("Failed to fetch chats. Please try again.");
        } finally {
            setLoading(false);
            console.log(chats);
        }
        };

        if (token) {
        fetchUserChats();
        }
    }, [token]);
  return (
    <div className="flex flex-col w-full">
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="spinner "></div>
        </div>
      ) : chats.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <p className="font-bold text-2xl text-white">No Chats Found</p>
        </div>
      ) : (
        
        chats.map((chat) => 
          <ChatListItem 
          chat={chat} 
          chatId ={chat._id}
          userData={userData}
          key={chat._id} 
          setMessages={setMessages}
          setChatId={setChatId}
          handleSendMessageClick={handleSendMessageClick}
          />)
      )}
    </div>
  )
}

export default ListChats
