import { useEffect } from "react";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData, closeModal }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);
  return (
    <div className="fixed inset-0 z-50  grid place-items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm modal-overlay">
      <div className=" max-w-[550px] rounded-lg border border-richblack-400 bg-richblack-800 p-10">
        <p className="text-2xl font-semibold text-richblack-5 ml-12">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center justify-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
