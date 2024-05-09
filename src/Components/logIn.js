import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { login } from "../services/operations/authAPI";
import axios from "axios";
import { useDispatch } from "react-redux";
const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    try {
      await dispatch(login(email, password, navigate));
      toast.success("Login Successfull")
    } catch (error) {
      toast.error("Failed to log in. Please try again.");
    }
  };

  return (
    <form className="flex flex-col w-full gap-y-4 mt-6 relative" onSubmit={handleSubmit(onSubmit)}>
      <label className="w-full">
        <p className="text-[0.875rem] text-pure-greys-25 mb-1 leading-[1.375rem] font-bold">
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          {...register("email", { required: "Email is required" })}
          type="text"
          placeholder="Enter your email"
          className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className=" relative w-full">
        <p className="text-[0.875rem] text-pure-greys-5 mb-1 leading-[1.375rem] font-bold">
          Password<sup className="text-pink-200">*</sup>
        </p>
        <input
          {...register("password", { required: "Password is required" })}
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
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

        <Link to={"/forgot-password"} className="absolute right-4 -bottom-5">
          <p className="text-sm mt-1 text-yellow-300 max-w-max ml-auto font-bold">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="bg-yellow-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-yellow-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default LogIn;
