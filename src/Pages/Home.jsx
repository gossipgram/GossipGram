import React from "react";
import Feed from "../Components/posts/Feed";

const Home = () => {
  return (
    <div className=" w-full overflow-x-hidden flex flex-col items-center">
      <div className="">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
