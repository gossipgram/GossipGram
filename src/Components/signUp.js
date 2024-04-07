import React from "react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (formData) => {
    const { firstName, lastName, username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    dispatch(setSignupData(formData));

    // Send OTP to user for verification
    dispatch(sendOtp(email , username , navigate));

  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-y-3 mt-2"
        >
          <div className="flex gap-x-4 mt-[10px]">
            <label className="w-full relative text-[0.875rem] text-pure-greys-5  mb-1 leading-[1.375rem]">
              <p className="font-bold">
                First Name<sup className="text-pink-200">*</sup>
              </p>

              <input
                {...register("firstName", { required: "First Name is required" })}
                type="text"
                placeholder="Enter First Name"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.firstName.message}
                </span>
              )}
            </label>
            <label className="w-full relative text-[0.875rem] text-pure-greys-5  mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Last Name<sup className="text-pink-200">*</sup>
              </p>

              <input
                {...register("lastName", { required: "Last Name is required" })}
                type="text"
                placeholder="Enter Last Name"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.lastName.message}
                </span>
              )}
            </label>
          </div>

          <div className="flex gap-x-4 mt-[10px]">
            <label className="w-full text-[0.875rem] text-pure-greys-5 mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Username<sup className="text-pink-200">*</sup>
              </p>

              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                placeholder="Enter Username"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
              {errors.username && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.username.message}
                </span>
              )}
            </label>
          </div>

          <label className="mt-[10px] w-full text-[0.875rem] text-pure-greys-5 mb-1 leading-[1.375rem]">
            <p className="font-bold">
              Email Address<sup className="text-pink-200">*</sup>
            </p>

            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter email address"
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            {errors.email && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.email.message}
              </span>
            )}
          </label>

          <div className="flex gap-x-4 mt-[10px]">
            <label className="w-full relative text-[0.875rem] text-pure-greys-5  mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Create Password<sup className="text-pink-200">*</sup>
              </p>

              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
              {errors.password && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.password.message}
                </span>
              )}
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

            <label className="w-full relative text-[0.875rem] text-pure-greys-5 mb-1 leading-[1.375rem]">
              <p className="font-bold">
                Confirm Password<sup className="text-pink-200">*</sup>
              </p>

              <input
                {...register("confirmPassword", { required: "Confirm Password is required" })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
              {errors.confirmPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.confirmPassword.message}
                </span>
              )}
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
