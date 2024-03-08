import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login } from "../services/operations/authAPI";
import axios from "axios";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form className="flex flex-col w-full gap-y-4 mt-6">
      <label className="w-full">
        <p className="text-[0.875rem] text-black mb-1 leading-[1.375rem] font-bold">
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          // value={FormData.email}
          onChange={changeHandler}
          placeholder="Enter your email"
          name="email"
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
      </label>

      <label className=" relative w-full">
        <p className="text-[0.875rem] text-black mb-1 leading-[1.375rem] font-bold">
          Password<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          // value={FormData.password}
          onChange={changeHandler}
          placeholder="Enter password"
          name="password"
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

        <Link to={"/forgot-password"}>
          <p className="text-sm mt-1 text-blue-800 max-w-max ml-auto font-bold">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        onClick={submitHandler}
        className="bg-yellow-100 text-richblack-900 rounded-xl font-medium px-[12px] py-[8px] mt-6 hover:bg-yellow-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default LogIn;
