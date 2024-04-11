import React from "react";
import { RxCross2 } from "react-icons/rx";
import PostCard from "../posts/PostCard";
import { useEffect } from "react";

const PostModal = ({ postDetails, userId, postUserId, changeIsModalOpen }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        changeIsModalOpen();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [changeIsModalOpen]);

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm modal-overlay">
      <div className="flex items-center justify-center w-2/5 max-h-2/3 h-4/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <button
          onClick={changeIsModalOpen}
          className="absolute right-5 top-5 cursor-pointer rounded-full text-white p-2 text-2xl"
        >
          <RxCross2 />
        </button>
        <PostCard post={postDetails} userId={userId} postUserId={postUserId} />
      </div>
    </div>
  );
};

export default PostModal;
