import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { sendOtp,signUp } from '../services/operations/authAPI';
import { BsArrowLeft } from "react-icons/bs";
import { IoReload } from "react-icons/io5";

const VerifyEmail = () => {
    const [otp, setOtp] = useState(""); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData ,loading} =  useSelector( (state) => state.auth );

    useEffect( () => {
        if(!signupData) {
            navigate("/signup");
        }
    },[]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword 
        } = signupData;

        dispatch(signUp(accountType,
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                        otp,
                        navigate
                    ));
    }

  return (
    <div className='text-richblack-5 flex items-center justify-center'>
        {
            loading
            ? (<div>
                Loading...
            </div>)
            : (
                <div className='lg:max-w-[360px] flex flex-col gap-4 mt-40 font-inter'>
                    <h1 className='text-xl font-bold'>Verify Email</h1>
                    <p className='text-sm text-richblack-300'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} >
                        <OTPInput
                            value = {otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className='mx-2 '>{" "}</span>}
                            renderInput={(props) => <input {...props} className='bg-richblack-800' /> }
                            containerStyle={{
                                width: "100%",
            
                            }}
                            inputStyle={{
                                width: "40px",
                                height:"35px",
                                borderRadius: "5px",
                                borderBottom: "1px solid ",
                                
                            }}
                         />
                         <button type='submit' className='bg-yellow-50 text-richblack-900 mt-6 w-full h-10 rounded-md'>
                            Verify and Register
                         </button>
                    </form>

                    <div className='w-full flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <BsArrowLeft />
                            <Link to="/login">
                                <p>Back to Login</p>
                            </Link>
                        </div>

                        <button 
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                            className='flex items-center gap-2 text-blue-50'
                        >   
                            <IoReload />
                            Resend it
                        </button>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail