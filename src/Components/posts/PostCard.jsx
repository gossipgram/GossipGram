import React, { useState, useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegCommentAlt,
  FaRegHeart,
  FaCommentAlt,
  FaChessKing,
  FaPaypal,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getLikesForPost,
  likePost,
  unlikePost,
} from "../../services/operations/likesAPI";
import { FcLike } from "react-icons/fc";
import CommentsModal from "./CommentsModal";
import ConfirmationModal from "../common/ConfirmationModal";
import ExpandableText from "../common/ExpandableText";
import {
  deletePostById,
  updatePostById,
} from "../../services/operations/mediaAPI";
import { MdOutlineEdit, MdDeleteOutline, MdLink } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";

const PostCard = ({ post, userId, postUserId }) => {
  const [totalLike, setTotalLike] = useState(post?.likes?.length);
  const navigate = useNavigate();

  const postId = post?._id;
  const token = localStorage.getItem("token").split('"')[1];
  const [likeUser, setLikeUser] = useState([]);
  const [liked, setLiked] = useState(false);
  const [totalComments, setTotalComments] = useState(post?.comments?.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [postUser, setPostUser] = useState(false);
  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const [captionText, setCaptionText] = useState(post.caption);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showPauseButton, setShowPauseButton] = useState(false);
  const [videoHover, setVideoHover] = useState(false);
  const videoRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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

  useEffect(() => {
    const checkPostUser = () => {
      if (userId === postUserId) {
        setPostUser(true);
      }
    };
    checkPostUser();
  }, [token]);

  // all function for video post

  // function to toggle play and pause of the video
  const togglePlayer = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPauseButton(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPauseButton(false);
    }
  };

  // function to update progress bar
  const updateProgressBar = () => {
    const video = videoRef.current;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(progress);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPauseButton(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [videoHover]);

  const handleVideoHover = () => {
    setShowPauseButton(true);
  };

  // function to change the video time based on progressbar change
  // const updateVideoTime = (event) => {
  //   const video = videoRef.current;
  //   const clickedPosition = event.target.value / 100;
  //   video.currentTime = clickedPosition * video.duration;
  //   updateProgressBar();
  // };

  // all fucntion for three dot menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditPost = () => {
    setIsEditingPost(true);
    setIsMenuOpen(false);
  };

  const handleDeletePost = () => {
    setDeleteConfirmation({
      text1: "Are you sure?",
      text2: "The post will get deleted.",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: deletePostConfirmed,
      btn2Handler: () => setDeleteConfirmation(null),
    });
  };

  const deletePostConfirmed = () => {
    try {
      deletePostById(post, token);
      setIsDeletedPost(true);
    } catch (error) {
      alert("error while deleting the post");
      console.log(error);
    } finally {
      setDeleteConfirmation(false);
    }
  };

  const captionChangeHandler = (event) => {
    setEditedCaption(event.target.value);
  };

  const editSubmit = (event) => {
    event.preventDefault();
    try {
      const data = {};
      data.caption = editedCaption;

      updatePostById(post, data, token);
      setCaptionText(editedCaption);
    } catch (error) {
      alert("error while editing the post");
      console.log(error);
    } finally {
      setIsEditingPost(false);
    }
  };

  const editCancel = () => {
    setIsEditingPost(false);
  };

  const handleCopyLink = () => {};

  const clickHandler = (id) => {
    if (id === userId) {
      navigate("/profile");
    } else {
      navigate(`/user/${id}`);
    }
  };

  return (
    <div className="flex flex-col  max-w-lg pb-3 max-h-[750px] bg-richblack-800">
      {isDeletedPost ? (
        <div className="w-full h-[200px] flex items-center justify-center border-[1px] border-pure-greys-500 rounded-lg">
          <h1 className="text-xl text-richblack-50 ">
            This Post has been deleted
          </h1>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mr-5">
            <div
              className="py-5 flex items-center cursor-pointer"
              onClick={() => clickHandler(post.user._id)}
            >
              <img
                src={post.user.image}
                width={35}
                className="rounded-full mr-2"
                loading="lazy"
              ></img>
              <div className="text-white font-semibold">
                {post.user.username}
              </div>
            </div>
            <div className="relative ">
              <button
                onClick={toggleMenu}
                className="text-richblack-5 cursor-pointer text-xl hover:text-yellow-400 focus:text-yellow-400 transition-all duration-200 "
              >
                <BsThreeDotsVertical />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-6 bg-richblack-700  rounded-xl w-[200px] modal-overlay">
                  <div className="flex flex-col gap-3 m-5">
                    {postUser && (
                      <div className="flex flex-col gap-3">
                        {!post.titleText && (
                          <button
                            onClick={handleEditPost}
                            className=" px-4 py-2 text-richblack-50 flex items-center gap-3 bg-richblack-600 cursor-pointer rounded-xl hover:bg-richblack-500 hover:text-yellow-200 transition-all duration-200"
                          >
                            <MdOutlineEdit /> Edit Post
                          </button>
                        )}
                        <button
                          onClick={handleDeletePost}
                          className="px-4 py-2 text-richblack-50 flex items-center gap-3 bg-richblack-600 cursor-pointer rounded-xl hover:text-yellow-200 hover:bg-richblack-500 transition-all duration-200"
                        >
                          <MdDeleteOutline /> Delete Post
                        </button>
                      </div>
                    )}
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 text-richblack-50 flex items-center gap-3 bg-richblack-600 cursor-pointer rounded-xl hover:text-yellow-200 hover:bg-richblack-500 transition-all duration-200"
                    >
                      <MdLink /> Copy Link
                    </button>
                  </div>
                </div>
              )}
              {deleteConfirmation && (
                <ConfirmationModal
                  modalData={deleteConfirmation}
                  closeModal={() => setDeleteConfirmation(false)}
                />
              )}
            </div>
          </div>
          <div className="w-full flex items-center overflow-hidden border-[1px] border-pure-greys-500 rounded-lg">
            {post.mediaUrl.includes("video") ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  onMouseOut={() => setVideoHover(!videoHover)}
                  onMouseOver={handleVideoHover}
                  onTimeUpdate={updateProgressBar}
                  // className="w-full h-full object-cover z-10 bg-black"
                  className="flex items-center justify-center w-full h-full  "
                >
                  <source src={post?.mediaUrl} type="video/mp4" />
                  Your browser oes not support vide
                </video>

                <div
                  className="text-richblack-100 absolute top-[35%] left-[40%] text-8xl"
                  onClick={togglePlayer}
                >
                  {isPlaying ? (
                    showPauseButton && (
                      <FaPause className="cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105" />
                    )
                  ) : (
                    <FaPlay className="cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105" />
                  )}
                </div>

                {/* <div className="w-full">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={videoProgress}
                    onChange={updateVideoTime}
                    className="w-full video-progress-bar flex items-center justify-center"
                  />
                </div> */}
              </div>
            ) : post.mediaUrl.includes("image") ? (
              <img
                className=" w-full max-h-[512px] object-cover bg-black"
                src={post.mediaUrl}
              ></img>
            ) : (
              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-richblack-25 text-2xl font-bold">
                  {post.titleText}
                </h2>
                <p className="text-richblack-50 text-xl ml-5">
                  <ExpandableText text={captionText} maxLength={500} />
                </p>
              </div>
            )}

            {/*  */}
          </div>
          <div className="flex gap-x-5 mt-3 items-center">
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
                  closeModal={() => setIsModalOpen(false)}
                  changeIsModalOpen={() => {
                    setIsModalOpen(false);
                  }}
                />
              </div>
            )}
          </div>
          <div className="mt-1">
            {isEditingPost ? (
              <div className="flex gap-5">
                <input
                  className="bg-richblack-600 outline-none border-none rounded-lg text-lg text-richblack-50 px-5 py-2"
                  value={editedCaption}
                  onChange={captionChangeHandler}
                />
                <button
                  onClick={editSubmit}
                  className="text-richblack-5 bg-richblack-600 rounded-lg px-5 hover:text-yellow-200 hover:bg-richblack-500 transition-all duration-200"
                >
                  Done
                </button>
                <button
                  onClick={editCancel}
                  className="text-richblack-5 bg-richblack-600 rounded-lg px-5 hover:text-yellow-200 hover:bg-richblack-500 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className=" text-white">
                {!post.titleText ? (
                  <div>
                    <span className="font-semibold inline-flex">
                      {post.user.username}
                    </span>{" "}
                    <ExpandableText
                      className={"inline-flex"}
                      text={captionText}
                      maxLength={100}
                    />{" "}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="w-full h-[2px] bg-yellow-600 mt-8"></div>
    </div>
  );
};

export default PostCard;
