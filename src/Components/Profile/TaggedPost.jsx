import React, { useEffect, useState } from "react";
import PostModal from "./PostModal";

const TaggedPost = ({ userId, searchedUserId, matchingUsers }) => {
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
    if (searchedUser && searchedUser.taggedPosts) {
      // Filter out posts where mediaUrl includes "video" or "image"
      const filteredPosts = searchedUser.taggedPosts.filter(
        (post) =>
          post.mediaUrl.includes("video") || post.mediaUrl.includes("image")
      );
      setAllUserPost(filteredPosts.reverse()); // Reverse the order of posts
    }
  }, [searchedUser, userId, matchingUsers]);
  console.log("allUserPost", userId);

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
          No Post
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

export default TaggedPost;
