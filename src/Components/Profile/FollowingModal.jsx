import React from 'react';
import { RxCross2 } from 'react-icons/rx'; 

const FollowingModal = ({ followerDetails, userData, following, changeIsFollowingModalOpen, handleFollowButtonClick, isFollowing, isFollowBack, itsUser }) => {
    return (
        <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="flex w-1/5 max-h-1/3 h-3/5 relative rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                
                <div className="flex flex-col mt-3 items-center w-full gap-3">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-2xl font-semibold text-richblack-5">Following</p>
                        <button
                            onClick={changeIsFollowingModalOpen}
                            className="cursor-pointer rounded-full text-white p-2 text-xl"
                        >
    
                            <RxCross2 />
                        </button>
                    </div>
                    {following.map((following, index) => (
                        <div key={index} className="flex items-center border-b w-full p-2 border-yellow-500 justify-between">
                            <div className="flex items-center">
                                <img src={following.following.image} alt={following.following.username} className="w-10 h-10 rounded-full mr-4" />
                                <div className='flex flex-col'>
                                    <span className="font-semibold text-richblack-5 text-lg">{following.following.username}</span>
                                    <p className="text-richblack-100 text-sm">{following.following.firstName} {following.following.lastName}</p>
                                </div>
                            </div>
                            <button
                                className={`ml-10 bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-2 hover:bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-200`}
                                onClick={() => handleFollowButtonClick(following.following._id)} 
                            >
                                {isFollowing ? 'Following' : isFollowBack ? 'Follow Back' : 'Follow'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FollowingModal;
