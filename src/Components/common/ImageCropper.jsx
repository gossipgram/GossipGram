import React, { useEffect } from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg, getRotatedImage } from "../../utility/canvasUtils";

// this is for mobile device roation
const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const ImageCropper = ({ imageSrc, afterCropFunction, closeImageCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeImageCrop();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeImageCrop]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const doneCroppedImage = async () => {
    try {
      const croppedImageTemp = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("Done,", { croppedImageTemp });
      setCroppedImage(croppedImageTemp);
      afterCropFunction(croppedImageTemp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0  z-[1000]  grid place-items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm modal-overlay">
      <div className="w-[750px] h-3/4  rounded-lg border border-richblack-400 bg-richblack-800 p-10 ">
        <div className="relative w-full h-[75%] ">
          <Cropper
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        {/* controlles  */}
        <div className="flex flex-col gap-5 w-full mt-5">
          <div className="w-full flex gap-4">
            <label
              htmlFor="zoom"
              className="text-richblack-5 font-semibold text-lg"
            >
              Zoom
            </label>
            <input
              type="range"
              name="zoom"
              id="zoom"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full flex gap-4">
            <label
              htmlFor="rotation"
              className="text-richblack-5 font-semibold text-lg"
            >
              Rotation
            </label>
            <input
              type="range"
              name="rotation"
              id="rotation"
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="rotation"
              onChange={(e) => setRotation(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex w-full gap-5">
            <button
              onClick={doneCroppedImage}
              className="text-richblack-900 bg-yellow-200 hover:opacity-80 px-7 py-2 rounded-xl h-fit flex  w-[48%]  items-center justify-center transition-all duration-200 font-semibold"
            >
              Done
            </button>
            <button
              onClick={closeImageCrop}
              className="text-richblack-900 bg-richblack-200 hover:opacity-80 px-7 py-2 rounded-xl h-fit flex  w-[48%]  items-center justify-center transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
