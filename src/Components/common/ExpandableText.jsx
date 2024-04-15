import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpandableText = ({ text, maxLength }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHashtagClick = (hashtag) => {
    console.log(hashtag);
    navigate(`/posts/${hashtag}`);
  };

  const renderCaptionWithHashtag = () => {
    const words = text.split(/(#[^\s#]+)/g);
    return words.map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span
            key={index}
            className="text-yellow-200 cursor-pointer"
            onClick={() => handleHashtagClick(word.slice(1))}
          >
            {word}
          </span>
        );
      }
      return <span key={index}> {word} </span>;
    });
  };

  if (text.length <= maxLength) {
    return <p>{renderCaptionWithHashtag()}</p>;
  }

  return (
    <div>
      <p>
        {isExpanded
          ? renderCaptionWithHashtag()
          : `${text.substring(0, maxLength)}... `}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-500 hover:underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
};

export default ExpandableText;
