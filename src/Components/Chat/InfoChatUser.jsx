import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import GroupUsers from './GroupUsers';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { addToGroup, renameGroup, updateGroupDp } from '../../services/operations/chatAPI';
import { FaCamera } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { getAllUserData } from "../../services/operations/profileAPI";
import { FiUpload } from "react-icons/fi"
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const InfoChatUser = ({ handleShowInfo, userData, chatUser , showInfo , setUpdatedGroupName , updatedGroupName , setChatUser , setUpdateGroupDp}) => {
  
  // console.log('userData', userData);
  console.log('chatUser', chatUser);
  const token = localStorage.getItem("token").split('"')[1];
  const isGroup = chatUser.isGroupChat
  const userUsername = userData?.userDetails?.username;
  let userName, userImage, id;
  const groupAdminUsernames = chatUser.groupAdmin.map(admin => admin.username);

  if (chatUser.isGroupChat) {
    userName = chatUser.chatName;
    userImage = chatUser.groupImage;
    id = chatUser._id;
  } else {
    const currentUser = chatUser.users.find((user) => user.username !== userUsername);
    userName = currentUser.username;
    userImage = currentUser.image;
    id = currentUser._id;
  }

  const [isRenameGroup, setIsRenameGroup] = useState(false)
  const [editedGroupName, setEditedGroupName] = useState(userName)
  const [addUser, setAddUser] = useState(false)
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selecteduser, setSelecteduser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate()


    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const userDetails = userData?.userDetails;
    const [noImage, setNoImage] = useState(false)
    const [updateButton, setUpdateButton] = useState(false)


    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
        setUpdateButton(true);
    }

    const handleFileUpload = async () => {
      if (!imageFile) {
          setNoImage(true)
          return;
      }
      try {
          
          setLoading(true);
          const formData = new FormData();
          formData.append("displayPicture", imageFile);
          formData.append("chatId",chatUser._id)
          const data = {};
          data.chatId = chatUser._id;

          const response = await updateGroupDp(token, formData)
          setLoading(false);
          console.log("response",response?.data);
          setChatUser(response?.data)
          setUpdateGroupDp(response?.data);
          
      } catch (error) {
          console.log("ERROR MESSAGE - ", error.message);
      }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log("file",file)
        if (file) {
        setImageFile(file)
        previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
        setPreviewSource(reader.result)
        }
    }

    useEffect(() => {
        if (imageFile) {
        previewFile(imageFile)
        }
    }, [imageFile])




  const handleChangeGroupName = () => {
    setIsRenameGroup(true);
    // setIsMenuOpen(false);  
  };

  const renameCancel = () => {
    setIsRenameGroup(false)
  }

  const GroupNameChangeHandler = (event) => {
    setEditedGroupName(event.target.value);
  }
  const handleAddUser = () => {
    setAddUser(true);
  }
  const handleHideAddUser = () => {
    setAddUser(false)
  }

  const editSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {};
      data.chatName = editedGroupName;
      data.chatId = chatUser._id;

      const response = await renameGroup(data , token);
      console.log("response",response)
      setUpdatedGroupName(response.chatName)
      
    } catch (error) {
      alert("error while rename group");
      console.log(error);
    } finally {
      setIsRenameGroup(false);
    }
  }

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
        setSelectedUserId(selectedUserId.filter((id) => id !== userId));
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

    const filteredUsers = allUsers.filter(user => !chatUser.users.some(chatUser => chatUser._id === user._id));

    const addNewUser = async () => {
    try {
      const data = {};
      data.userId = selectedUserId;
      data.chatId = chatUser._id;

      const response = await addToGroup(data , token);
      console.log("response",response)
      setChatUser(response);
      // setUpdatedGroupName(response.chatName)
      
    } catch (error) {
      alert("error while rename group");
      console.log(error);
    } finally {
      setAddUser(false);
      setSelecteduser([]);
      setSelectedUserId([])
    }
  }

  const clickHandle = (id) => {
    if (id) {
      navigate(`/user/${id}`);
    }
  };

  return (
    <div className={`flex flex-col fixed top-0 right-0 h-full w-[27%] overflow-scroll scrolling bg-richblack-700 text-white p-4 m-10 transition-transform duration-300 transform ${showInfo ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-yellow-300 text-2xl mt-5">{isGroup ? "Group Info" : "User Info"}</h1>
        <RxCross2
          className="w-10 h-10 text-white mt-4 cursor-pointer"
          onClick={handleShowInfo}
        />
      </div>

      <div className={`flex flex-col w-full m-1 mt-10 border items-center justify-center gap-3 border-yellow-500 p-3 `}>
        <div className="relative flex items-center gap-x-4"
          >
          <img
            src={previewSource || userImage}
            alt={``}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={`aspect-square w-40 rounded-full object-cover ${hovering && isGroup ? "blur transition-all duration-500" : ""}`}
          />
          <div className="space-y-2">
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              {hovering && isGroup && (
                <FaCamera
                  className="absolute w-10 h-10 text-richblack-500 cursor-pointer left-24 bottom-5 hover:text-yellow-400 transition-all duration-500"
                  onClick={handleClick}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                />
              )}

              {updateButton && <button
                className={`flex items-center
                border border-yellow-50 bg-yellow-200
                cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-300`}
                onClick={handleFileUpload}
              >
                <span className={`text-yellow-50}`}>{loading ? "Uploading..." : "Upload"}</span>
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </button>}
            </div>
            {noImage && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  No file selected for upload.
                </span>
              )}
            
          </div>
        </div>

        <div className='flex items-center'>
          {isRenameGroup ? 
          
            <div className='flex flex-col gap-3 items-center'>
              <input
                  className="bg-richblack-600 outline-none border-none rounded-lg text-lg text-richblack-50 px-5 py-2"
                  value={editedGroupName}
                  onChange={GroupNameChangeHandler}
                />
              <div className='flex flex-row gap-5'>
                <MdOutlineDone className="w-5 h-5 text-richblack-5 rounded-lg  hover:text-yellow-200 transition-all duration-200"
                onClick={editSubmit}
                />

                <RxCross2 
                onClick={renameCancel}
                className="w-5 h-5 text-richblack-5 rounded-lg  hover:text-yellow-200 transition-all duration-200"
                />
              </div>
                
            </div>
            :
            <>
              <h3 className="font-semibold text-richblack-5 text-2xl">
                {updatedGroupName ? updatedGroupName : userName}  
              </h3>

              {groupAdminUsernames.includes(userUsername)  &&
                <MdDriveFileRenameOutline
                  className="w-5 h-5 text-yellow-300 cursor-pointer mt-3 hover:text-yellow-400"
                  onClick={handleChangeGroupName}
                />
              }
            </>
          }
        </div>

        
        {isGroup ? 
        (<p className="text-richblack-200 text-lg">
          Group- <span className='text-yellow-400'>{chatUser.users.length}</span> members
        </p>):
        (<button
        className={`flex items-center
                border border-yellow-50 bg-yellow-200
                cursor-pointer gap-x-2 rounded-xl py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-300`}
        onClick={() => clickHandle(id)}
        >
        Profile
        </button>)
        }
        
      </div>

      {addUser ? (
        
        <div className='flex flex-col w-full h-full m-1 mt-10 border gap-3 border-yellow-500 p-3 scrolling'>
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-yellow-300 text-2xl mt-5">Add Users</h1>
              <RxCross2
                className="w-10 h-10 text-white mt-4 cursor-pointer"
                onClick={handleHideAddUser}
              />
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
                    className="bg-richblack-500 py-1 text-lg text-richblack-25 rounded-xl px-4 border focus:outline-none focus:ring focus:border-yellow-200 transition-all duration-300"
                />
                <button
                className={`flex items-center justify-center
                border border-yellow-50 bg-yellow-200
                cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-300 mt-auto`} 
                onClick={addNewUser}
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 max-h-40">
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
            
            <div className="flex flex-col overflow-y-auto max-h-96 gap-2">
                {
                    filteredUsers
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
        </div>

      ) : (
        isGroup && (
          <div className='flex flex-col w-full h-full m-1 mt-10 border gap-3 border-yellow-500 p-3'>
            <div className='flex justify-between px-4'>
              <p className="text-richblack-200 text-lg">
                <span className='text-yellow-400'>{chatUser.users.length}</span> members
              </p>
              {groupAdminUsernames.includes(userData?.userDetails?.username) && <IoMdPersonAdd className='w-6 h-6 text-white cursor-pointer' onClick={handleAddUser}/>}
            </div>
            
            {chatUser.users.map((user) => (
              <GroupUsers key={user._id} infoUserName={user.username} infoUserImage={user.image} adminUsername={groupAdminUsernames} id={user._id} chatUser={chatUser} chatId={chatUser._id} setChatUser={setChatUser} userData={userData}/>
            ))}
          </div>
        )
      )}

      
    </div>

  );
};

export default InfoChatUser;
