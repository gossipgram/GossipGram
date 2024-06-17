import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import PostGrid from '../Profile/PostGrid';
import PostRow from '../Profile/PostRow';

const Likes = ({userData , setUserData}) => {

    console.log("userData",userData);
    const { step } = useSelector((state) => state.userProfile);
    const [postSection, setPostSection] = useState("Posts");
    const steps = [
      {
        id: 1,
        title: "Posts",
      },
      {
        id: 2,
        title: "Gossip",
      },
    ];

  return (
    <div className="flex flex-col w-4/6 mx-auto gap-2">
      <div className="w-full h-[1px] bg-yellow-500 mt-12"></div>
      <div className="flex w-full justify-center gap-32">
        {steps.map((item) => (
        <div className="flex flex-col items-center" key={item.id}>
          <button
            className={`grid cursor-pointer aspect-rectangle w-[70px] h-[40px] place-items-center rounded-xl border-[1px] mt-3 p-5${
            postSection === item.title
            ? "border-yellow-50 bg-yellow-900 text-yellow-50 transition-all duration-200"
            : "border-richblack-700 bg-richblack-800 text-richblack-300 hover:text-yellow-400 transition-all duration-200"
            } ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
            onClick={() => setPostSection(item.title)}
          >
            {item.title}
          </button>
        </div>
        ))}
      </div>
      <div className="w-full h-[1px] bg-yellow-500 mt-5 mb-5"></div>
      <div className='flex mx-auto'>
        {" "}
        {postSection === "Posts" ? (
          <PostGrid
            userId={userData}
            matchingUsers={userData}
            isSettings={true}
          />
        ) : postSection === "Gossip" ? (
          <PostRow
            userData={userData}
            searchedUserId={userData?._id}
            searchedUser={userData}
            isSettings={true}
          />
        ) : (
          <PostGrid />
        )}
      </div>
    </div>
  )
}

export default Likes
