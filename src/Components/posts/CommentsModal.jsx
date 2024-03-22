import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CommentCard from "./CommentCard";
import { createComment } from "../../services/operations/commentsAPI";
import { MdToken } from "react-icons/md";

const CommentsModal = ({
  modalData,
  changeIsModalOpen,
  postId,
  token,
  updateCommentNumber,
  numberOfComment,
}) => {
  const [commentText, setCommentText] = useState("");
  const commentChangeHandler = (event) => {
    setCommentText(event.target.value);
  };
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    try {
      createComment(commentText, postId, token);
      updateCommentNumber(numberOfComment + 1);
    } catch (error) {
      console.log("error while creating comment");
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 z-[1000]   grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" w-2/5  max-h-2/3 h-4/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold  text-richblack-5">Comments</p>
          <button
            onClick={changeIsModalOpen}
            className="cursor-pointer rounded-full text-white p-2 text-xl"
          >
            <RxCross2 />
          </button>
        </div>
        {modalData.length === 0 ? (
          <div className="h-full">
            <p className="text-richblack-5 h-full text-3xl flex items-center justify-center">
              No Comments
            </p>
          </div>
        ) : (
          <div className="w-full flex gap-5 flex-col mt-7">
            {modalData.map((comment) => (
              <CommentCard
                comment={comment}
                key={comment._id}
                token={token}
                updateCommentNumber={updateCommentNumber}
                totalComments={numberOfComment}
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
            onChange={commentChangeHandler}
            className="bg-richblack-500 rounded-lg text-richblack-5 py-3 px-5 text-lg pr-32 block w-full border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200"
          />
          <button
            onClick={commentSubmitHandler}
            className="absolute  inset-y-2 w-lg right-2  px-4 h-10  bg-yellow-200 text-white font-semibold rounded-2xl hover:bg-yellow-300 focus:outline-none focus:bg-yellow-400"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsModal;
