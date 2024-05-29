import React from "react";
import { useState } from "react";
import CreateForm from "./CreateForm";
import {
  MdOutlineAddPhotoAlternate,
  MdOutlineVideoLibrary,
  MdOutlineTextSnippet,
} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setPostType } from "../../slices/postSlice";

const Create = () => {
  const dispatch = useDispatch();
  const postType = useSelector(state => state.post.postType);

  const radioChangeHandler = (event) => {
    dispatch(setPostType(event.target.value));
  };
  return (
    <div className="w-full  flex h-[88%] items-center flex-col gap-1 mt-4">
      <div className="bg-richblack-700 w-1/2   flex gap-5 flex-col items-center p-3 rounded-3xl border border-richblack-400">
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
            <span className="flex items-center gap-2">
              <MdOutlineTextSnippet className="text-xl" />
              Text
            </span>
          </label>

          <div className="w-[1px] h-full bg-richblack-100 "></div>

          <label
            className={` ${
              postType === "image" ? "text-yellow-300" : " text-richblack-25"
            } bg-richblack-600 text-lg border rounded-full px-7 cursor-pointer py-2 hover:text-yellow-300 transition-all duration-300 `}
          >
            <input
              type="radio"
              value="image"
              checked={postType === "image"}
              onChange={radioChangeHandler}
              className="sr-only"
            />
            <span className="flex items-center gap-2">
              <MdOutlineAddPhotoAlternate className="text-xl" />
              Photo
            </span>
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
            <span className="flex items-center gap-2">
              <MdOutlineVideoLibrary className="text-xl" />
              Video
            </span>
          </label>
        </div>
      </div>

      <div className="w-full flex mt-7 h-5/6 items-center justify-center">
        <CreateForm/>
      </div>
    </div>
  );
};

export default Create;
