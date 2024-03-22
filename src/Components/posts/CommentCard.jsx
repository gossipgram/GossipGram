import React, { useState } from "react";

const CommentCard = ({ comment }) => {
  const [commentUser, setCommentUser] = useState(true);
  const [postUser, setPostUser] = useState(true);
  return (
    <div className="flex flex-col w-full bg-richblack-700 py-3 px-5 rounded-xl">
      <div className="flex items-center gap-3">
        {/* comment user image */}
        <img
          src={comment?.user?.image}
          width={50}
          className="rounded-full"
        ></img>

        {/* comment user name */}
        <p className="text-richblack-5 font-bold">{comment?.user?.username}</p>
        {/* comment text */}
        <div>
          <p className="text-richblack-25">{comment?.text}</p>
          {/* buttons for edit and delete  */}
          <div className="flex gap-5 items-center ">
            {/* delete button */}
            <div>
              <p className="text-richblack-300 text-md cursor-pointer hover:opacity-70 transition-all duration-200">
                Delete
              </p>
            </div>

            {/* update button  */}
            <div>
              <p className="text-richblack-300 cursor-pointer hover:opacity-70 transition-all duration-200">
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
