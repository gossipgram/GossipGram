import React, { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { deleteCommentById } from "../../services/operations/commentsAPI";

const CommentCard = ({
  comment,
  token,
  updateCommentNumber,
  totalComments,
}) => {
  const [commentUser, setCommentUser] = useState(true);
  const [postUser, setPostUser] = useState(true);
  const deleteHandler = () => {
    try {
      deleteCommentById(comment?._id, token);
      updateCommentNumber(totalComments - 1);
    } catch (error) {}
  };
  const editHandler = () => {
    console.log("edit button");
  };
  return (
    <div className="flex flex-col bg-richblack-700 py-3 px-5 rounded-xl">
      <div className="flex items-center gap-3 ">
        <img
          src={comment?.user?.image}
          width={50}
          className="rounded-full"
        ></img>
        <div className="flex gap-3">
          <p className="text-richblack-5 font-bold">
            {comment?.user?.username}
          </p>

          <div className="flex flex-col gap-1">
            <p className="text-richblack-25">{comment?.text}</p>
            <div className="flex gap-5 items-center ">
              <p
                onClick={deleteHandler}
                className="text-richblack-300 text-sm flex items-center gap-1 cursor-pointer hover:opacity-70 transition-all duration-200"
              >
                <MdDeleteOutline />
                Delete
              </p>
              <p
                onClick={editHandler}
                className="text-richblack-300 flex text-sm items-center gap-1 cursor-pointer hover:opacity-70 transition-all duration-200"
              >
                <MdOutlineEdit />
                Edit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
