import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllPostsByHashtag } from "../../services/operations/mediaAPI";

const HashtagPosts = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const location = useLocation();
  const currentPath = location.pathname;
  const [hashtag, setHashtag] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    try {
      setHashtag(currentPath.split("/")[3]);

      // getAllPostsByHashtag(hashtag, token);
      console.log(hashtag);
    } catch (error) {}
  }, [hashtag]);

  return (
    <div className="w-full flex p-7">
      <div className="text-white text-4xl w-1/4 flex flex-col gap-5">
        <div>Hashtag</div>
        <div>{hashtag}</div>
      </div>

      <div className="bg-richblack-600 w-1/2 ">Show post</div>
    </div>
  );
};

export default HashtagPosts;
