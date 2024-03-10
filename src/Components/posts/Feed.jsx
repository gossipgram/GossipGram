import React from "react";
import { useState, useEffect } from "react";
import "../common/spinner.css";
// import PostCard from "./PostCard";
import { getAllPosts } from "../../services/operations/mediaAPI";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const posts = await getAllPosts(token);
        // setAllPosts(posts);
        console.log(posts);
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
        <h1>hello</h1>
      )}
    </div>
  );
};

export default Feed;
