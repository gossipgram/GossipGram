import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

const RecentSearched = ({ recentSearches, handleSearchItemClick, removeRecentSearch , matchingUsers}) => {
  console.log("matchingUsers={matchingUsers}",matchingUsers);
  const handleRemoveRecentSearch = (userId) => {
    removeRecentSearch(userId);
  };

  return (
    <div className='mt-1'>
      <h1 className='text-yellow-300 text-xl'>Recent</h1>
      {recentSearches && recentSearches.map(user => (
        <div
          key={user._id}
          className="flex flex-row justify-between p-5 border-b m-2 border-yellow-500 bg-richblack-700 hover:bg-richblue-300 cursor-pointer transition-all duration-200 relative"
          
        >
          <div className='flex flex-row justify-between w-full items-center'>
            <div className='flex items-center w-11/12' onClick={() => handleSearchItemClick(user)}>
              <img src={user.image} alt='' className="w-10 h-10 rounded-full mr-4" />
              <div className='flex flex-col'>
                <h3 className="font-semibold text-richblack-5 text-lg">{user.username}</h3>
                <p className="text-richblack-100 text-sm">{user.firstName} {user.lastName}</p>
              </div>
            </div>
            
          </div>
          <button className='text-white cursor-pointer w-1/12' onClick={() => handleRemoveRecentSearch(user._id)}>
              <RiCloseLine />
            </button>
        </div>
      ))}
    </div>
  );
};

export default RecentSearched;
