import React from "react";
import Sidebar from "../Components/common/Sidebar";

const ChatPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <h1>messages page</h1>
      </div>
    </div>
  );
};

export default ChatPage;
