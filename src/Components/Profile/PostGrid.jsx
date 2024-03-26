import React, { useEffect, useState } from 'react';

const PostGrid = ({ userId, searchedUserId, matchingUsers }) => {
    const [allUserPost, setAllUserPost] = useState([]);

    const searchedUser = matchingUsers.find(user => user._id === searchedUserId);

    useEffect(() => {
        if (searchedUser) {
            setAllUserPost(searchedUser?.posts);
        }
    }, [searchedUser]);

    return (
        <div className="grid grid-cols-3 gap-1 shadow-2xl">
            {allUserPost.map(post => (
                <div key={post._id} className=" w-52 h-52">
                    <img src={post.mediaUrl} alt={post.caption} className="object-cover w-full h-full" />
                </div>
            ))}
        </div>
    );
};

export default PostGrid;
