import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CommentCard from "./CommentCard";

const CommentsModal = ({ modalData, changeIsModalOpen }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0   grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" w-2/5 h-4/5 rounded-lg border border-richblack-400 bg-richblack-800 p-6">
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
              <CommentCard comment={comment} key={comment._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsModal;
