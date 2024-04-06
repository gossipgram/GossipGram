import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi"
import { updateDp, updatedProfile } from '../../services/operations/profileAPI'
// const IconBtn = require("../common/IconBtn")


const ChangeDp = ({ userData }) => {

    const token = localStorage.getItem("token").split('"')[1];
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const userDetails = userData?.userDetails;
    const [noImage, setNoImage] = useState(false)

    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileUpload = async () => {
      if (!imageFile) {
          setNoImage(true)
          // Optionally, inform the user that no file has been selected for upload.
          return; // Exit the function as there's nothing to upload.
      }
      try {
          console.log("token", token);
          console.log("inside handleFileUpload");
          setLoading(true);
          const formData = new FormData();
          formData.append("displayPicture", imageFile);
          console.log("formdata", formData);
          const response = await updateDp(token, formData).then(() => {
              setLoading(false);
          });
          console.log(response);
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

    return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || userDetails?.image}
            alt={``}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <button
                className={`flex items-center
                border border-yellow-50 bg-yellow-200
                cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-300`}
                onClick={handleFileUpload}
              >
                <span className={`text-yellow-50}`}>{loading ? "Uploading..." : "Upload"}</span>
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </button>
            </div>
            {noImage && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  No file selected for upload.
                </span>
              )}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeDp
