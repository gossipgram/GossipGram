import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getAllPostsByHashtag } from "../../services/operations/mediaAPI";
import PostGrid from "../Profile/PostGrid";
import ExplorePostGrid from "./ExplorePostGrid";
import { getAllUserData } from "../../services/operations/profileAPI";

const HashtagPosts = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const location = useLocation();
  const currentPath = location.pathname;
  const [hashtag, setHashtag] = useState(currentPath.split("/")[3]);
  const [allPosts, setAllPosts] = useState([]);
  const [hashtagData, setHashtagData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getAllUserData(token);
        setUserData(response?.userDetails);
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
    const fetchHashtagData = async () => {
      try {
        setLoading(true);
        const response = await getAllPostsByHashtag(
          hashtag,
          currentPage,
          token
        );

        setHashtagData(response);
        if (currentPage === 1) {
          setAllPosts(response?.posts);
        } else {
          setAllPosts(...allPosts, response?.posts);
        }

        setTotalPages(response?.totalPages);
      } catch (error) {
        console.log("Error fetching hashtag Posts", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHashtagData();
  }, [hashtag, currentPage]);

  useEffect(() => {
    allPosts?.forEach((post) => {
      if (post?.mediaUrl?.includes("image")) {
        console.log("inside if condition");
        setThumbnail(post?.mediaUrl);
        return;
      }
    });
  }, [allPosts]);

  // Debounce function
  const bottomOfPageRef = useRef();
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
    <div className="w-full flex p-7 pl-20 flex-col gap-10 items-center ">
      <div className="text-richblack-5  w-1/2 flex  gap-5">
        <div className="bg-richblack-600 w-52 h-52 rounded-full flex items-center justify-center">
          {thumbnail === "" ? (
            <p className="text-2xl text-richblack-5 ">Recent Posts</p>
          ) : (
            <img
              src={thumbnail}
              alt="recent post thumbnail"
              className="w-full h-full rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col mt-5 gap-3">
          <p className="text-4xl text-yellow-400">{hashtagData?.hashtagName}</p>
          <p className="text-richblack-200 items-end text-lg">
            {hashtagData?.numberOfPost} Posts
          </p>
        </div>
      </div>

      <div className=" w-1/2 ">
        <p className="text-lg text-richblack-200 mb-4">Top Posts</p>
        <ExplorePostGrid posts={allPosts} userId={userData?.id} />
      </div>
      <div ref={bottomOfPageRef}></div>
    </div>
  );
};

export default HashtagPosts;
