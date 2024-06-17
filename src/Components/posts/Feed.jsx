import React, { useRef, useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from "../../services/operations/mediaAPI";
import { getAllUserData } from "../../services/operations/profileAPI";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token").split('"')[1];
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getAllUserData(token);
        setUserId(response?.userDetails?._id);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getAllPosts(token, currentPage);
        const fetchedPosts = response?.posts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (currentPage === 1) {
          setAllPosts(fetchedPosts);
        } else {
          setAllPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
        }

        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, currentPage, token]);

  const bottomOfPageRef = useRef();

  // Debounce function
  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        !loading &&
        bottomOfPageRef.current &&
        window.innerHeight + window.scrollY >= bottomOfPageRef.current.offsetTop
      ) {
        if (currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages, loading]);

  return (
    <div className="flex flex-col  w-full m-3">
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="spinner"></div>
        </div>
      ) : allPosts.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <p className="font-bold text-2xl text-white">No Posts Found!</p>
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
      <div className="spinner mx-auto"></div>
      <div ref={bottomOfPageRef}></div>
    </div>
  );
};

export default Feed;
