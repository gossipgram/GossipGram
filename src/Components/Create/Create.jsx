import React from "react";
import { useState } from "react";
import CreateForm from "./CreateForm";

const Create = () => {
  const [postType, setpostType] = useState("");

  const radioChangeHandler = (event) => {
    setpostType(event.target.value);
  };
  return (
    <div className="w-full flex items-center flex-col gap-1 h-auto ">
      <div className="bg-richblack-700 w-1/2 h-1/6  flex gap-5 flex-col items-center p-3 rounded-3xl border border-richblack-400">
        <h2 className="text-richblack-25 text-2xl">
          Select what do you want to post ?
        </h2>

        <div className="flex gap-24 mb-4">
          <label
            className={` ${
              postType === "text" ? "text-yellow-300" : " text-richblack-25"
            } bg-richblack-600 text-lg border rounded-full px-9 cursor-pointer py-2 hover:text-yellow-300 transition-all duration-300`}
          >
            <input
              type="radio"
              value="text"
              checked={postType === "text"}
              onChange={radioChangeHandler}
              className="sr-only"
            />
            <span>Text</span>
          </label>

          <div className="w-[1px] h-full bg-richblack-100 "></div>

          <label
            className={` ${
              postType === "photo" ? "text-yellow-300" : " text-richblack-25"
            } bg-richblack-600 text-lg border rounded-full px-7 cursor-pointer py-2 hover:text-yellow-300 transition-all duration-300 `}
          >
            <input
              type="radio"
              value="photo"
              checked={postType === "photo"}
              onChange={radioChangeHandler}
              className="sr-only"
            />
            <span>Photo</span>
          </label>

          <div className="w-[1px] h-full bg-richblack-100 "></div>

          <label
            className={` ${
              postType === "video" ? "text-yellow-300" : " text-richblack-25"
            } bg-richblack-600 text-lg border rounded-full px-7 cursor-pointer py-2 hover:text-yellow-300 transition-all duration-300 `}
          >
            <input
              type="radio"
              value="video"
              checked={postType === "video"}
              onChange={radioChangeHandler}
              className="sr-only"
            />
            <span>Video</span>
          </label>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <CreateForm postType={postType} />
      </div>
    </div>
  );
};

export default Create;
