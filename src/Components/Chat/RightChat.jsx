import React from 'react'

const RightChat = ({ message , time}) => {
  return (
    <div className="flex flex-col bg-richblue-200 p-2 rounded-lg shadow-md mb-2 max-w-[40rem] ">
        <p className="text-richblack-5">{message}</p>
        <p className='text-richblack-100 text-xs flex justify-end'>{time}</p>
    </div>
  )
}

export default RightChat
