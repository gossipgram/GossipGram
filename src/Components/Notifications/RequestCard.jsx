import React from 'react'
import { acceptRequest, rejectRequest } from '../../services/operations/FollowRequestAPI';

const RequestCard = ({id , username , userImage , firstName , lastName , requestId , setRequestChange}) => {
    const token = localStorage.getItem("token").split('"')[1];

    const acceptHandle = async (requestId) => {
        console.log("id_______",requestId);
        try {
            const response = await acceptRequest(requestId , token);
            console.log("response________", response);
            setRequestChange(true);
        } catch (error) {
        console.error("Error fetching user data:", error.message);
        }
    };

    const rejectHandle = async (requestId) => {
        console.log("id_______",requestId);
        try {
            const response = await rejectRequest(requestId , token);
            console.log("response________", response);
            setRequestChange(true);
        } catch (error) {
        console.error("Error fetching user data:", error.message);
        }
    };


  return (
    <div className="flex items-center p-4 border-b border-yellow-500 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-all duration-200">
      <img src={userImage} alt="" className="w-10 h-10 rounded-full mr-4" />
      <div className="flex-grow">
        <div>
          <h3 className="font-semibold text-richblack-5 text-lg">{username}</h3>
          <p className="text-richblack-100 text-sm">
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className={`flex items-center border border-yellow-50 bg-yellow-200 cursor-pointer gap-x-2 rounded-md py-1 px-2 font-semibold text-richblack-900 hover:bg-yellow-300`}
          onClick={() => acceptHandle(requestId)}
        >
          Accept
        </button>
        <button
          className="cursor-pointer rounded-md bg-richblack-700 py-1 px-2 font-semibold text-richblack-50"
          onClick={() => rejectHandle(requestId)}
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default RequestCard
