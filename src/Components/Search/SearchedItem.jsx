import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

const SearchedItem = ({ matchingUsers , setUserId , handleSearchItemClick }) => {

  // const handleSearchItemClick = async () => {
  //   try {

  //     handleShowUserProfile();
  //     navigate(`/search/${username}`);

    
  //   } catch (error) {
  //     console.error('Error fetching userId:', error.message);
  //     toast.error('Failed to fetch userId. Please try again.');
  //   }
  // };

  return (
    <div className='mt-1'>
      {matchingUsers && matchingUsers.map((user, index) => (
        <div 
        key={index} 
        className="flex flex-col p-5 border-b m-2 border-yellow-500 bg-richblack-700 hover:bg-richblue-300 cursor-pointer transition-all duration-200 relative"
        onClick={() => handleSearchItemClick(user , user.username)}>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex items-center'>
              <img src={user.image} alt='' className="w-10 h-10 rounded-full mr-4" />
              <div className='flex flex-col'>
                <h3 className="font-semibold text-richblack-5 text-lg">{user.username}</h3>
                <p className=" text-richblack-100 text-sm">{user.firstName} {user.lastName}</p>
              </div>
            </div>
            {/* <div className='flex items-center'>
              <RiCloseLine className='text-richblack-5 text-sm cursor-pointer' />
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchedItem;
