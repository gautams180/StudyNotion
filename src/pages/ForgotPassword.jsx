import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { BsArrowLeft } from "react-icons/bs";

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email,setEmail] = useState("");

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

  return (
    <div className='flex justify-center items-center font-inter'>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div className='lg:w-[350px] mt-52 flex flex-col gap-3'>
                    <h1 className='text-richblack-5 font-semibold text-xl'>
                        {
                            !emailSent ? "Reset your Password" : "Check Your Email"
                        }
                    </h1>

                    <p className='text-sm text-richblack-200'>
                        {
                            !emailSent 
                            ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p className='text-[10px] text-richblack-200 mb-1'>Email Address <span className='text-[#d62828]'>*</span></p>
                                    <input
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Your Email Address'
                                        className='w-full h-8 rounded-md border-b-2 border-richblack-600 px-2 text-sm bg-richblack-800 text-richblack-5 mb-5'
                                    />

                                </label>
                            )
                        }

                        <button
                        type='submit'
                        className='bg-yellow-50 w-full lg:text-[12px] text-richblack-900 font-semibold py-2 rounded-md'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div className='flex items-center gap-2 text-[15px]'>
                        <BsArrowLeft />
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword