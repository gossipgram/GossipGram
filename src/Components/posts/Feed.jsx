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
        setAllPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
        console.log(allPosts);
      }
    };
    if (token) {
      fetchPosts();
    }
  }, [token]);

  return (
    <div>
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="spinner "></div>
        </div>
      ) : allPosts.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <p className="font-bold text-2xl text-richblue-700">
            No Posts Found !
          </p>
        </div>
      ) : (
        allPosts.map((post) => <PostCard post={post} id={post._id} />)
      )}
    </div>
  );
};

export default Feed;
