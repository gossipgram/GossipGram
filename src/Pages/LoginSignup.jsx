import { useState } from "react";
import React from "react";
import Logo from "../assets/GossipGram-logos_black.png";
import LogIn from "../Components/logIn";
import SignUp from "../Components/signUp";

const LoginSignupPage = () => {
  const [userType, setUserType] = useState("signup");

  return (
    <div className="max-w-xl mx-auto min-h-[800px]  justify-between shadow-xl shadow-richblack-600 p-5 my-5 rounded-lg">
      <div className="flex justify-center bg-richblack-400  w-[100%] mt-[5px] mb-[15px] h-[120px] border-none shadow-2xl rounded-full">
        <img
          src={Logo}
          alt=""
          width={500}
          height={400}
          className="object-cover"
        />
      </div>

      <div className="border-none rounded-xl p-5 pl-10 pr-10 mt-5 ">
        <div className="flex justify-between border-none rounded-xl gap-10 p-5 pl-10 pr-10">
          <button
            onClick={() => setUserType("login")}
            className={`${
              userType === "login" ? "bg-richblack-100" : "bg-richblack-600"
            } w-[50%] h-[100%] rounded-full text-black font-bold text-xl p-3 transition-all duration-300`}
          >
            Log In
          </button>

          <button
            onClick={() => setUserType("signup")}
            className={`${
              userType === "signup" ? "bg-richblack-100" : "bg-richblack-600"
            } w-[50%] h-[100%] rounded-full text-black font-bold text-xl p-3 transition-all duration-300`}
          >
            Sign Up
          </button>
        </div>

        <div>{userType === "login" ? <LogIn /> : <SignUp />}</div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
