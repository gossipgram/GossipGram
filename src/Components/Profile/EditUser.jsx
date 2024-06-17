import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updatedProfile } from "../../services/operations/profileAPI"

const genders = ["Male", "Female", "others"]

const EditUser = ({userData}) => {
  const [loading, setLoading] = useState(false)
  const userDetails = userData;
  const navigate = useNavigate()
  const token = localStorage.getItem("token").split('"')[1];
  const [bioText, setBioText] = useState(userDetails?.additionalDetails?.bio);
  // const [wordCount, setWordCount] = useState(userDetails?.additionalDetails?.bio.length);
  const [initial, setInitial] = useState("")

  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm()

  const handleBioChange = (e) => {
    setBioText(e.target.value)
  };


  const submitProfileForm= async (data) => {
    try{
      setLoading(true)
      await updatedProfile(data , token).then(() => {
      setLoading(false)
      navigate("/profile");
      })
    }catch(error){
    console.log("ERROR MESSAGE submitProfileForm - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>

          {/* bio */}
          <div className="flex flex-col gap-2 ">
              <label htmlFor="bio" className="text-[14px] text-richblack-5">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                placeholder="Enter Bio Details"
                className="form-style"
                value={bioText}
                onChange={handleBioChange}
                {...register("bio", { required: true })}
                defaultValue={userDetails?.additionalDetails?.bio}
              />
              {errors.bio && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your bio.
                </span>
              )}
              {/* <span className="text-xs text-right text-richblack-5">{wordCount}/100 characters</span> */}
            </div>

          {/* DOB and Gender */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={userDetails?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={userDetails?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          {/* phone number */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={userDetails?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            
          </div>
          
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <button type='submit'
          className={`flex items-center
          border border-yellow-50 bg-yellow-200
          cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-300`}
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default EditUser
