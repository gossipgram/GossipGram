import React from "react";
import UserProfile from "../Components/Profile/UserProfile";
import { getAllUserData } from "../services/operations/profileAPI";
import { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token").split('"')[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUserData(token);
        setUserData(response);
        // setRecentSearches(response?.userDetails?.recentSearches);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);
  const userId = userData?._id;

  return (
    <div>
      {/* <UserProfile
      // userData={userData}
      // userId={userId}
      // matchingUsers={matchingUsers}
      // handleSearchItemClick={handleSearchItemClick}
      /> */}
    </div>
  );
};

export default Profile;
