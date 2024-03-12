import React, { useState, useEffect } from "react";
import { FaRegCommentAlt, FaRegHeart, FaCommentAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const PostCard = ({ post }) => {
  return (
    <div className="flex flex-col max-w-lg pb-3 max-h-[700px] bg-black ">
      <div className="py-5 flex  items-center">
        <img
          src={post.user.image}
          width={35}
          className="rounded-full mr-2"
        ></img>
        <div className="text-white font-semibold">{post.user.username}</div>
      </div>
      <div className="w-full flex items-center overflow-hidden border-[1px] border-pure-greys-500 rounded-lg">
        <img className=" w-full h-full object-cover " src={post.mediaUrl}></img>
      </div>
      <div className="my-3">
        <p className="text-white">
          <span className="font-semibold">{post.user.username}</span>{" "}
          {post.caption}
        </p>
      </div>
      <div className="flex gap-x-5 mt-[2px] items-center">
        <div className="flex text-white text-lg gap-1 cursor-pointer hover:opacity-60 transition-all duration-200">
          <FaRegHeart className="text-2xl text-pure-greys-50" />
          {/* <FcLike /> */}
          <p>{post.likes.length}</p>
        </div>
        <div className="text-white flex gap-x-3 items-center cursor-pointer hover:opacity-60 transition-all duration-200">
          <FaRegCommentAlt className="text-2xl text-pure-greys-50" />
          {/* <FaCommentAlt />t */}
          <p className="text-lg">{post.comments.length}</p>
        </div>
      </div>
      <div className="w-full h-[2px] bg-yellow-600 mt-8"></div>
    </div>
  );
};

export default PostCard;
