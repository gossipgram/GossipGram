import React from 'react'
import { RxCross2 } from "react-icons/rx";

const FollowingModal = ({ followerDetails , userData , following , changeIsFollowingModalOpen}) => {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="flex items-center justify-center w-1/5 max-h-1/3 h-3/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            <button
            onClick={changeIsFollowingModalOpen}
            className="absolute right-5 top-5 cursor-pointer rounded-full text-white p-2 text-2xl"
            >
                <RxCross2 />
            </button>
        </div>
      
    </div>
  )
}

export default FollowingModal
