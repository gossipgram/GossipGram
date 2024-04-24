import React from "react";
import { getAllUserData } from "../services/operations/profileAPI";
import { useState, useEffect } from "react";
import MyProfile from "../Components/Profile/MyProfile";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token").split('"')[1];
  const navigate = useNavigate();

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

  const handleEditProfile = () => {
    navigate("/edit");
  };

  return (
    <div className="flex mx-auto mt-5">
      <MyProfile userData={userData} handleEditProfile={handleEditProfile} />
    </div>
  );
};

export default Profile;
