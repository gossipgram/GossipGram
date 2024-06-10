import React, { useEffect, useState } from "react";
import SearchedItem from "../Components/Search/SearchedItem";
import UserProfile from "../Components/Profile/UserProfile";
import { getAllUsers } from "../services/operations/authAPI";
import RecentSearched from "../Components/Search/RecentSearched";
import { useLocation } from "react-router-dom";
import {
  getAllUserData,
  getAllUserDataById,
} from "../services/operations/profileAPI";
import {
  addSearches,
  removeSearches,
} from "../services/operations/recentSearch";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const SearchPage = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const [allUsers, setAllUsers] = useState([]);
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  // const [userId, setUserId] = useState("");
  // const [recentSearches, setRecentSearches] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchedUserData, setSearchedUserData] = useState(null);
  const [isFollower, setIsFollower] = useState(false);
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  
  const handleShowUserProfile = () => {
    setShowUserProfile(true);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUsers(token);
        setAllUsers(res.users);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchAllUsers();
    }
  }, [token]);

  useEffect(() => {
    let allSearchedUser = [];
    const fetchUserData = async () => {
      try {
        const response = await getAllUserData(token);
        setUserData(response);
        // setSearchHistory(response?.userDetails?.recentSearches);

        response?.userDetails?.recentSearches.forEach((search) => {
          allSearchedUser.push(search?.searchedUser);
        });

        setSearchHistory(allSearchedUser);

        // Check if userData and userData.userDetails are defined before accessing recentSearches
        // if (
        //   response &&
        //   response.userDetails &&
        //   response.userDetails.recentSearches
        // ) {
        //   setRecentSearches(response.userDetails.recentSearches);
        // }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
      // setSearchHistory(allSeachId);
    }
  }, [token]);

  const changeHandler = (event) => {
    setSearchUser(event.target.value);
  };
  useEffect(() => {
    if (searchUser) {
      const filteredUsers = allUsers.filter((user) =>
        user?.username.toLowerCase().includes(searchUser.toLowerCase())
      );
      setMatchingUsers(filteredUsers);
    } else {
      setMatchingUsers([]);
    }
  }, [searchUser, allUsers]);



//   useEffect(() => {
//   const currentUsername = location.pathname.split("/").pop();
//   if (currentUsername) {
//     navigate(`/search/${currentUsername}`);
//     handleShowUserProfile();
//   }
// }, [location.pathname]); 




  const handleSearchItemClick = async (user, data) => {

    if (currentPath === `/search/${data.username}`) {
      setSearchedUserData(user);
      handleShowUserProfile();
    }

    if(userData.userDetails.username === data.username){
      navigate("/profile");
    }else{
    setSearchedUserData(user);
    navigate(`/search/${data.username}`)

    handleShowUserProfile();
    let alreadySearched = false;

    searchHistory.forEach((search) => {
      if (search._id === user._id) {
        alreadySearched = true;
      }
    });

    if (!alreadySearched) {
      setSearchHistory((searchHistory) => [...searchHistory, data]);
      addSearchedUser(user);
    }
  }
  };

  const handleRecentSearchItemClick = async (userId) => {
    const recentSearchUserId = userId._id;

    try {
      const response = await getAllUserDataById(recentSearchUserId, token);
      setIsFollower(response.isFollower);
      if(userData.userDetails.username === response.userDetails.username){
      navigate("/profile");
    }else{
      setSearchedUserData(response?.userDetails);
      
      navigate(`/search/${response?.userDetails?.username}`)
    }
      // setRecentSearches(response?.userDetails?.recentSearches);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }

    handleShowUserProfile();
  };

  const addSearchedUser = async (userId) => {
    try {
      const res = await addSearches(userId?._id, token);

      // setRecentSearches(userData?.userDetails?.recentSearches);
    } catch (error) {
      console.error("Error adding in recent search data:", error.message);
    }
  };

  const handleRemoveRecentSearch = async (user) => {
    try {
      setSearchHistory(
        searchHistory.filter((search) => {
          return search._id !== user;
        })
      );
      const res = await removeSearches(user, userData?.userDetails?._id, token);

      // setRecentSearches(userData?.userDetails?.recentSearches);
    } catch (error) {
      console.error("Error adding in recent search data:", error.message);
    }
  };

  return (
    <div className="flex flex-row p-10 gap-5 w-full h-screen justify-stretch">
      <div className="flex flex-col bg-richblack-700 w-4/12 h-full p-5 rounded-md gap-5">
        <h1 className="text-richblack-5 text-3xl font-semibold">SEARCH</h1>
        <form action="">
          <label className="w-full relative text-[0.875rem] text-pure-greys-5  mb-1 leading-[1.375rem]">
            <input
              required
              type="text"
              name="search"
              onChange={changeHandler}
              placeholder="Search"
              className="bg-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
          </label>
        </form>

        <div className="w-full h-[1px] bg-yellow-500 mt-5"></div>

        {searchUser ? (
          <SearchedItem
            matchingUsers={matchingUsers}
            handleSearchItemClick={handleSearchItemClick}
          />
        ) : searchHistory.length === 0 ? null : (
          <RecentSearched
            userData={searchHistory}
            handleSearchItemClick={handleRecentSearchItemClick}
            removeRecentSearch={handleRemoveRecentSearch}
            isFollower={isFollower}
          />
        )}
      </div>

      <div className="flex flex-row bg-richblack-800 w-full p-5 rounded-md overflow-y-scroll scroll-smooth scrolling">
        {showUserProfile && (
          <UserProfile
            userData={userData}
            userId={searchedUserData}
            matchingUsers={matchingUsers}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
