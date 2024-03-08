import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible , AiFillEye  } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { resetPassword } from '../services/operations/authAPI';

const UpdatedPassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [formData , setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const [showPassword , setShowPassword]=useState(false);
    const [showConfirmPassword , setShowConfirmPassword]=useState(false);
    const {loading} = useSelector( (state) => state.auth);
    const {password , confirmPassword} = formData;
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {
        loading ? (
            <div className='spinner'>

            </div>
        ) : (
            <div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblue-600">Choose New Password</h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-900">Almost done. Enter your new password and you are all set.</p>
                <form onSubmit={handleOnSubmit}>
                    <label className='relative'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">New Password <span className='text-pink-200'>*</span> </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            placeholder='New Password'
                            style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            onChange={handleOnChange}
                            
                        />
                        <span 
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showPassword
                                ? <AiFillEyeInvisible fontSize={24} fill="#AFB2BF"/>
                                : <AiFillEye fontSize={24} fill="#AFB2BF"/>
                            }
                        </span>
                    </label>

                    <label className="relative mt-3 block">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800"> Confirm New Password <span className='text-pink-200'>*</span> </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            placeholder='Confirm New Password'
                            onChange={handleOnChange}
                            style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            
                        />
                        <span 
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showConfirmPassword
                                ? <AiFillEyeInvisible fontSize={24} fill="#AFB2BF"/>
                                : <AiFillEye fontSize={24} fill="#AFB2BF"/>
                            }
                        </span>
                    </label>
                    <button type='submit'
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                    <Link to="/">
                        <p className="flex items-center gap-x-2 text-pink-600">
                            <BiArrowBack /> Back To Login</p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatedPassword

