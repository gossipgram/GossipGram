import React, { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import {
  deleteCommentById,
  updateCommentById,
} from "../../services/operations/commentsAPI";
import { MdOutlineCancel, MdOutlineDoneAll } from "react-icons/md";
import ConfirmationModal from "../../Components/common/ConfirmationModal";

const CommentCard = ({
  comment,
  token,
  updateCommentNumber,
  totalComments,
}) => {
  // const [commentUser, setCommentUser] = useState(true);
  // const [postUser, setPostUser] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment?.text);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const confirmDeleteHandler = () => {
    try {
      deleteCommentById(comment?._id, token);
      updateCommentNumber(totalComments - 1);
      setShowDeleteModal(false);
    } catch (error) {
      console.log(`error while delteing the modal ${error}`);
    }
  };

  const deleteHandler = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You want to delete this comment.",
      btn1Text: "Yes",
      btn2Text: "No",
      btn1Handler: () => confirmDeleteHandler(),
      btn2Handler: () => cancelDeleteHandler(),
    });
    setShowDeleteModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const handelTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const doneHandler = () => {
    try {
      if (!(editedText === "")) {
        updateCommentById(editedText, comment?._id, token);
      }

      setIsEditing(false);
    } catch (error) {
      console.log("error while updating comment");
      console.error(error);
    }
  };
  const cancelHandler = () => {
    setEditedText(comment?.text);
    setIsEditing(false);
  };
  return (
    <div className="flex flex-col  bg-richblack-700 py-3 px-5 rounded-xl">
      <div className="flex items-center gap-3 w-full ">
        <img
          src={comment?.user?.image}
          width={50}
          className="rounded-full"
        ></img>
        <div className="flex gap-3 w-3/4  ">
          <p className="text-richblack-5 w-90% font-bold">
            {comment?.user?.username}
          </p>

          <div className="flex flex-col gap-1  w-full ">
            {isEditing ? (
              <textarea
                value={editedText}
                onChange={handelTextChange}
                spellCheck="false"
                className="text-richblack-5 resize-none w-full p-2 overflow-hidden outline-none border rounded-lg bg-richblack-500 "
              />
            ) : (
              <div className="w-full">
                <p
                  className="text-richblack-25 "
                  style={
                    {
                      // overflow: "hidden",
                    }
                  }
                >
                  {comment?.text}
                </p>
              </div>
            )}

            {isEditing ? (
              <div className="flex gap-5 items-center ">
                <p
                  onClick={doneHandler}
                  className="text-richblack-300 text-sm flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition-all duration-200"
                >
                  <MdOutlineDoneAll />
                  Done
                </p>
                <p
                  onClick={cancelHandler}
                  className="text-richblack-300 flex text-sm items-center gap-1 cursor-pointer hover:text-yellow-400 transition-all duration-200"
                >
                  <MdOutlineCancel />
                  Cancel
                </p>
              </div>
            ) : (
              <div className="flex gap-5 items-center ">
                <p
                  onClick={editHandler}
                  className="text-richblack-300 flex text-sm items-center gap-1 cursor-pointer hover:text-yellow-400 transition-all duration-200"
                >
                  <MdOutlineEdit />
                  Edit
                </p>
                <p
                  onClick={deleteHandler}
                  className="text-richblack-300 text-sm flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition-all duration-200"
                >
                  <MdDeleteOutline />
                  Delete
                </p>

                {showDeleteModal && (
                  <ConfirmationModal modalData={confirmationModal} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
