import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { BiCommentDetail } from "react-icons/bi";

const PostCard = ({ post }) => {
  return (
    <div className="flex flex-col max-w-lg pb-3 max-h-[700px] bg-black border-b-2 border-yellow-600 ">
      <div className="p-5">
        <img src=""></img>
        <div className="text-white">{post.user.username}</div>
      </div>
      <div className="w-full flex items-center overflow-hidden border-[1px] border-pure-greys-500 rounded-lg">
        <img className=" w-full h-full object-cover " src={post.mediaUrl}></img>
      </div>
      <div className="my-3">
        <p className="text-white">
          <span className="font-semibold">kunaldhand</span> {post.caption}
        </p>
      </div>
      <div className="flex gap-x-5 items-center">
        <div className="flex text-white text-lg gap-1 cursor-pointer hover:opacity-60">
          <CiHeart className="text-2xl " />
          <p>{post.likes.length}</p>
        </div>
        <div className="text-white flex gap-x-3 items-center cursor-pointer hover:opacity-60">
          <BiCommentDetail className="text-2xl" />
          <p className="text-lg">{post.comments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
