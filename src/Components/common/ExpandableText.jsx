import React, { useState } from 'react';

const ExpandableText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  return (
    <div>
      <p>
        {isExpanded ? text : `${text.substring(0, maxLength)}... `}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-500 hover:underline"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </p>
    </div>
  );
};

export default ExpandableText;
