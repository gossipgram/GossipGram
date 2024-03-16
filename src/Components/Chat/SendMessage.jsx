import React, { useState, useEffect } from 'react';
import { MdSend } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import { sendDirectMessage } from "../../services/operations/messageAPI";
import toast from 'react-hot-toast';

const SendMessage = ({ chatId }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token").split('"')[1];
    console.log("_______________________", chatId)

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessageHandler = async () => {
        if (!message.trim()) {
            toast.error('Message cannot be empty.');
            return;
        }

        try {
            setLoading(true);
            const data = {
                content: message,
                chatId: chatId, 
            };
            console.log("chatId ChatId chatId chatId ", chatId);
            console.log("message message message message message ", message)
            const response = await sendDirectMessage(data, token);

            // if (response.success) {
            //     toast.success('Message sent successfully.');
            
            // } else {
            //     toast.error(response.message || 'Failed to send message.');
            // }
            
        } catch (error) {
            console.error('Error sending message:', error.message);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
            setMessage(''); // Clear the message input after sending
        }
    };

    return (
        <div className='flex flex-row items-center bg-richblack-800 px-2 py-2 gap-3 rounded-lg'>
            <div className='p-2 hover:bg-richblack-600 cursor-pointer transition-all duration-200'>
                <MdOutlineEmojiEmotions className='w-10 h-10 text-white'/>
            </div>
            <div className='p-2 hover:bg-richblack-600 cursor-pointer transition-all duration-200'>
                <MdOutlineAdd className='w-10 h-auto text-white'/>
            </div>
            <div className="flex-grow">
                <textarea
                    className="w-full h-fit bg-richblack-500 p-1 rounded-md text-richblack-5"
                    placeholder="Write a message..."
                    value={message}
                    onChange={handleMessageChange}
                />
            </div>
            <div className='p-2 hover:bg-richblue-300 cursor-pointer transition-all duration-200'>
                <MdSend className='w-10 h-10 text-white hover:text-richblue-700 cursor-pointer transition-all duration-200' onClick={sendMessageHandler}/>
            </div>
        </div>
    );
};

export default SendMessage;
