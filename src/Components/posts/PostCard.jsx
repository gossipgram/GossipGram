import React, { useState, useEffect, useId, useRef } from "react";
import {
  FaRegCommentAlt,
  FaRegHeart,
  FaCommentAlt,
  FaChessKing,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getLikesForPost,
  likePost,
  unlikePost,
} from "../../services/operations/likesAPI";
import { FcLike } from "react-icons/fc";
import CommentsModal from "./CommentsModal";

const PostCard = ({ post, userId, postUserId }) => {
  const [totalLike, setTotalLike] = useState(post?.likes?.length);

  const postId = post?._id;
  const token = localStorage.getItem("token").split('"')[1];
  const [likeUser, setLikeUser] = useState([]);
  const [liked, setLiked] = useState(false);
  const [totalComments, setTotalComments] = useState(post?.comments?.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchLikeUser = async () => {
      try {
        const response = await getLikesForPost(postId, token);
        setLikeUser(response?.likes);
      } catch (error) {
        console.error("Error fetching like Users Data:", error.message);
      }
    };

    fetchLikeUser();
  }, [token]);

  useEffect(() => {
    const compareUserlikeId = () => {
      for (let i = 0; i < likeUser?.length; i++) {
        if (likeUser[i]?.user === userId) {
          setLiked(true);
          return;
        } else {
          continue;
        }
      }
      setLiked(false);
    };

    compareUserlikeId();
  }, [likeUser]);

  const likeHandler = () => {
    setTotalLike(totalLike + 1);
    setLiked(true);
    likePost(postId, token);
  };

  const unlikeHandler = () => {
    setTotalLike(totalLike - 1);
    setLiked(false);
    unlikePost(postId, token);
  };

  const likeButtonHandler = () => {
    if (!liked) {
      likeHandler();
    } else {
      unlikeHandler();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditPost = () => {
    console.log("edit post");
  };

  const handleDeletePost = () => {
    console.log("delete post");
  };

  return (
    <div className="flex flex-col  max-w-lg pb-3 max-h-[700px] bg-richblack-800">
      <div className="flex justify-between items-center mr-5">
        <div className="py-5 flex items-center">
          <img
            src={post.user.image}
            width={35}
            className="rounded-full mr-2"
          ></img>
          <div className="text-white font-semibold">{post.user.username}</div>
        </div>
        <div className="relative ">
          <button
            onClick={toggleMenu}
            className="text-richblack-5 cursor-pointer text-xl hover:text-yellow-400 focus:text-yellow-400 transition-all duration-200 "
          >
            <BsThreeDotsVertical />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-6 bg-richblack-700  rounded-xl w-[200px]">
              <div className="flex flex-col gap-3 m-5">
                <button
                  onClick={handleEditPost}
                  className=" px-4 py-2 text-richblack-50  bg-richblack-600 cursor-pointer rounded-xl hover:bg-richblack-500 hover:text-yellow-200 transition-all duration-200"
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 text-richblack-50  bg-richblack-600 cursor-pointer rounded-xl hover:text-yellow-200 hover:bg-richblack-500 transition-all duration-200"
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex items-center overflow-hidden border-[1px] border-pure-greys-500 rounded-lg">
        {post.mediaUrl.includes("video") ? (
          <video
            src={post.mediaUrl}
            controls
            className="w-full h-full object-cover bg-black"
          />
        ) : post.mediaUrl.includes("image") ? (
          <img
            className=" w-full h-full object-cover bg-black"
            src={post.mediaUrl}
          ></img>
        ) : (
          <div className="p-5 flex flex-col gap-3">
            <h2 className="text-richblack-25 text-2xl font-bold">
              {post.caption}
            </h2>

            <p className="text-richblack-50 text-xl ml-5">{post.textContent}</p>
          </div>
        )}

        {/*  */}
      </div>
      <div className="mb-3 mt-5">
        <p className="text-white">
          <span className="font-semibold">{post.user.username}</span>{" "}
          {!post.textContent ? post.caption : null}
        </p>
      </div>
      <div className="flex gap-x-5 mt-[2px] items-center">
        <button
          onClick={likeButtonHandler}
          className="flex text-white text-lg gap-1 cursor-pointer hover:opacity-60 transition-all duration-200"
        >
          {liked ? (
            <FcLike className="text-2xl " />
          ) : (
            <FaRegHeart className="text-2xl text-pure-greys-50" />
          )}
          {/*  */}
          <p>{totalLike}</p>
        </button>
        <button
          onClick={openModal}
          className="text-white flex gap-2 items-center cursor-pointer hover:opacity-60 transition-all duration-200"
        >
          <FaRegCommentAlt className="text-2xl text-pure-greys-50" />
          {/* <FaCommentAlt />t<p className="text-lg">{post.comments.length}</p> */}
          <p>{totalComments}</p>
        </button>

        {isModalOpen && (
          <div>
            <CommentsModal
              token={token}
              postId={postId}
              updateCommentNumber={setTotalComments}
              numberOfComment={totalComments}
              userId={userId}
              postUserId={postUserId}
              changeIsModalOpen={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
        )}
      </div>
      <div className="w-full h-[2px] bg-yellow-600 mt-8"></div>
    </div>
  );
};

export default PostCard;
