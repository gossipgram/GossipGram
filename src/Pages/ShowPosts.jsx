import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllPostsByHashtag } from "../services/operations/mediaAPI";

const ShowPosts = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const location = useLocation();
  const currentPath = location.pathname;
  const hashtag = currentPath.split("/")[2];
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    try {
      getAllPostsByHashtag(hashtag, token);
    } catch (error) {}
  }, [hashtag]);

  return (
    <div>
      <div>Hashtag</div>
      <div></div>
    </div>
  );
};

export default ShowPosts;
