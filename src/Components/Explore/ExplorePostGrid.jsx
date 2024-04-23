import React, { useEffect, useState } from "react";
import PostModal from "../Profile/PostModal";

const ExplorePostGrid = ({ posts, userId }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postDetails, setPostDetails] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);

  const openModal = (post) => {
    setIsModalOpen(true);
    setPostDetails(post);
  };
  useEffect(() => {
    return () => {
      if (posts) {
        const filteredPosts = posts
          .filter(
            (post) =>
              post.mediaUrl.includes("video") || post.mediaUrl.includes("image")
          )
          .reverse();
        setAllPosts(filteredPosts);
      }
    };
  }, [posts, userId]);

  const handleVideoHover = (post) => {
    if (hoveredPost !== post) {
      setHoveredPost(post);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {allPosts.length === 0 ? (
        <h2 className="text-center text-3xl mt-40 text-richblack-5 transition-all duration-700">
          No Post
        </h2>
      ) : (
        <div className="grid w-full grid-cols-3 gap-1 transition-all duration-700 ">
          {allPosts.map((post) => (
            <div
              key={post._id}
              className="w-[17rem] h-[17rem]"
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

export default ExplorePostGrid;
