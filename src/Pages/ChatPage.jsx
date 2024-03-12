import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { fetchChats } from '../services/operations/chatAPI';

const ChatPage = () => {
const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  

  useEffect(() => {
  const fetchUserChats = async () => {
    setLoading(true);
    try {
      const response = await fetchChats(token);

      setChats(response.data);

      if (response && response.data) {
        setChats(response.data);
      } else {
        throw new Error('Invalid response data format');
      }
    } catch (error) {
      console.error('Error fetching chats:', error.message);
      toast.error('Failed to fetch chats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    fetchUserChats();
  }
}, [token]);



  return (
    <div>
      <h2>Chat List</h2>
      {loading && <p>Loading...</p>}
      {!loading && chats.length === 0 && <p>No chats available.</p>}
      {!loading && chats.length > 0 && (
        <ul>
          {chats.map((chat) => (
            <li key={chat._id}>
              <h3>{chat.chatName}</h3>
              {/* Add more details based on your chat data structure */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ChatPage;
