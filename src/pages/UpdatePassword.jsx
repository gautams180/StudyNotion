import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    });
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);

    const {password,confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData( (prevdata) => (
            {
                ...prevdata,
                [e.target.name] : e.target.value
            }
        ))
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password, confirmPassword, token));
    }

  return (
    <div className='text-white flex justify-center font-inter'>
        {
            loading ? (
                <div>
                    Loading....
                </div>
            ) : (
                <div className='lg:w-[320px] flex flex-col gap-4 mt-52'>
                    <h1 className='text-xl text-richblack-5 font-semibold'>Choose new Password</h1>
                    <p className='text-sm text-richblack-200'>Almost done. Enter your new password and you're all set.</p>
                    <form onSubmit={handleOnSubmit}
                    className='flex flex-col gap-5'>

                        <label className='relative'>
                            <p className='text-[10px] text-richblack-100 mb-1'>New Password <span className='text-[#d62828]'>*</span></p>
                            <input 
                                required
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Password'
                                className='w-full px-2 py-2 text-sm rounded-md border-b-[1px] border-richblack-400 bg-richblack-800 text-richblack-5'
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute top-7 right-2'
                            >
                                {
                                    showPassword 
                                    ? <AiFillEyeInvisible fontSize={20} /> 
                                    : <AiFillEye fontSize={20} />
                                }
                            </span>
                        </label>

                        <label className='relative'>
                            <p className='text-[10px] text-richblack-100 mb-1'>Confirm New Password <span className='text-[#d62828]'>*</span></p>
                            <input 
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm Password'
                                className='w-full px-2 py-2 text-sm rounded-md border-b-[1px] border-richblack-400 bg-richblack-800 text-richblack-5'
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='absolute bottom-2 right-2'
                            >
                                {
                                    showConfirmPassword 
                                    ? <AiFillEyeInvisible fontSize={20} /> 
                                    : <AiFillEye fontSize={20} />
                                }
                            </span>
                        </label>

                        <button type='submit'
                        className='bg-yellow-50 w-full lg:text-[12px] text-richblack-900 font-semibold py-2 rounded-md mt-2'>
                            Reset Password
                        </button>

                    </form>
                    <div className='flex items-center gap-2 text-[15px] mt-2'>
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

export default UpdatePassword