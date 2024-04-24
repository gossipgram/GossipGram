import React, { useEffect, useState } from 'react'
import { getAllRequestById } from '../../services/operations/FollowRequestAPI';
import RequestCard from './RequestCard';

const NotificationDrawer = ({ isOpen, onClose , userData}) => {

    const token = localStorage.getItem("token").split('"')[1];
    const userId = userData._id;
    const [allFollowRequest, setAllFollowRequest] = useState([])
    const [requestChange, setRequestChange] = useState(false);

    useEffect(() => {
        const fetchAllRequest = async () => {
            try {
                const response = await getAllRequestById(token);
                // Extract only the required fields from each request
                const formattedRequests = response.requests.map(request => ({
                    _id: request._id,
                    followerId: request.follower,
                    followingId: request.following,
                }));
                setAllFollowRequest(formattedRequests);
                console.log("response________", response);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        if (token) {
            fetchAllRequest();
        }
    }, [token , requestChange]);

    console.log("allFollowRequest",allFollowRequest)

  return (
    <div
      className={`fixed flex flex-col top-0 left-32 h-full bg-richblack-700 z-50 transition-all duration-700 ${
        isOpen ? "w-96 shadow-lg transition-all duration-700" : "w-0"
      }`}
    >
      <div className="p-4">
        <h1 className="text-richblack-5 text-2xl font-bold">
          Notifications
        </h1>
      </div>
        <div>
            {allFollowRequest.map((request) => {
                console.log("request",request);
                return(
                <RequestCard
                    key={request.followerId._id}
                    id={request.followerId._id}
                    username={request.followerId.username}
                    userImage={request.followerId.image}
                    firstName={request.followerId.firstName}
                    lastName={request.followerId.lastName}
                    requestId={request._id}
                    setRequestChange={setRequestChange}
                />
                )
            })}
        </div>

    </div>
  );
}

export default NotificationDrawer
