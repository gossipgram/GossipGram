import React, { useEffect, useState } from 'react'
import UserProfile from '../Components/Profile/UserProfile'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllUserData, getAllUserDataById } from '../services/operations/profileAPI';

const UsersProfile = () => {
    const token = localStorage.getItem("token").split('"')[1];
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const [clickedUser, setClickedUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getAllUserData(token);
                setUserData(response);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

            fetchUserData();
        
    }, [token]);

    useEffect(() => {
        const fetchUserDataById = async () => {
            try {
                const response = await getAllUserDataById(id, token);
                if (userData?.userDetails?.username === response?.userDetails?.username) {
                    navigate("/profile");
                } else {
                    setClickedUser(response?.userDetails);
                }
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };
        fetchUserDataById();
    }, [id, token]);


    return (
        <div className='mx-auto mt-4'>
            <UserProfile
                userData={userData}
                userId={clickedUser}
                matchingUsers={clickedUser}
            />
        </div>
    )
}

export default UsersProfile
