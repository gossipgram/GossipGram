import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { followUser , unfollowUser } from '../../services/operations/friendAPI';

const FollowerModal = ({ followerDetails, userData, followers, changeIsFollowerModalOpen , isFollowing , isFollowBack , itsUser , setIsFollowing , setTotalFollower , totalFollower}) => {
    // console.log("followerDetails   followerDetails", followerDetails);
    // console.log("userData    userData", userData);
    // console.log("followers followers followers", followers);
    const userId = userData?.userDetails?._id
    console.log("Id",userId)
    console.log("followers",followers)
    console.log("itsUser",itsUser)
    console.log("userData",userData)
    console.log("followerDetails",followerDetails)
    // console.log("",)
    // console.log("",)
    // console.log("",)
    const token = localStorage.getItem("token").split('"')[1];


    const followButtonClickHandler = async (clickedUser) => {
    try {
        if (!isFollowing && !isFollowBack) {
        await followUser(clickedUser, token);
        setTotalFollower(totalFollower + 1)
        setIsFollowing(true);
      } else if (!isFollowing && isFollowBack) {
        await followUser(clickedUser, token);
        setTotalFollower(totalFollower + 1)
        setIsFollowing(true);
      } else if (isFollowing) {
        await unfollowUser(clickedUser, token);
        setTotalFollower(totalFollower - 1)
        // setTotalFollowing()
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

    return (
        <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="flex w-1/5 max-h-1/3 h-3/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                
                <div className="flex flex-col mt-3 items-center w-full gap-3">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-2xl font-semibold text-richblack-5">Follower</p>
                        <button
                            onClick={changeIsFollowerModalOpen}
                            className="cursor-pointer rounded-full text-white p-2 text-xl"
                        >
    
                            <RxCross2 />
                        </button>
                    </div>
                    {followers.map((follower, index) => (
                        <div key={index} className="flex items-center border-b w-full p-2 border-yellow-500 justify-between">
                          <div className="flex items-center">
                            <img src={follower.follower.image} alt={follower.follower.username} className="w-10 h-10 rounded-full mr-4" />
                            <div className='flex flex-col'>
                              <span className="font-semibold text-richblack-5 text-lg">{follower.follower.username}</span>
                              <p className="text-richblack-100 text-sm">{follower.follower.firstName} {follower.follower.lastName}</p>
                            </div>
                          </div>
                          <button
                          className={`ml-10 bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-2 hover:bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-200`}
                          onClick={() => { followButtonClickHandler(follower.follower._id)}}
                          >
                            { isFollowing ? 'Following' : isFollowBack ? 'Follow Back' : 'Follow'}
                          </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowerModal;
