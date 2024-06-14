import React from "react";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { getAllUsers } from "../../services/operations/authAPI";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { createPost } from "../../services/operations/mediaAPI";
import { set, useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ImageCropper from "../common/ImageCropper";
import {
  setTitleText,
  setCaptionText,
  setSearchQuery,
  setImage,
  setSelectedUser,
  setNotImage,
  setAllUsers,
  setPostType,
} from "../../slices/postSlice";

const CreateForm = () => {
  const dispatch = useDispatch();
  const [unCropImage, setunCropImage] = useState(null);
  const [video, setVideo] = useState(null);
  const token = localStorage.getItem("token").split('"')[1];
  const {
    postType,
    image,

    titleText,
    captionText,
    searchQuery,
    selectedUser,
    allUsers,
    notImage,
  } = useSelector((state) => state.post);

  const {
    // register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      if (selectedFile.type.startsWith("image/")) {
        let imageDataUrl = await readFile(selectedFile);
        setunCropImage(imageDataUrl);

        // setPostType(selectedFile.type.)
        dispatch(setPostType(selectedFile.type.split("/")[0]));
        event.target.value = null;
      } else if (selectedFile.type.startsWith("video/")) {
        setVideo(selectedFile);
        dispatch(setPostType(selectedFile.type.split("/")[0]));
      } else {
        alert("Please select Image or Video");
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile.type.startsWith("image/")) {
      setunCropImage(droppedFile);
    } else if (droppedFile.type.startsWith("video/")) {
      setVideo(droppedFile);
    } else {
      alert("Please Drop Image or Video");
    }
  };

  const handleCrossButton = () => {
    dispatch(setImage(null));
    console.log(video);
    setVideo(null);
  };

  const captionChangeHandler = (event) => {
    dispatch(setCaptionText(event.target.value));
  };

  const handleSearchUserInput = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleUserClick = (user, event) => {
    if (!selectedUser.some((selectedUser) => selectedUser._id === user._id)) {
      dispatch(setSelectedUser([...selectedUser, user]));
    }
    dispatch(setSearchQuery(""));
  };

  const handleTitleChange = (event) => {
    dispatch(setTitleText(event.target.value));
  };

  const handleRemoveUser = (userId) => {
    dispatch(
      setSelectedUser(selectedUser.filter((user) => user._id !== userId))
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUsers(token);
        dispatch(setAllUsers(response.users));
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const onSubmit = async (event) => {
    console.log("caption____________", captionText);
    // event.preventDefault();
    let data = new FormData();

    let taggedUser = [];
    selectedUser.forEach((user) => {
      taggedUser.push(user._id);
    });

    let hashtags = captionText.match(/#[^\s#]*/g) || [];
    if (postType === "image") {
      if (!image) {
        alert("Image is required");
        dispatch(setNotImage(true));
        return;
      }
      const response = await fetch(image);
      const blob = await response.blob();
      data.append("mediaUrl", blob);
    } else if (postType === "video") {
      data.append("mediaUrl", video);
    } else {
      if (!captionText) {
        alert("Gossip is required");
        return;
      }
      data.append("titleText", titleText);
    }
    data.append("caption", captionText);

    taggedUser.forEach((user) => {
      data.append("taggedUsers", user);
    });

    if (hashtags) {
      hashtags.forEach((tag) => {
        data.append("hashtags", tag);
      });
    } else {
      data.append("hashtags", []);
    }

    try {
      createPost(data, token);
      dispatch(setImage(null));
      dispatch(setTitleText(""));
      dispatch(setCaptionText(""));
      dispatch(setSelectedUser([]));
      dispatch(setSearchQuery(""));
      toast.success("Post is created");
    } catch (error) {
      console.log("Creating post error", error);
    }
  };

  const afterCropFunction = (croppedImage) => {
    dispatch(setImage(croppedImage));
    setunCropImage(null);
  };

  // const renderHilightedHashtags = () => {
  //   if (!captionText) {
  //     return null;
  //   }
  //   const words = captionText.split(/\s+/);
  //   console.log(hashtags);

  //   return words.map((word, index) => {
  //     if (word.startsWith("#")) {
  //       setHashtags([...hashtags, word]);
  //       return (
  //         <span key={index} className="text-yellow-300">
  //           {word}&nbsp;
  //         </span>
  //       );
  //     } else {
  //       return <span key={index}>{word}&nbsp;</span>;
  //     }
  //   });
  // };

  return (
    <div className="bg-richblack-700 w-11/12 flex h-full transition-all duration-200  rounded-3xl">
      {postType === "text" ? (
        <div className="flex gap-3 w-full ml-20  mt-14 justify-between max-h-full ">
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
              // {...register("title", { required: "Title is required" })}
              className="bg-richblack-500 py-3 text-lg text-richblack-25 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 transition-all duration-300"
            />
            {errors.title && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.title.message}
              </span>
            )}
            <label className="text-richblack-25 text-2xl" htmlFor="caption">
              Gossip
            </label>
            <textarea
              type="text"
              id="caption"
              onChange={captionChangeHandler}
              value={captionText}
              // {...register("textContent", {
              //   required: "Gossip content is required",
              // })}
              placeholder="Enter gossip here..."
              className="bg-richblack-500 scrolling text-richblack-25 py-3 text-lg rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 resize-none scroll h-28 transition-all duration-300 scrollbar-hidden"
            />
            {errors.textContent && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.textContent.message}
              </span>
            )}
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
                        alt="User display pic"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <span className="text-richblack-25">{user.username}</span>
                    </button>
                  ))}

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedUser.map((selectedUser) => (
                  <div
                    key={selectedUser._id}
                    className="border border-yellow-200 bg-richblack-600 text-richblue-25 px-4 py-2 rounded-lg flex gap-2 items-center"
                  >
                    <img
                      src={selectedUser.image}
                      alt="tagged user pic"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <span>{selectedUser.username}</span>
                    <button onClick={() => handleRemoveUser(selectedUser._id)}>
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full ml-7 flex gap-32  p-5">
          <div
            className="w-1/3 flex my-auto  items-center justify-center h-5/6  rounded-3xl border-4 border-dashed border-richblack-400"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {image || video ? (
              <div className="w-full h-full relative  overflow-hidden">
                {video ? (
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <img
                    src={image}
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
                {notImage && (
                  <span className="mt-10 text-[30px] text-yellow-100">
                    ! No file selected for upload.
                  </span>
                )}
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
              {/* <div
                className="bg-richblack-500 scrolling text-richblack-25 py-3 text-lg rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring focus:border-yellow-200 resize-none scroll h-28 transition-all duration-300 scrollbar-hidden"
                id="inputContainer"
                contentEditable
                onInput={captionChangeHandler}
                placeholder="Enter your caption here..."
              >
                {renderHilightedHashtags()}
              </div> */}

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
                          alt="user pic"
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
                  {selectedUser.map((selectedUser) => (
                    <div
                      key={selectedUser._id}
                      className="border border-yellow-200 bg-richblack-600 text-richblue-25 px-4 py-2 rounded-lg flex gap-2 items-center"
                    >
                      <img
                        alt="tagged user "
                        src={selectedUser.image}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <span>{selectedUser.username}</span>
                      <button
                        onClick={() => handleRemoveUser(selectedUser._id)}
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
      <div className="flex items-end mb-6 mr-6 ">
        <button
          onClick={handleSubmit(onSubmit)}
          className="text-richblack-5 bg-yellow-400 hover:bg-yellow-500 px-7 py-2 rounded-xl h-fit flex   bottom-12 transition-all duration-200 right-12"
        >
          Post
        </button>
      </div>
      {unCropImage && (
        <ImageCropper
          imageSrc={unCropImage}
          afterCropFunction={afterCropFunction}
          closeImageCrop={() => {
            setunCropImage(null);
          }}
        />
      )}
    </div>
  );
};

export default CreateForm;
