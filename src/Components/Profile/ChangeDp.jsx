import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi"
import { updateDp, updatedProfile } from '../../services/operations/profileAPI'
// const IconBtn = require("../common/IconBtn")


const ChangeDp = ({ userData }) => {

    const token = localStorage.getItem("token").split('"')[1];
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const userDetails = userData;
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
            alt=""
            className="aspect-square w-[78px] rounded-full object-center bg-black"
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


// import React, { useState, useRef } from "react";
// import "./style.css";

// function ImageUpload() {
//   const [image, setImage] = useState(null);
//   const hiddenFileInput = useRef(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     const imgname = event.target.files[0].name;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       const img = new Image();
//       img.src = reader.result;
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const maxSize = Math.max(img.width, img.height);
//         canvas.width = maxSize;
//         canvas.height = maxSize;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(
//           img,
//           (maxSize - img.width) / 2,
//           (maxSize - img.height) / 2
//         );
//         canvas.toBlob(
//           (blob) => {
//             const file = new File([blob], imgname, {
//               type: "image/png",
//               lastModified: Date.now(),
//             });

//             console.log(file);
//             setImage(file);
//           },
//           "image/jpeg",
//           0.8
//         );
//       };
//     };
//   };

//   const handleUploadButtonClick = (file) => {
//     var myHeaders = new Headers();
//     const token = "adhgsdaksdhk938742937423";
//     myHeaders.append("Authorization", `Bearer ${token}`);

//     var formdata = new FormData();
//     formdata.append("file", file);

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: formdata,
//       redirect: "follow",
//     };

//     fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(JSON.parse(result));
//         const profileurl = JSON.parse(result);
//         setImage(profileurl.img_url);
//       })
//       .catch((error) => console.log("error", error));
//   };

//   const handleClick = (event) => {
//     hiddenFileInput.current.click();
//   };

//   return (
//     <div className="image-upload-container">
//       <div className="box-decoration">
//         <label htmlFor="image-upload-input" className="image-upload-label">
//           {image ? image.name : "Choose an image"}
//         </label>
//         <div onClick={handleClick} style={{ cursor: "pointer" }}>
//           {image ? (
//             <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
//           ) : (
//             <img src="./photo.png" alt="upload image" className="img-display-before" />
//           )}

//           <input
//             id="image-upload-input"
//             type="file"
//             onChange={handleImageChange}
//             ref={hiddenFileInput}
//             style={{ display: "none" }}
//           />
//         </div>

//         <button
//           className="image-upload-button"
//           onClick={handleUploadButtonClick}
//         >
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ImageUpload;

// //SCRIPT SOURCE CODE ENDING



// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////



// //STYLE SOURCE CODE ENDING
// .image-upload-container {
//     padding: 2rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 90vh;
// }

// .box-decoration {
//     border: 2px dashed #ccc;
//     border-radius: 5px;
//     padding: 130px 100px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// }

// .image-upload-label {
//     font-size: 1.5rem;
//     font-weight: bold;
//     margin-bottom: 1rem;
//     cursor: pointer;
// }

// .image-upload-input {
//     display: none;
// }

// .image-upload-button {
//     background-color: #4CAF50;
//     border: none;
//     color: white;
//     padding: 0.8rem 1.2rem;
//     margin-top: 1rem;
//     cursor: pointer;
//     border-radius: 5px;
// }

// .image-upload-button:hover {
//     background-color: #3e8e41;
// }

// .img-display-before {
//     height: 200px;
//     width: 200px;
//     margin-left: 35px;
// }

// .img-display-after {
//     height: 200px;
//     width: 200px;
//     border-radius: 100%;
// }
//STYLE SOURCE CODE ENDING