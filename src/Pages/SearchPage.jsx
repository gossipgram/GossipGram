import React, { useEffect, useState } from 'react'
import { MdOutlineSearch } from "react-icons/md";
import { getAllUsers } from '../services/operations/authAPI';
import SearchedItem from '../Components/Search/SearchedItem';


const SearchPage = () => {

    const token = localStorage.getItem("token").split('"')[1];
    const [allUsers, setAllUsers] = useState([]);
    const [matchingUsers , setMatchingUsers] = useState([]);
    const [searchUser , setSearchUser] = useState('');

    useEffect(() => {
      const fetchAllUsers =async () =>{
        try{
          const res = await getAllUsers(token);
          console.log("ALLLLLLLLLLLL_______USSERRSSSS",res);
          setAllUsers(res.users);
        }catch(error){
          console.error("Error fetching user data:", error.message);
        }
      }
      if (token) {
        fetchAllUsers();
      }
    }, [token]);

    const changeHandler = (event) => {
        setSearchUser(event.target.value);
    };

    const submitHandler = () => {
      
    }

    useEffect(() => {
      if(searchUser){
        const filteredUsers = allUsers.filter(users =>
            users.username.toLowerCase().includes(searchUser.toLowerCase())
        );
        setMatchingUsers(filteredUsers);
      }else{
        setMatchingUsers(null);
      }
    }, [searchUser, allUsers]);

    console.log("matched username ________", matchingUsers);


  return (
    <div className='flex flex-row p-10 gap-5 w-full h-screen justify-stretch'>
      <div className='flex flex-col bg-richblack-700 w-4/12 h-full p-5 rounded-md gap-5'>
        <h1 className='text-richblack-5 text-3xl font-semibold'>SEARCH</h1>
        <form action="" onSubmit={submitHandler}>
            <label className="w-full relative text-[0.875rem] text-pure-greys-5  mb-1 leading-[1.375rem]">
              <input
                required
                type="text"
                name="search"
                onChange={changeHandler}
                placeholder="Search"
                className="bg-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
        </form>

        <SearchedItem 
        matchingUsers={matchingUsers}
        />

      </div>

      <div className='flex flex-row bg-richblack-700 w-full p-5 rounded-md '>

      </div>
    </div>
  )
}

export default SearchPage
