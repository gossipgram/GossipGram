import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllPostsByHashtag } from "../services/operations/mediaAPI";
import HashtagPosts from "../Components/Explore/HashtagPosts";

const ExplorePage = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const location = useLocation();
  const currentPath = location.pathname;
  const [page, setPage] = useState("");
  // const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const currentPage = currentPath.split("/")[2];
    setPage(currentPage);
  }, [currentPath]);

  return (
    <div className="w-full min-h-screen">
      {page === "tag" ? (
        <HashtagPosts />
      ) : (
        <div>
          <h1>Explore page</h1>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
