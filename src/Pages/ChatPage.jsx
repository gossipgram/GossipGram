import React, { useState, useEffect } from "react";
import ListChats from "../Components/Chat/ListChats";


const ChatPage = () => {

  return (
    <div className="w-full overflow-x-hidden flex flex-row mt-10 mx-auto">
      <div className=" w-4/12 h-full flex flex-row bg-richblack-700 rounded-md mx-10">
        <ListChats />
      </div>

      <div className="w-full h-full flex flex-row bg-richblack-700 rounded-md mx-10">
        
      </div>
    </div>
  );
};
export default ChatPage;
