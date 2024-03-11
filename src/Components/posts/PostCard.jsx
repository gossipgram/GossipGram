import React from "react";
import { CiHeart } from "react-icons/ci";
import { BiCommentDetail } from "react-icons/bi";

const PostCard = ({ post }) => {
  return (
    <div>
      <div>
        <div>{post.caption}</div>
        <div>{}</div>
      </div>
      <div>
        <img src={post.mediaUrl}></img>
      </div>
      <div>
        <div className="flex">
          <CiHeart />
          <p>{post.likes.length}</p>
        </div>
        <div>
          <BiCommentDetail />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
