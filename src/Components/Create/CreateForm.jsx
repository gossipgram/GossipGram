import React from "react";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { getAllUsers } from "../../services/operations/authAPI";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { createPost } from "../../services/operations/mediaAPI";

const CreateForm = ({ postType, setpostType }) => {
  const [image, setImage] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selecteduser, setSelecteduser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const token = localStorage.getItem("token").split('"')[1];
  const [textContent, setTextContent] = useState("");

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile.type.startsWith("image/") ||
      selectedFile.type.startsWith("video/")
    ) {
      setImage(selectedFile);
      // setPostType(selectedFile.type.)
      setpostType(selectedFile.type.split("/")[0]);
    } else {
      alert("Please select Image or Video");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files;
    const droppedImage = droppedFile[0];
    if (
      droppedImage.type.startsWith("image/") ||
      droppedImage.type.startsWith("video/")
    ) {
      setImage(droppedImage);
    } else {
      alert("Please Drop Image or Video");
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
    if (!selecteduser.some((selecteduser) => selecteduser._id === user._id)) {
      setSelecteduser([...selecteduser, user]);
    }
    setSearchQuery("");
  };

  const handleTitleChange = (event) => {
    setTitleText(event.target.value);
  };

  const handleRemoveUser = (userId) => {
    setSelecteduser(selecteduser.filter((user) => user._id !== userId));
  };

  const handleGossipChange = (event) => {
    setTextContent(event.target.value);
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

  const handleSubmitPost = (event) => {
    event.preventDefault();
    let data = new FormData();
    if (postType === "image" || postType === "video") {
      if (!image) {
        alert("Image or Video is required");
        return;
      }
      data.append("caption", captionText);
      data.append("mediaUrl", image);
    } else {
      if (!textContent) {
        alert("Text is required");
        return;
      }
      data.append("textContent", textContent);
      data.append("caption", titleText);
    }
    try {
      createPost(data, token);
    } catch (error) {
      console.log("Creating post error", error);
    }
  };

  return (
    <div className="bg-richblack-700 relative w-11/12 flex gap-5  h-full transition-all duration-200  rounded-3xl">
      {postType === "text" ? (
        <div className="flex gap-3 z-10 w-full ml-20  mt-14 justify-between max-h-full ">
          <div className="flex flex-col w-3/6 gap-3 ">
            <label htmlFor="title" className="text-richblack-25 text-2xl">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter gossip title here..."
              onChange={handleTitleChange}
              value={titleText}
              className="bg-richblack-500 py-3 text-lg text-richblack-25 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 transition-all duration-300"
            />
            <label className="text-richblack-25 text-2xl" htmlFor="caption">
              Gossip
            </label>
            <textarea
              type="text"
              id="caption"
              onChange={handleGossipChange}
              value={textContent}
              placeholder="Enter gossip here..."
              className="bg-richblack-500 scrolling text-richblack-25 py-3 text-lg rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 resize-none scroll h-28 transition-all duration-300 scrollbar-hidden"
            />
          </div>

          <div className="flex gap-3 w-1/3 flex-col mr-20">
            <label htmlFor="tagUser" className="text-richblack-25 text-2xl">
              Tag User
            </label>
            <input
              type="text"
              id="tagUser"
              placeholder="Search user...."
              onChange={handleSearchUserInput}
              value={searchQuery}
              className="bg-richblack-500 py-3 text-lg text-richblack-25 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 transition-all duration-300"
            />

            <div className="flex flex-col overflow-y-auto max-h-60 gap-2 ">
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

              <div className="flex flex-wrap gap-2 mt-2">
                {selecteduser.map((selecteduser) => (
                  <div
                    key={selecteduser._id}
                    className="border border-yellow-200 bg-richblack-600 text-richblue-25 px-4 py-2 rounded-lg flex gap-2 items-center"
                  >
                    <img
                      src={selecteduser.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <span>{selecteduser.username}</span>
                    <button onClick={() => handleRemoveUser(selecteduser._id)}>
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full mx-7 flex gap-32  p-5">
          <div
            className="w-1/3 flex my-auto  items-center justify-center h-5/6  rounded-3xl border-4 border-dashed border-richblack-400"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="w-full h-full relative  overflow-hidden">
                {image.type && image.type.startsWith("video/") ? (
                  <video
                    src={`${URL.createObjectURL(image)}`}
                    controls
                    className="w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <img
                    src={`${URL.createObjectURL(image)}`}
                    alt="preview"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                )}
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
                  <span>{postType === "image" ? "photo" : "video"}</span> or
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
                  accept="video/*,image/*"
                  id="imageFile"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
          <div className=" w-3/6 flex   rounded-3xl">
            <div className="flex flex-col gap-3  w-full   max-h-full ">
              <label className="text-richblack-25 text-2xl" htmlFor="caption">
                Caption
              </label>
              <textarea
                type="text"
                id="caption"
                onChange={captionChangeHandler}
                value={captionText}
                placeholder="Enter your caption here..."
                className="bg-richblack-500 scrolling text-richblack-25 py-3 text-lg rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 resize-none scroll h-28 transition-all duration-300 scrollbar-hidden "
              />

              <label htmlFor="tagUser" className="text-richblack-25 text-2xl">
                Tag User
              </label>
              <input
                type="text"
                id="tagUser"
                placeholder="Search user...."
                onChange={handleSearchUserInput}
                value={searchQuery}
                className="bg-richblack-500 py-3 text-lg text-richblack-25 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 transition-all duration-300"
              />

              <div className="flex flex-col overflow-y-auto max-h-60 gap-2">
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
                        <span className="text-richblack-25">
                          {user.username}
                        </span>
                      </button>
                    ))}

                <div className="flex flex-wrap gap-2 mt-2">
                  {selecteduser.map((selecteduser) => (
                    <div
                      key={selecteduser._id}
                      className="border border-yellow-200 bg-richblack-600 text-richblue-25 px-4 py-2 rounded-lg flex gap-2 items-center"
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
      <button
        onClick={handleSubmitPost}
        className="text-richblack-5 bg-yellow-400 hover:bg-yellow-500 px-7 py-2 rounded-xl absolute bottom-12 transition-all duration-200 right-12"
      >
        Post
      </button>
    </div>
  );
};

export default CreateForm;
