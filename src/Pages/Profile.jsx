import React from "react";
import { getAllUserData } from "../services/operations/profileAPI";
import { useState, useEffect } from "react";
import MyProfile from "../Components/Profile/MyProfile";

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
  console.log("userData",userData)
  const userId = userData?._id;

  return (
    <div>
      <MyProfile />
    </div>
  );
};

export default Profile;
