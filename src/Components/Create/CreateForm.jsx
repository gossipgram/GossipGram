import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const CreateForm = ({ postType }) => {
  const [image, setImage] = useState(null);

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
  return (
    <div className="bg-richblack-700 w-11/12 flex items-center justify-between h-5/6  rounded-3xl p-5">
      <div
        className="w-1/3 flex items-center justify-center h-5/6 ml-16 rounded-3xl border-4 border-dashed border-richblack-400"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="w-full h-full relative">
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="w-full h-full object-cover  rounded-xl z-20"
            />
            <button
              className="z-30 text-2xl text-richblack-25 absolute top-4 right-4 bg-richblack-700 rounded-full bg-opacity-20 p-1"
              onClick={handleCrossButton}
            >
              <RxCross2 />
            </button>
          </div>
        ) : (
          <div className="flex gap-3 flex-col items-center justify-center">
            <span className="text-richblack-100 text-xl">
              Select your image or drop here
            </span>
            <label
              htmlFor="imageFile"
              className="text-richblack-5 cursor-pointer text-lg px-7 py-2  rounded-xl bg-yellow-400 hover:bg-yellow-500 transition-all duration-300"
            >
              Select
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

      <div className="bg-white">caption and hashtag</div>
    </div>
  );
};

export default CreateForm;
