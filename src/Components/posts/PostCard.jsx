import React from "react";
import { CiHeart } from "react-icons/ci";
import { BiCommentDetail } from "react-icons/bi";

const PostCard = ({ post }) => {
  return (
    <div>
      <div>
        <div>{post.user.image}</div>
        <div>{post.user.username}</div>
      </div>
      <div>
        <img src={post.mediaUrl}></img>
      </div>
      <div>
        <div>
          <CiHeart />
        </div>
        <div>
          <BiCommentDetail />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
