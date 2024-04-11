import React from "react";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import CommentCard from "./CommentCard";
import { createComment } from "../../services/operations/commentsAPI";
import { MdToken } from "react-icons/md";
import { getAllCommentsForPost } from "../../services/operations/commentsAPI";

const CommentsModal = ({
  changeIsModalOpen,
  postId,
  token,
  updateCommentNumber,
  numberOfComment,
  userId,
  postUserId,
  closeModal,
}) => {
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const fetchAllCommnets = async () => {
    try {
      setLoading(true);
      const response = await getAllCommentsForPost(postId, token);
      setAllComments(response?.comments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments data");
    }
  };
  useEffect(() => {
    fetchAllCommnets();
  }, [token, numberOfComment]);

  const commentChangeHandler = (event) => {
    setCommentText(event.target.value);
  };
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    if (commentText === "") {
      return;
    }
    try {
      createComment(commentText, postId, token);
      updateCommentNumber(numberOfComment + 1);
      setCommentText("");
      fetchAllCommnets();
    } catch (error) {
      console.log("error while creating comment");
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 z-[1000]   grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm modal-overlay">
      <div className=" w-2/6  max-h-2/3 h-4/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <div className="flex  justify-between items-center ">
          <p className="text-2xl font-semibold  text-richblack-5">Comments</p>
          <button
            onClick={changeIsModalOpen}
            className="cursor-pointer rounded-full text-white p-2 text-xl"
          >
            <RxCross2 />
          </button>
        </div>
        {loading ? (
          <div className="flex h-4/5 flex-col items-center justify-center">
            <div className="spinner "></div>
          </div>
        ) : allComments?.length === 0 ? (
          <div className="h-5/6  w-full">
            <p className="text-richblack-5 h-full text-3xl flex items-center justify-center">
              No Comments
            </p>
          </div>
        ) : (
          <div className="w-full  flex gap-5 flex-col mt-7">
            {allComments?.map((comment) => (
              <CommentCard
                comment={comment}
                key={comment._id}
                token={token}
                updateCommentNumber={updateCommentNumber}
                totalComments={numberOfComment}
                fetchAllCommnets={fetchAllCommnets}
                userId={userId}
                postUserId={postUserId}
              />
            ))}
          </div>
        )}
        {/* comment input */}
        <form
          onSubmit={commentSubmitHandler}
          className="  w-[94%] flex flex-col justify-end absolute bottom-5  "
        >
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Write a comment here"
            spellCheck="false"
            onChange={commentChangeHandler}
            value={commentText}
            className="bg-richblack-500 rounded-lg text-richblack-5 py-3 px-5 text-lg pr-32 block w-full border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200"
          />
          <button
            onClick={commentSubmitHandler}
            className="absolute  inset-y-2 w-lg right-2  px-4 h-10  bg-yellow-300 text-richblack-5 font-semibold rounded-2xl hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400 transition-all duration-300"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsModal;
