import React from 'react'

const GroupUsers = ({infoUserImage , infoUserName , adminId}) => {
  return (
    <div
      className="w-full flex items-center p-4 border-b border-yellow-500 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-all duration-200"
    //   onClick={handleChatItemClick}
    >
      <img src={infoUserImage} alt="" className="w-10 h-10 rounded-full mr-4" />
      
        <div className='w-full flex justify-between'>
            <h3 className="font-semibold text-richblack-5 text-lg">{infoUserName}</h3>
            {infoUserName === adminId &&
            <p className="text-yellow-400 text-md">Admin</p>}
        </div>

    </div>
  )
}

export default GroupUsers
