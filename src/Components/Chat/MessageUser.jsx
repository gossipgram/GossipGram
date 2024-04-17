import React, { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { BsFillInfoCircleFill } from "react-icons/bs";

const MessageUser = ({ userData, chatId, chatUser , handleShowInfo , updatedGroupName}) => {
  console.log("chatUsers",chatUser)
  const [currentChatId, setCurrentChatId] = useState(chatId);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentChatId(chatId);
  }, [chatId , updatedGroupName]);

  // const user = messages.length > 0 ? messages[0]?.chat?.users[1] : null;
  const userUsername = userData?.userDetails?.username;

    let userName, userImage, id;

    if (chatUser.isGroupChat) {
      userName = chatUser.chatName;
      userImage = chatUser.groupImage;
      id = chatUser._id; // Or use another suitable identifier for the group
    } else {
      const currentUser = chatUser.users.find((user) => user.username !== userUsername);
      userName = currentUser.username;
      userImage = currentUser.image;
      id = currentUser._id;
    }

  if (!chatUser) {
    return null;
  }

  const clickHandle = (id) => {
    if (!chatUser.isGroupChat && id) {
      navigate(`/user/${id}`);
    }
  };


  return (
    <div className="flex items-center justify-between p-4 bg-richblack-700">
      <div className="flex items-center cursor-pointer" onClick={() => clickHandle(id)}>
        <img
          src={userImage}
          loading="lazy"
          alt=""
          className="w-14 h-14 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-richblack-5 text-2xl">
            {updatedGroupName ? updatedGroupName : userName}
          </h3>
          {/* active status  */}
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="p-2 hover:bg-richblack-600 rounded-2xl cursor-pointer transition-all duration-200">
          <BsFillInfoCircleFill className="w-10 h-10 text-white" onClick={handleShowInfo}/>
        </div>
        {/* <div className="p-2 hover:bg-richblack-600 rounded-2xl cursor-pointer transition-all duration-200">
          <MdAddIcCall className="w-10 h-10 text-white" />
        </div> */}
      </div>
    </div>
  );
};

export default MessageUser;
