import React, { useEffect, useState } from 'react';
import { accessChat } from '../../services/operations/chatAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getAllUserData } from '../../services/operations/profileAPI';
import { followUser, getFollowersForUser, getFollowingForUser, unfollowUser } from '../../services/operations/friendAPI';

const UserProfile = ({ userId , handleSearchItemClick}) => {

  const searchedUserId = userId?._id;
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [totalFollower, setTotalFollower] = useState(userId?.followers?.length);
  // const [totalFollowing, setTotalFollowing] = useState(userId?.followeing?.length);
  const [isFollowBack, setIsFollowBack] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  const [userData, setUserData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUserData(token);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    const fetchAllFollowers = async () => {
      try {
        const response = await getFollowersForUser(searchedUserId , token);
        setFollowers(response);
        
      } catch (error) {
        console.error("Error in fetching followers of user:", error.message);
      }
    };
    if (token) {
      fetchAllFollowers();
    }
  }, [token ,searchedUserId , totalFollower]);

  const fetchAllFollowing = async () => {
      try {
        const response = await getFollowingForUser(searchedUserId , token);
        setFollowing(response);
        
      } catch (error) {
        console.error("Error in fetching following for user", error.message);
      }
    };

  useEffect(() => {
    fetchAllFollowing()
  }, [token ,searchedUserId , userId]);

useEffect(() => {
  const checkFollowingStatus = async () => {
    try {
      if(followers.some(follower => follower.follower === userData?.userDetails?._id)){
        setIsFollowing(userData?.userDetails?._id);
      } else if(Array.isArray(following) && following.some(follow => follow.following === userData?.userDetails?._id)){
        setIsFollowBack(true);
      } else {
        setIsFollowing(false);
        setIsFollowBack(false);
      }
    } catch (error) {
      console.error("Error checking following status:", error.message);
    }
  };
  checkFollowingStatus();
}, [token , userId, searchedUserId, followers, following, userData]);


  // useEffect(() => {
  //   const checkFollowingStatus = async () => {
  //     try {
  //       if(followers.some(follower => follower.follower === userData?.userDetails?._id)){
  //         setIsFollowing(true);
  //       }
  //       else if(Array.isArray(following) && following.some(follow => follow.following === userData?.userDetails?._id)){
  //         setIsFollowBack(true);
  //       }
  //     } catch (error) {
  //       console.error("Error checking following status:", error.message);
  //     }
  //   };
  //   if (token && searchedUserId) {
  //     checkFollowingStatus();
  //   }
  // }, [token, searchedUserId, userData , handleSearchItemClick]);

  console.log("FOFOFOFOFOFOFOFOFOFOFOFOOFOFOFO",isFollowing)
  console.log("FBFBFBFBFBFBFBFBFBFBFBFBFBFBFBF",isFollowBack);


  const handleFollowButtonClick = async () => {
    try {
      if (!isFollowing && !isFollowBack) {
        await followUser(searchedUserId, token);
        setTotalFollower(totalFollower + 1)
        setIsFollowing(true);
      } else if (!isFollowing && isFollowBack) {
        await followUser(searchedUserId, token);
        setIsFollowing(true);
      } else if (isFollowing) {
        await unfollowUser(searchedUserId, token);
        setTotalFollower(totalFollower - 1)
        // setTotalFollowing()
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const messageClickHandler = async () => {
    try {
      const response = await accessChat(searchedUserId, token);
      console.log("Response:", response);
      navigate(`/chat/${response?._id}`);
    } catch (error) {
      console.error('Error in accessing chat:', error.message);
      toast.error('Failed to access chat. Please try again.');
    }
  };

  return (
    <div className='flex flex-row justify-center mx-auto gap-20'>
      <div className='flex flex-col gap-8 items-center'>
        <img src={userId?.image} alt='' className="w-32 h-32 rounded-full mr-4" />
        <div className='flex flex-row gap-2'>
          <button
          className={`bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-200`}
          onClick={handleFollowButtonClick}
          >
            {isFollowing ? 'Following' : isFollowBack ? 'Follow Back' : 'Follow'}
          </button>
          <button
            className="bg-blue-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-blue-200"
            onClick={messageClickHandler}
          >
            Message
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='text-richblack-5 text-2xl'>{userId?.username}</h1>
        <div className='flex flex-col'>
          <p className='text-richblack-5 text-lg font-bold'>{userId?.firstName} {userId?.lastName}</p>
          <p className='text-richblack-25 text-lg'>{userId?.additionalDetails?.bio}</p>
        </div>
        <div className='flex flex-row gap-4'>
          <p className='text-richblack-25 cursor-pointer'>
            {userId?.posts.length > 0 ? userId.posts.length : 0}
            <span className='text-richblack-100'>  Posts</span>
          </p>
          <p className='text-richblack-25 cursor-pointer'>
            {followers?.followers?.length > 0 ? followers?.followers?.length : 0}
            <span className='text-richblack-100'>  Followers</span>
          </p>
          <p className='text-richblack-25 cursor-pointer'>
            {following?.following?.length > 0 ? following?.following?.length : 0}
            <span className='text-richblack-100'>  Following</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;