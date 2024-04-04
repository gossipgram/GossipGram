import React, { useEffect, useState } from 'react'
import ChangeDp from '../Components/Profile/ChangeDp'
import { getAllUserData } from '../services/operations/profileAPI';
import EditUser from '../Components/Profile/EditUser';

const EditProfile = () => {

    const [userData, setUserData] = useState([])
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
    }, [ token ]);

  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Profile
        </h1>
      <ChangeDp userData={userData}/>
      <EditUser userData={userData}/>
    </div>
  )
}

export default EditProfile
