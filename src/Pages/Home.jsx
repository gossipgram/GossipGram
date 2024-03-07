import React from "react";
import Sidebar from "../Components/common/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <h1>home page</h1>
      </div>
    </div>
  );
};

export default Home;
