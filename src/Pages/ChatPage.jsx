import React from "react";
import Sidebar from "../Components/common/Sidebar";

const ChatPage = () => {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <h1>messages page</h1>
      </div>
    </div>
  );
};

export default ChatPage;
