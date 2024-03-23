import React from "react";
import { useState } from "react";
import CreateForm from "./CreateForm";

const Create = () => {
  const [postType, setpostType] = useState("");

  const textButtonHandler = () => {
    setpostType("text");
  };
  const photoButtonHandler = () => {
    setpostType("photo");
  };
  const videoButtonHandler = () => {
    setpostType("video");
  };

  return (
    <div className="w-full flex items-center flex-col gap-1 h-auto ">
      <div className="bg-richblack-700 w-1/2 h-1/6  flex gap-5 flex-col items-center p-3 rounded-3xl border border-richblack-400">
        <h2 className="text-richblack-25 text-2xl">
          Select what do you want to post ?
        </h2>

        <div className="flex gap-24 mb-4">
          <button
            onClick={textButtonHandler}
            className="text-richblack-5 text-lg border border-richblack-100 px-9  py-2 rounded-full bg-richblack-600 hover:text-yellow-300 hover:border-yellow-300 focus:outline-none focus:text-yellow-300 focus:border-yellow-300 transition-all duration-300"
          >
            Text
          </button>
          <div className="w-[1px] h-full bg-richblack-100 "></div>
          <button
            onClick={photoButtonHandler}
            className="text-richblack-5 text-lg border border-richblack-100 px-7 py-2 rounded-full bg-richblack-600 hover:text-yellow-300 hover:border-yellow-300 focus:outline-none focus:text-yellow-300 focus:border-yellow-300 transition-all duration-300"
          >
            Photo
          </button>
          <div className="w-[1px] h-full bg-richblack-100 "></div>
          <button
            onClick={videoButtonHandler}
            className="text-richblack-5 text-lg border border-richblack-100 px-7 py-2 rounded-full bg-richblack-600 hover:text-yellow-300 hover:border-yellow-300 focus:outline-none focus:text-yellow-300 focus:border-yellow-300 transition-all duration-300"
          >
            Video
          </button>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <CreateForm />
      </div>
    </div>
  );
};

export default Create;
