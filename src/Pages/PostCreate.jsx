import React from "react";
import CreateForm from "../Components/Create/CreateForm";
import Create from "../Components/Create/Create";

const PostCreate = () => {
  return (
    <div className="flex  flex-col h-screen w-full">
      <div className="flex w-full justify-center mt-10">
        <h1 className="text-richblack-5 text-5xl">Create Post</h1>
      </div>

      <div className="flex justify-center w-full h-full ">
        <Create />
      </div>
    </div>
  );
};

export default PostCreate;
