import React, { useState } from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../Components/common/ConfirmationModal";
import { togglePrivacy } from '../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';

const AccountPrivacy = ({userData , setUserData}) => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    // const user = useSelector((state) => state.profile.user);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    console.log(userData);

    const [isPrivate, setIsPrivate] = useState(userData.isPrivate);

    const handleTogglePrivacy = async () => {
      const response = await togglePrivacy(token);
      console.log("response ",response);
      setUserData(response.user);
      setIsPrivate(response.user.isPrivate);
    };


  return (
    <div className="flex flex-col w-4/6 mx-auto gap-2">
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-richblack-5">
            Account Privacy
          </h2>
          {/* Toggle Button */}
          <div className="flex items-center justify-between mt-4">
            <label className="mr-2 text-richblack-5 font-semibold">Private account</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isPrivate} 
                onChange={handleTogglePrivacy} 
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="w-4/5 text-pink-25">
            <p>When your account is public, your profile and posts can be seen by anyone, 
                on or off GossipGram, even if they don’t have a GossipGram account.</p>
            <p>
              When your account is private, only the followers you approve can see what you share,
              including your photos or videos on hashtag and location pages, and your followers and following lists.
            </p>
          </div>
          
          {showDeleteModal && (
            <ConfirmationModal modalData={confirmationModal} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountPrivacy
