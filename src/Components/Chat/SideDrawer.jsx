import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { getAllUsers } from "../../services/operations/authAPI";
import { getAllUserData } from "../../services/operations/profileAPI";
import { createGroupChat } from "../../services/operations/chatAPI";

const SideDrawer = ({ handleToggleSideDrawer }) => {
    const [allUsers, setAllUsers] = useState([]);
    const token = localStorage.getItem("token").split('"')[1];
    const [searchQuery, setSearchQuery] = useState("");
    const [selecteduser, setSelecteduser] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [groupName, setGroupName] = useState('');

    const handleSearchUserInput = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleUserClick = (user, event) => {
        if (!selecteduser.some((selecteduser) => selecteduser._id === user._id)) {
            setSelecteduser([...selecteduser, user]);
            setSelectedUserId([...selectedUserId , user._id])
        }
        setSearchQuery("");
    };
    console.log("selecteduser",selecteduser)
    console.log("selectedUserId",selectedUserId)

    const handleRemoveUser = (userId) => {
        setSelecteduser(selecteduser.filter((user) => user._id !== userId));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getAllUserData(token);
                const followingData = response.userDetails.following.map(follow => ({
                    _id: follow.following._id,
                    username: follow.following.username,
                    image: follow.following.image
                    // Add more properties if needed
                }));
                setAllUsers(followingData);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };
        if (token) {
            fetchUserData();
        }
    }, [token]);

    let data = new FormData();
    const createHandler = async () => {
        try{
            data.append("name", groupName);
            data.append("users",selectedUserId );
            const response = await createGroupChat(token , data)
            console.log(response)
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    }

    return (
        <div className="flex flex-col fixed top-10 left-40 w-[26rem] h-[95%] bg-gray-800 text-white p-4 bg-richblack-600 gap-8">
            <div className="flex flex-row items-center justify-between px-5">
                <h1 className=" text-yellow-300  text-2xl  mt-5">Create Your Group</h1>
                <RxCross2 className="w-10 h-10 text-white mt-4 cursor-pointer" onClick={handleToggleSideDrawer} />
            </div>

            <div className="flex flex-row items-center gap-2 ">
                <label htmlFor="bio" className="text-[20px] text-richblack-5">
                    Group Name<sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="text"
                    name="bio"
                    id="bio"
                    maxLength={25}
                    placeholder="Enter Group Name"
                    className="rounded-xl bg-richblack-400 p-3 text-[16px] leading-[24px] text-richblack-5  placeholder:text-richblack-600 focus:outline-none"
                    onChange={e => setGroupName(e.target.value)}
                />
                {/* <span className="text-xs text-right text-richblack-5">{wordCount}/100 characters</span> */}
            </div>

            <div className="flex flex-row items-center gap-2 ">
                <label htmlFor="tagUser" className="text-richblack-25 text-2xl">
                    Users<sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="text"
                    id="tagUser"
                    placeholder="Search user...."
                    onChange={handleSearchUserInput}
                    value={searchQuery}
                    className="bg-richblack-500 py-3 text-lg text-richblack-25 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 transition-all duration-300"
                />
            </div>
            <div className="flex flex-wrap gap-2 mt-2 max-h-40 scrolling">
                {selecteduser.map((selecteduser) => (
                    <div
                        key={selecteduser._id}
                        className="border border-yellow-200 bg-richblack-600 text-richblue-25 px-4 py-2 rounded-lg flex gap-2 items-center"
                    >
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                            src={selecteduser.image}
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        <span>{selecteduser.username}</span>
                        <button onClick={() => handleRemoveUser(selecteduser._id)}>
                            <RxCross2 />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex flex-col overflow-y-auto max-h-96 gap-2 scrolling">
                {searchQuery &&
                    allUsers
                        ?.filter((user) =>
                            user?.username
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                        )
                        .map((user) => (
                            <button
                                className="flex gap-3 items-center  bg-richblack-600 w-full px-5 py-2 rounded-xl hover:bg-richblack-500 transition-all duration-200"
                                key={user._id}
                                onClick={() => handleUserClick(user)}
                            >
                                <img
                                    src={user.image}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <span className="text-richblack-25">{user.username}</span>
                            </button>
                        ))}
            </div>
            <button
                className={`flex items-center justify-center
                border border-yellow-50 bg-yellow-200
                cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-300 mt-auto`} // Added mt-auto to move button to the bottom
                onClick={createHandler}
            >
                Create
            </button>
        </div>
    );
};

export default SideDrawer;
