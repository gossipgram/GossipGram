import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { firstName, lastName, username, email, password, confirmPassword } =
    formData;

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification

    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full gap-y-3 mt-2"
        >
          <div className="flex gap-x-4 mt-[10px]">
            <label className="w-full relative text-[0.875rem] text-black  mb-1 leading-[1.375rem]">
              <p className="font-bold">
                First Name<sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type="text"
                name="firstName"
                onChange={changeHandler}
                placeholder="Enter First Name"
                value={formData.firstName}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
            <label className="w-full relative text-[0.875rem] text-black  mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Last Name<sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type="text"
                name="lastName"
                onChange={changeHandler}
                placeholder="Enter Last Name"
                value={formData.lastName}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
          </div>

          <div className="flex gap-x-4 mt-[10px]">
            <label className="w-full text-[0.875rem] text-black mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Username<sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type="text"
                name="username"
                onChange={changeHandler}
                placeholder="Enter Username"
                value={formData.username}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
          </div>

          <label className="mt-[10px] w-full text-[0.875rem] text-black mb-1 leading-[1.375rem]">
            <p className="font-bold">
              Email Address<sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter email address"
              value={formData.email}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
          </label>

          <div className="flex gap-x-4 mt-[10px]">
            <label className="w-full relative text-[0.875rem] text-black  mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Create Password<sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={changeHandler}
                placeholder="Enter Password"
                value={formData.password}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />

              <span
                className="absolute right-3 top-[38px] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="w-full relative text-[0.875rem] text-black mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Confirm Password<sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={changeHandler}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />

              <span
                className="absolute right-3 top-[38px] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-yellow-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-yellow-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
