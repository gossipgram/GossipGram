import React from "react";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { getAllUsers } from "../../services/operations/authAPI";
import { AiOutlineCloudUpload } from "react-icons/ai";

const CreateForm = ({ postType }) => {
  const [image, setImage] = useState(null);
  // const [titleText, setTitleText] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selecteduser, setSelecteduser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const token = localStorage.getItem("token").split('"')[1];

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    console.log(image);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files;
    const droppedImage = droppedFile[0];
    if (droppedImage && droppedImage.type.startsWith("image/")) {
      setImage(droppedImage);
    } else {
      alert("Please select Image");
    }
  };

  const handleCrossButton = () => {
    setImage(null);
  };

  const captionChangeHandler = (event) => {
    setCaptionText(event.target.value);
  };

  const handleSearchUserInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUserClick = (user, event) => {
    // event.preventDefault();
    if (!selecteduser.some((selecteduser) => selecteduser._id === user._id)) {
      setSelecteduser([...selecteduser, user]);
    }
    setSearchQuery("");
  };

  const handleRemoveUser = (userId) => {
    setSelecteduser(selecteduser.filter((user) => user._id !== userId));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUsers(token);
        setAllUsers(response.users);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <divs className="bg-richblack-700  w-11/12 flex gap-5 items-center  h-[90%] transition-all duration-200  rounded-3xl">
      {postType === "text" ? (
        <div>text</div>
      ) : (
        <div className="w-full h-full mx-7 flex justify-between  p-5">
          <div
            className="w-1/3 flex my-auto  items-center justify-center h-5/6  rounded-3xl border-4 border-dashed border-richblack-400"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              backgroundImage: image
                ? `url(${URL.createObjectURL(image)})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {image ? (
              <div className="w-full h-full relative  overflow-hidden">
                <button
                  className="z-30 text-2xl hover:scale-110 transition-all duration-200 text-richblack-25 absolute top-4 right-4 bg-richblack-700 rounded-full bg-opacity-20 p-1"
                  onClick={handleCrossButton}
                >
                  <RxCross2 />
                </button>
              </div>
            ) : (
              <div className="flex gap-3  flex-col items-center justify-center">
                <span className="text-richblack-100 text-xl">
                  Select your{" "}
                  <span>{postType === "photo" ? "photo" : "video"}</span> or
                  drop here
                </span>
                <label
                  htmlFor="imageFile"
                  className="text-richblack-5 flex items-center gap-2 cursor-pointer text-lg px-7 py-2  rounded-xl bg-yellow-400 hover:bg-yellow-500 transition-all duration-300"
                >
                  <AiOutlineCloudUpload className="text-2xl" />
                  Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="imageFile"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
          <div className=" w-3/6 flex   mr-16 rounded-3xl">
            <div className="flex flex-col gap-3  w-full  h-full">
              <label className="text-richblack-25 text-2xl" htmlFor="caption">
                Caption
              </label>
              <textarea
                type="text"
                id="caption"
                onChange={captionChangeHandler}
                value={captionText}
                placeholder="Enter your caption here..."
                className="bg-richblack-500 scrolling py-3 text-lg rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 resize-none scroll h-28 transition-all duration-300 scrollbar-hidden"
              />

              <label htmlFor="tagUser" className="text-richblack-25 text-2xl">
                Tag User
              </label>
              <input
                type="text"
                id="tagUser"
                placeholder="Search user...."
                onChange={handleSearchUserInput}
                className="bg-richblack-500 py-3 text-lg rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 transition-all duration-300"
              />

              <div className="flex flex-col overflow-y-scroll scrolling  gap-2">
                {allUsers
                  ?.filter((user) =>
                    user?.username
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <button
                      className="flex gap-3 items-center"
                      key={user._id}
                      onClick={() => handleUserClick(user)}
                    >
                      <img
                        src={user.image}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <span>{user.username}</span>
                    </button>
                  ))}
                <div className="flex flex-wrap gap-2 mt-2">
                  {selecteduser.map((selecteduser) => (
                    <div
                      key={selecteduser._id}
                      className="bg-yellow-400 text-richblue-25 text-lg px-4 py-2 rounded-full flex items-center"
                    >
                      <img
                        src={selecteduser.image}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <span>{selecteduser.username}</span>
                      <button
                        onClick={() => handleRemoveUser(selecteduser._id)}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </divs>
  );
};

export default CreateForm;
