import React from "react";
import { getAllUserData } from "../services/operations/profileAPI";
import { useState, useEffect } from "react";
import MyProfile from "../Components/Profile/MyProfile";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Settings from "../Components/Profile/Settings";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isSetting, setIsSetting] = useState(false)
  const token = localStorage.getItem("token").split('"')[1];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUserData(token);
        setUserData(response.userDetails);
        
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
  console.log("response_________",userData)

  const handleEditProfile = () => {
    navigate("/edit");
  };

  return (
    <div className={`flex ${isSetting ? "w-full" : "mx-auto"} mt-5 h-[calc(100vh-5rem)]`}>
      {isSetting ? (
        <Settings userData={userData} handleEditProfile={handleEditProfile} setIsSetting={setIsSetting} setUserData={setUserData}/>
      ) : (
        <MyProfile userData={userData} handleEditProfile={handleEditProfile} setIsSetting={setIsSetting}/>
      )}
    </div>
  );
};

export default Profile;
