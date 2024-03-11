import React from "react";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from "../../services/operations/mediaAPI";
import { all } from "axios";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];

  useEffect(() => {
    let fetchedPosts = [];
    const fetchPosts = async () => {
      setLoading(true);

      try {
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
  }, [token]);

  return (
    <div className="flex flex-col h w-full">
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="spinner "></div>
        </div>
      ) : allPosts.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <p className="font-bold text-2xl text-white">No Posts Found !</p>
        </div>
      ) : (
        allPosts.map((post) => <PostCard post={post} id={post._id} />)
      )}
    </div>
  );
};

export default Feed;
