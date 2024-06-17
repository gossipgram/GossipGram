import React, { useEffect, useState } from "react";
import ChangeDp from "../Components/Profile/ChangeDp";
import { getAllUserData } from "../services/operations/profileAPI";
import EditUser from "../Components/Profile/EditUser";
import DeleteUserProfile from "../Components/Profile/DeleteUserProfile";
import ChangePassword from "../Components/Profile/ChangePassword";

const EditProfile = () => {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("token").split('"')[1];

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

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 overflow-x-hidden">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <ChangeDp userData={userData.userDetails} />
      <EditUser userData={userData.userDetails} />
      <ChangePassword />
      <DeleteUserProfile />
    </div>
  );
};

export default EditProfile;
