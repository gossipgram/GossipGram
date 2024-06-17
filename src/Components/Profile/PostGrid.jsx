import React, { useEffect, useState } from "react";
import PostModal from "./PostModal";

const PostGrid = ({ userId, searchedUserId, matchingUsers , isSettings=false }) => {
  const [allUserPost, setAllUserPost] = useState([]);
  const searchedUser = userId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postDetails, setPostDetails] = useState(null); // Changed to null to prevent errors
  const [hoveredPost, setHoveredPost] = useState(null); // Keep track of hovered post

  const openModal = (post) => {
    setIsModalOpen(true);
    setPostDetails(post);
  };

  useEffect(() => {
    if (searchedUser && searchedUser.posts && !isSettings) {
      console.log("first")
      // Filter out posts where mediaUrl includes "video" or "image"
      const filteredPosts = searchedUser?.posts?.filter(
        (post) =>
          post?.mediaUrl?.includes("video") || post?.mediaUrl?.includes("image")
      );
      setAllUserPost(filteredPosts.reverse()); // Reverse the order of posts
    }

    else if (isSettings) {
      console.log("second")
      const filteredPosts = userId.likes
            .map(like => like.post)
            .filter(post => post.mediaUrl.includes("video") || post.mediaUrl.includes("image"))
            .reverse(); // Reverse the order of posts
          setAllUserPost(filteredPosts);
    }

  }, [searchedUser, userId, matchingUsers , isSettings]);

  // Function to play/pause the video on hover
  const handleVideoHover = (post) => {
    if (hoveredPost !== post) {
      setHoveredPost(post);
    }
  };

  return (
    <div>
      {allUserPost.length === 0 ? (
        <h2 className="text-center text-3xl mt-40 text-richblack-5 transition-all duration-700">
          {isSettings ? "No Like Post" : "No Post"}
        </h2>
      ) : (
        <div className="grid grid-cols-3 gap-1 transition-all duration-700">
          {allUserPost.map((post) => (
            <div
              key={post._id}
              className="w-52 h-52 "
              onMouseEnter={() => handleVideoHover(post)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {post.mediaUrl.includes("video") ? (
                <video
                  src={post.mediaUrl}
                  className="w-full h-full object-cover bg-black hover:scale-105 hover:backdrop-blur-sm transition-all duration-700"
                  autoPlay={hoveredPost === post} // Autoplay when hovered
                  loop
                  muted
                  onClick={() => openModal(post)}
                />
              ) : post.mediaUrl.includes("image") ? (
                <img
                  className=" w-full h-full object-cover bg-black hover:scale-105 hover:backdrop-blur-sm transition-all duration-700"
                  src={post.mediaUrl}
                  onClick={() => openModal(post)}
                />
              ) : null}
            </div>
          ))}
          {isModalOpen && postDetails && (
            <div>
              <PostModal
                postDetails={postDetails}
                userId={userId?._id}
                postUserId={postDetails?.user}
                changeIsModalOpen={() => {
                  setIsModalOpen(false);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostGrid;
