import React, { useEffect, useState } from 'react';
import PostCard from '../posts/PostCard';

const PostRow = ({ matchingUsers, userId, searchedUserId , userData , searchedUser}) => {

    const [textPosts, setTextPosts] = useState([]);

    useEffect(() => {
        // const searchedUser = matchingUsers.find(user => user._id === searchedUserId);
        if (searchedUser && searchedUser.posts) {
            // Filter out posts with text content
            const filteredPosts = searchedUser.posts.filter(post => post.textContent);
            setTextPosts(filteredPosts.reverse()); // Reverse the order of posts
        }
        console.log(textPosts)
    }, [searchedUserId, matchingUsers]);

    return (
        <div>
            {textPosts.length === 0 ? (
                <h2 className="text-center text-3xl mt-40 text-richblack-5 transition-all duration-700">No Gossip</h2>
            ) : (
                <div className=" transition-all duration-700">
                    {textPosts.map(post => (
                        <PostCard
                        post={post}
                        userId={userData.userDetails?._id}
                        postUserId={post?.user?._id} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostRow;
