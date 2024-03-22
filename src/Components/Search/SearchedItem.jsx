import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

const SearchedItem = ({ matchingUsers }) => {
  return (
    <div className='mt-6'>
      {matchingUsers && matchingUsers.map((user, index) => (
        <div key={index} className="flex flex-col p-5 border-b m-2 border-yellow-500 bg-richblack-700 hover:bg-richblack-600 cursor-pointer transition-all duration-200 relative">
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
