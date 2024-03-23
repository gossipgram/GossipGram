import React, { useEffect, useState } from 'react';
import { accessChat } from '../../services/operations/chatAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getAllUserData } from '../../services/operations/profileAPI';
import { followUser, getFollowersForUser, getFollowingForUser, unfollowUser } from '../../services/operations/friendAPI';


const UserProfile = ({ userId }) => {
  const searchedUserId = userId?._id;
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  const [userData, setUserData] = useState([]);
  const [isFollowback, setIsFollowback] = useState(false) ;
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

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
    const fetchAllFollowings = async () => {
      try {
        const response = await getFollowingForUser(userId , token);
        setFollowing(response);
        
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchAllFollowings();
    }
  }, [token ,userId]);


  useEffect(() => {
    const checkFollowing = () => {
    try {
      if (userData?.following?.includes(searchedUserId)) {
        setIsFollowing(true);
      } else if (userData?.followers?.includes(searchedUserId)) {
        setIsFollowback(true);
      } else {
        setIsFollowing(false);
        setIsFollowback(false);
      }
    } catch (error) {
      console.error('Error checking following:', error.message);
    }
  };
    checkFollowing();
  }, [userData, searchedUserId , token]);

  const handleFollowButton = async () => {
  try {
    if (!isFollowing && !isFollowback) {
      const response = await followUser(searchedUserId, token);
      console.log("Response:", response);
      setIsFollowing(true);
    } else if (!isFollowing && isFollowback) {
      const response = await followUser(searchedUserId, token);
      console.log("Response:", response);
      setIsFollowing(true);
    } else if (isFollowing) {
      const response = await unfollowUser(searchedUserId, token);
      console.log("Response:", response);
      setIsFollowing(false);
      setIsFollowback(false);
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
            className={`bg-${isFollowing ? 'yellow' : 'blue'}-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-${isFollowing ? 'yellow' : 'blue'}-200`}
            onClick={handleFollowButton}
          >
            {isFollowing ? 'Following' : isFollowback ? 'Follow Back' : 'Follow'}
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
            {userId?.followers.length > 0 ? userId.followers.length : 0}
            <span className='text-richblack-100'>  Followers</span>
          </p>
          <p className='text-richblack-25 cursor-pointer'>
            {userId?.following.length > 0 ? userId.following.length : 0}
            <span className='text-richblack-100'>  Following</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
