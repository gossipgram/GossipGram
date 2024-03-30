import React, { useEffect, useState } from 'react';
import PostModal from './PostModal';

const PostGrid = ({ userId, searchedUserId, matchingUsers }) => {
    const [allUserPost, setAllUserPost] = useState([]);
    const searchedUser = matchingUsers.find(user => user._id === searchedUserId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postDetails, setPostDetails] = useState([]);
    console.log("searched User Id _____________", searchedUserId);
    console.log("userId  _____________", userId);
    console.log("matchingUsers  _____________", matchingUsers);


    const openModal = (post) => {
        setIsModalOpen(true);
        setPostDetails(post)
    };

    useEffect(() => {
        if (searchedUser) {
            setAllUserPost(searchedUser?.posts);
        }
    }, [searchedUser , userId , matchingUsers]);

    return (
        <div>
            {allUserPost.length === 0 ? (
                <h2 className="text-center text-3xl mt-40 text-richblack-5 transition-all duration-700">No Post</h2>
            ) : (
                <div className="grid grid-cols-3 gap-1 transition-all duration-700">
                    {allUserPost.map(post => (
                        <div key={post._id} className="w-52 h-52 bg-black hover:scale-105 hover:backdrop-blur-sm transition-all duration-700" onClick ={ () => openModal(post)}>
                            <img src={post.mediaUrl} alt={post.caption} className="object-cover w-full h-full " />
                        </div>

    
                    ))}
                    {isModalOpen && (
                        <div>
                            <PostModal
                                postDetails={postDetails}
                                userId={userId?._id}
                                postUserId={postDetails?.user}
                                
                                changeIsModalOpen={() => {
                                setIsModalOpen(false);
                            }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostGrid;
