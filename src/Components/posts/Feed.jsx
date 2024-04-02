import React from "react";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from "../../services/operations/mediaAPI";
import { getAllUserData } from "../../services/operations/profileAPI";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [refetchPost, setRefetchPost] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUserData(token);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const userId = userData?.userDetails?._id;

  useEffect(() => {
    let fetchedPosts = [];
    const fetchPosts = async () => {
      try {
        setLoading(true);
        fetchedPosts = await getAllPosts(token);
        const sortedFetchedPosts = fetchedPosts
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt);

        setAllPosts(sortedFetchedPosts.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchPosts();
    }
  }, [token, refetchPost]);

  return (
    <div className="flex flex-col w-full m-3">
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="spinner "></div>
        </div>
      ) : allPosts.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <p className="font-bold text-2xl text-white">No Posts Found !</p>
        </div>
      ) : (
        allPosts.map((post) => (
          <PostCard
            post={post}
            userId={userId}
            key={post._id}
            postUserId={post?.user?._id}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
