import React from 'react'

const RightChat = ({ message }) => {
  return (
    <div className="bg-richblue-200 p-2 rounded-lg shadow-md mb-2 max-w-[40rem]">
        <p className="text-richblack-5">{message}</p>
    </div>
  )
}

export default RightChat
