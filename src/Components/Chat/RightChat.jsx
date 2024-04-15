import React from 'react'

const RightChat = ({ message , time}) => {
  return (
    <div className="flex flex-row bg-richblue-200 p-3 rounded-lg shadow-md mb-2 max-w-[40rem] ">
        <p className="text-richblack-5  max-w-[34rem]">{message}</p>
        <p className='text-richblack-100 text-xs flex justify-end items-end ml-2'>{time}</p>
    </div>
  )
}

export default RightChat
