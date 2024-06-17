import React, { useEffect, useState } from "react";
import PostCard from "../posts/PostCard";

const PostRow = ({ searchedUserId, userData, searchedUser , isSettings=false }) => {
  console.log("searchedUserId",searchedUserId);
  console.log("userData",userData);
  console.log("searchedUser",searchedUser)
  const [textPosts, setTextPosts] = useState([]);

  useEffect(() => {
    // const searchedUser = matchingUsers.find(user => user._id === searchedUserId);
    if (searchedUser && searchedUser.posts && !isSettings) {
      // Filter out posts with text content
      const filteredPosts = searchedUser.posts.filter((post) => post.titleText);
      setTextPosts(filteredPosts.reverse()); // Reverse the order of posts
    }

    else if (isSettings) {
      console.log("second")
      const filteredPosts = userData.likes
            .map(like => like.post)
            .filter(post => post.titleText)
            .reverse(); // Reverse the order of posts
          setTextPosts(filteredPosts);
    }

  }, [searchedUserId]);

  return (
    <div>
      {textPosts.length === 0 ? (
        <h2 className="text-center text-3xl mt-40 text-richblack-5 transition-all duration-700">
          No Gossip
        </h2>
      ) : (
        <div className=" transition-all duration-700">
          {textPosts.map((post) => (
            <PostCard
              post={post}
              userId={userData._id}
              postUserId={post?.user?._id}
              key={post?._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostRow;
