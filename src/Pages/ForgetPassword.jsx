import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }
  return (
    <div className=' min-h-[calc(100vh-3.5rem)] flex items-center justify-center mx-auto'>
      {
        loading ? (
            <div className="spinner"></div>
        ) : (
            <div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblue-500">
                    {
                        !emailSent ? "Reset your Password" : "Check Your Email"
                    }
                </h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-900">
                    {
                        !emailSent
                        ? "Have no fear. we'll email you instructions to reset your password. if you dont have access to your email we can try account recovery"
                        : `We sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent && (
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">Email Address</p>
                                <input
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                        )
                    }

                    <button
                    type='submit'
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                        { 
                            !emailSent ? "Reset Password ": "Resend Email"
                        }
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <Link to="/">
                        <p className="flex items-center gap-x-2 text-pink-600">
                            <BiArrowBack /> Back to Login</p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgetPassword ;
