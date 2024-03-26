import React, { useEffect, useState } from 'react';
import { accessChat } from '../../services/operations/chatAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getAllUserData } from '../../services/operations/profileAPI';
import { followUser, getFollowersForUser, getFollowingForUser, unfollowUser } from '../../services/operations/friendAPI';
import { FaCheck } from "react-icons/fa"
import { useSelector } from 'react-redux';
import PostGrid from './PostGrid';
import PostRow from './PostRow';
import TaggedPost from './TaggedPost';

const UserProfile = ({ userId , handleSearchItemClick , matchingUsers}) => {

  const { step } = useSelector((state) => state.userProfile)
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
  const [itsUser, setItsUser] = useState(false);
  const [postSection, setPostSection] = useState('Posts')


  const steps = [
    {
      id: 1,
      title: "Posts",
    },
    {
      id: 2,
      title: "Videos",
    },
    {
      id: 3,
      title: "tagged",
    },
  ]

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

  console.log("User Details ID:", userData?.userDetails?._id);


  useEffect(() => {
  const fetchAllFollowers = async () => {
    try {
      const response = await getFollowersForUser(searchedUserId , token);
      setFollowers(response.followers); // Extract followers array from the response
    } catch (error) {
      console.error("Error in fetching followers of user:", error.message);
    }
  };
  if (token) {
    fetchAllFollowers();
  }
}, [token, searchedUserId, totalFollower]);


  const fetchAllFollowing = async () => {
      try {
        const response = await getFollowingForUser(searchedUserId , token);
        setFollowing(response.following);
        
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
      // console.log("User Details ID:", userData?.userDetails?._id);
      // console.log("Followers:", followers);
      console.log(":::::::::::::::::::::::::::::::::::",searchedUserId);
      console.log("|||||||||||||||||||||||||||||||||||",userData?.userDetails?._id)

      if(searchedUserId === userData?.userDetails?._id){
        setItsUser(true);
      } else if (Array.isArray(followers) && followers.some(follower => follower.follower === userData?.userDetails?._id)) {
        // console.log("Setting isFollowing to true");
        setIsFollowing(true);
        setItsUser(false);
      } else if (Array.isArray(following) && following.some(follow => follow.following === userData?.userDetails?._id)) {
        // console.log("Setting isFollowBack to true");
        setIsFollowBack(true);
        setItsUser(false);

      } else {
        // console.log("Setting both isFollowing and isFollowBack to false");
        setIsFollowing(false);
        setIsFollowBack(false);
        setItsUser(false);

      }
    } catch (error) {
      console.error("Error checking following status:", error.message);
    }
  };
  checkFollowingStatus();
}, [token, userId, searchedUserId, followers, following, userData]);


  // console.log("FOFOFOFOFOFOFOFOFOFOFOFOOFOFOFO",isFollowing)
  // console.log("FBFBFBFBFBFBFBFBFBFBFBFBFBFBFBF",isFollowBack);


  const handleFollowButtonClick = async () => {
    try {
      if(itsUser){

      }
        else if (!isFollowing && !isFollowBack) {
        await followUser(searchedUserId, token);
        setTotalFollower(totalFollower + 1)
        setIsFollowing(true);
      } else if (!isFollowing && isFollowBack) {
        await followUser(searchedUserId, token);
        setTotalFollower(totalFollower + 1)
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
    <div className='flex flex-col mx-auto gap-5'>

      <div className='flex flex-row justify-center mx-auto gap-20'>
        <div className='flex flex-col gap-8 items-center'>
          <img src={userId?.image} alt='' className="w-32 h-32 rounded-full mr-4" />
          <div className='flex flex-row gap-2'>
            <button
            className={`bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-${isFollowing ? 'yellow' : isFollowBack ? 'blue' : 'blue'}-200`}
            onClick={handleFollowButtonClick}
            >
              { itsUser ? 'Edit profile' : isFollowing ? 'Following' : isFollowBack ? 'Follow Back' : 'Follow'}
            </button>
            <button
              className="bg-blue-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-blue-200"
              onClick={messageClickHandler}
            >
              { itsUser ? 'Liked Posts' : 'Message' }
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
              {followers?.length > 0 ? followers?.length : 0}
              <span className='text-richblack-100'>  Followers</span>
            </p>
            <p className='text-richblack-25 cursor-pointer'>
              {following?.length > 0 ? following?.length : 0}
              <span className='text-richblack-100'>  Following</span>
            </p>
          </div>
        </div>
        </div>

        <div className='w-full h-[1px] bg-yellow-500 mt-5'></div>

      <div className="relative flex w-full justify-center gap-32">
        {steps.map((item) => (
          <div className="flex flex-col items-center" key={item.id}>
            <button
              className={`grid cursor-default aspect-square w-[70px] place-items-center rounded-full border-[1px] ${
                postSection === item.title
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              } ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
              onClick={() => setPostSection(item.title)}
            >
              {
                item.title
              }
            </button>
          </div>
        ))}
      </div>
      <div className='w-full h-[1px] bg-yellow-500 mt-5'></div>

      {/* <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2"
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div> */}
      <div>{postSection === "Posts" ? <PostGrid userId={userId} searchedUserId={searchedUserId} matchingUsers={matchingUsers}/> : postSection === "Videos" ? <PostRow /> : postSection=== "Tagged" ? <TaggedPost /> : <PostGrid />}</div>
    </div>
    
  );
};

export default UserProfile;



