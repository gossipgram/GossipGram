import React from "react";
import Feed from "../Components/posts/Feed";

const Home = () => {
  return (
    <div className=" overflow-x-hidden w-full flex  flex-col items-center">
      <div>
        <Feed />
      </div>
    </div>
  );
};

export default Home;
