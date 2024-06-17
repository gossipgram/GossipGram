import React, { useEffect, useState } from "react";
import { accessChat } from "../../services/operations/chatAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { getAllUserData } from "../../services/operations/profileAPI";
import { FaRegEdit } from "react-icons/fa";
import {
  followUser,
  getFollowersForUser,
  getFollowingForUser,
  unfollowUser,
} from "../../services/operations/friendAPI";
import { FaCheck } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import PostGrid from "./PostGrid";
import PostRow from "./PostRow";
import TaggedPost from "./TaggedPost";
import FollowerModal from "./FollowerModal";
import FollowingModal from "./FollowingModal";
import {
  FollowRequestById,
  cancelFollowRequest,
  sendRequest,
} from "../../services/operations/FollowRequestAPI";

const UserProfile = ({ userId, matchingUsers, userData }) => {
  console.log("userId", userId);
  // console.log("matchingUsers",matchingUsers);
  // console.log("userData", userData);
  const { step } = useSelector((state) => state.userProfile);
  const searchedUserId = userId?._id;
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [totalFollower, setTotalFollower] = useState(userId?.followers?.length);
  // const [totalFollowing, setTotalFollowing] = useState(userId?.followeing?.length);
  const [isFollowBack, setIsFollowBack] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [itsUser, setItsUser] = useState(false);
  const [postSection, setPostSection] = useState("Posts");
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [followerDetails, setFollowerDetails] = useState([]);
  const [requestDetails, setRequestDetails] = useState([]);
  // const searchedUser = Array.isArray(matchingUsers) ? matchingUsers.find(user => user._id === searchedUserId) : null;
  const [searchedUser, setSearchedUser] = useState([]);
  const [requestedUser, setRequestedUser] = useState(false);

  useEffect(() => {
    if (matchingUsers && matchingUsers.length > 0) {
      const foundUser = matchingUsers.find(
        (user) => user._id === searchedUserId
      );
      setSearchedUser(foundUser || null);
    }
  }, [matchingUsers, searchedUserId , requestedUser]);

  const steps = [
    {
      id: 1,
      title: "Posts",
    },
    {
      id: 2,
      title: "Gossip",
    },
    {
      id: 3,
      title: "Tagged",
    },
  ];
  console.log("userId.isPrivate ",userId.isPrivate );
  console.log("isFollowing",userId.isPrivate );
  const openFollowerModal = (userId) => {
    !userId.isPrivate || isFollowing &&
    setIsFollowerModalOpen(true);
    setFollowerDetails(userId);
  };

  const openFollowingModal = (userId) => {
    !userId.isPrivate || isFollowing &&
    setFollowerDetails(userId);
    setIsFollowingModalOpen(true);
  };

  useEffect(() => {
    const fetchAllFollowers = async () => {
      try {
        const response = await getFollowersForUser(searchedUserId, token);
        setFollowers(response.followers); // Extract followers array from the response
      } catch (error) {
        console.error("Error in fetching followers of user:", error.message);
      }
    };
    if (token) {
      fetchAllFollowers();
    }
  }, [token, searchedUserId, totalFollower , userId]);

  const fetchAllFollowing = async () => {
    try {
      const response = await getFollowingForUser(searchedUserId, token);
      setFollowing(response.following);
    } catch (error) {
      console.error("Error in fetching following for user", error.message);
    }
  };

  useEffect(() => {
    fetchAllFollowing();
  }, [token, searchedUserId, userId]);
  console.log("+++++++++==",following)

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        if (searchedUserId === userData?.userDetails?._id) {
          console.log("inside if ");
          setItsUser(true);
          setIsFollowing(false);
        } else if (
          Array.isArray(followers) &&
          followers.some(
            (follower) => follower?.follower?._id === userData?.userDetails?._id
          )
        ) {
          console.log("inside 1 elseif");
          setIsFollowing(true);
          setItsUser(false);
        } else if (
          Array.isArray(following) &&
          following.some(
            (follow) => follow?.following?._id === userData?.userDetails?._id
          )
        ) {
          console.log("inside 2 elseif");
          setIsFollowBack(true);
          setIsFollowing(false);
          setItsUser(false);
        } else {
          console.log("inside else");
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

  const handleFollowButtonClick = async () => {
    // FOLLOW REQUEST CHANGES
    try {
      if (itsUser) {
      } else if (!isFollowing && !isFollowBack && !requestedUser) {
        await sendRequest(searchedUserId, token);
        // setTotalFollower(totalFollower + 1);
        // setIsFollowing(true);
        setRequestedUser(true);
      } else if (requestedUser){
        const data = {};
        data.followerId = userData?.userDetails?._id;
        data.followingId = userId._id;
        await cancelFollowRequest(data , token);
        setIsFollowing(false);
        setRequestedUser(false);
      }else if (!isFollowing && isFollowBack) {
        await followUser(searchedUserId, token);
        setTotalFollower(totalFollower + 1);
        setIsFollowing(true);
      } else if (isFollowing) {
        await unfollowUser(searchedUserId, token);
        setTotalFollower(totalFollower - 1);
        // setTotalFollowing()
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const data = {};
        data.followerId = userData?.userDetails?._id;
        data.followingId = userId._id;
        const response = await FollowRequestById(data, token);
        // console.log("response",response);
        if(response.success === true){
          setRequestedUser(true);
        }else {
          setRequestedUser(false);
        }
        // setFollowers(response.followers); // Extract followers array from the response
      } catch (error) {
        console.error("Error in fetching followers of user:", error.message);
      }
    };
    if (token) {
      fetchRequestDetails();
    }
  }, [token , userId, searchedUserId, followers, following, userData]);
  console.log("requestedUser____________",requestedUser)

  const messageClickHandler = async () => {
    try {
      const response = await accessChat(searchedUserId, token);
      navigate(`/chat/${response?._id}`); // check later for this ${response?._id}
    } catch (error) {
      console.error("Error in accessing chat:", error.message);
      toast.error("Failed to access chat. Please try again.");
    }
  };
  console.log("search", searchedUserId);

  return (
    <div className="flex flex-col mx-auto gap-2">
      <div className="flex flex-row justify-center mx-auto gap-20">
        <div className="flex flex-col gap-8 items-center">
          <img
            src={userId?.image}
            alt=""
            className="w-32 h-32 rounded-full mr-4"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-richblack-5 text-2xl">{userId?.username}</h1>
          <div className="flex flex-col">
            <p className="text-richblack-5 text-lg font-bold">
              {userId?.firstName} {userId?.lastName}
            </p>
            <p className="text-richblack-25 text-lg">
              {userId?.additionalDetails?.bio}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-richblack-25 cursor-pointer">
              {userId?.posts?.length > 0 ? userId.posts.length : 0}
              <span className="text-richblack-100"> Posts</span>
            </p>

            <p
              className="text-richblack-25 cursor-pointer"
              onClick={() => openFollowerModal(userId)}
            >
              {followers?.length > 0 ? followers?.length : 0}
              <span className="text-richblack-100"> Followers</span>
            </p>
            {isFollowerModalOpen && (
              <FollowerModal
                setTotalFollower={setTotalFollower}
                totalFollower={totalFollower}
                setIsFollowing={setIsFollowing}
                handleFollowButtonClick={handleFollowButtonClick}
                isFollowing={isFollowing}
                isFollowBack={isFollowBack}
                itsUser={itsUser}
                followers={followers}
                followerDetails={followerDetails}
                userData={userData}
                changeIsFollowerModalOpen={() => {
                  setIsFollowerModalOpen(false);
                }}
              />
            )}

            <p
              className="text-richblack-25 cursor-pointer"
              onClick={() => openFollowingModal(userId)}
            >
              {following?.length > 0 ? following?.length : 0}
              <span className="text-richblack-100"> Following</span>
            </p>
            {isFollowingModalOpen && (
              <FollowingModal
                handleFollowButtonClick={handleFollowButtonClick}
                isFollowing={isFollowing}
                isFollowBack={isFollowBack}
                itsUser={itsUser}
                following={following}
                followerDetails={followerDetails}
                userData={userData}
                changeIsFollowingModalOpen={() => {
                setIsFollowingModalOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
      
        <div className="flex flex-row w-full items-center justify-center gap-2">
          <button
            className={`w-1/2 flex flex-row items-center justify-center gap-3 bg-${
              isFollowing ? "yellow" : isFollowBack ? "blue" : "blue"
            }-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-${
              isFollowing ? "yellow" : isFollowBack ? "blue" : "blue"
            }-200 ${ requestedUser ? "cursor-pointer rounded-md bg-richblack-500 py-1 px-2 text-richblack-900 hover:bg-richblack-600" : ""}`}
            onClick={handleFollowButtonClick}
          >
            {/* {itsUser && <FaRegEdit />} */}
            {itsUser
              ? "Edit profile"
              : requestedUser
              ? "Requested"
              : isFollowing
              ? "Following"
              : isFollowBack
              ? "Follow Back"
              : "Follow"}
          </button>
          <button
            className=" w-1/2 bg-blue-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-blue-200"
            onClick={messageClickHandler}
          >
            {itsUser ? "Liked Posts" : "Message"}
          </button>
        </div>
 

      <div className="w-full h-[1px] bg-yellow-500 mt-12"></div>
      {!userId.isPrivate || isFollowing ?
        (
          <div>
          <div className="flex w-full justify-center gap-32">
            {steps.map((item) => (
              <div className="flex flex-col items-center" key={item.id}>
                <button
                  className={`grid cursor-pointer aspect-rectangle w-[70px] h-[40px] place-items-center rounded-xl border-[1px] mt-3 p-5${
                    postSection === item.title
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50 transition-all duration-200"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300 hover:text-yellow-400 transition-all duration-200"
                  } ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
                  onClick={() => setPostSection(item.title)}
                >
                  {item.title}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-yellow-500 mt-5 mb-5"></div>

          <div>
            {" "}
            {postSection === "Posts" ? (
              <PostGrid
                userId={userId}
                searchedUserId={searchedUserId}
                matchingUsers={matchingUsers}
              />
            ) : postSection === "Gossip" ? (
              <PostRow
                userData={userData}
                searchedUser={userId}
                searchedUserId={searchedUserId}
              />
            ) : postSection === "Tagged" ? (
              <TaggedPost
                userId={userId}
                searchedUserId={searchedUserId}
                matchingUsers={matchingUsers}
              />
            ) : (
              <PostGrid />
            )}
          </div>
          </div>
        ) : (
         <div className="max-w-md w-full rounded-lg p-8 mt-28 text-center">
          <div className="flex justify-center text-richblack-100 mx-auto mb-4">
            <MdLockOutline size={48} />
          </div>
          <h2 className="text-2xl font-bold text-richblack-5 mb-4">Private Account</h2>
          <p className="text-richblack-25">
            You need to follow this user to see their profile.
          </p>
          <button className="mt-6 px-4 py-2 bg-blue-100 text-richblack-900 rounded-lg hover:bg-blue-200 transition-colors">
            Follow
          </button>
        </div>)
      }
    </div>
  );
};

export default UserProfile;
