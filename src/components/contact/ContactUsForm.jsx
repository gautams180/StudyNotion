import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from '../../data/countrycode.json'

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: {errors,isSubmitSuccessfull}
    } = useForm();

    const submitContactForm = async(data) => {
      console.log("Logging Data", data);
      try{
        setLoading(true);
        // const response = await apiConnector("POST", contactusEndPoint.CONTACT_US_API, data);
        const response = {status:"OK"};
        console.log("Logging response", response);
        setLoading(false); 
      }
      catch(error) {
        console.log("Error:", error.message);
        setLoading(false);      }
    }

    useEffect( () => {
      if(isSubmitSuccessfull) {
        reset({
          email:"",
          firstname:"",
          lastname:"",
          message:"",
          phoneNo:"",
        })
      }
    },[reset, isSubmitSuccessfull]);



  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      
      <div className='flex flex-col gap-5 text-[12px]'>

        <div className='flex gap-1 justify-between'>

          {/* first name */}
          <div className='w-[48%] flex flex-col gap-1 '>
            <label htmlFor='firstname'>First Name</label>
            <input
              type='text'
              name='firstname'
              id='firstname'
              placeholder='Enter First Name'
              className='w-full rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px] text-richblack-5 font-medium border-richblack-600 border-b-[1px]'
              {...register("firstname", {required: true})}
            />
            {
              errors.firstname && (
                <span>
                  Please enter your name
                </span>
              )
            }
          </div>

          {/* last name */}
          <div className='w-[48%] flex flex-col gap-1'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type='text'
              name='lastname'
              id='lastname'
              placeholder='Enter Last Name'
              className='w-full rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px] text-richblack-5 font-medium border-richblack-600 border-b-[1px]'
              {...register("lastname")}
            />
          </div>

        </div>

        {/* email */}
        <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email Address</label>
            <input 
              type='email'
              name='email'
              id='email'
              placeholder='Enter email address'
              className='w-full rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px] text-richblack-5 font-medium border-richblack-600 border-b-[1px]'
              {...register("email", {required:true})}
            />
            {
              errors.email && (
                <span>
                  Please enter your email address
                </span>
              )
            }
        </div>
        
        {/* phone no */}
        <div className='flex flex-col gap-x-2 gap-y-1'>
            <label htmlFor='phonenumber'>Phone Number</label>

            <div className='flex flex-row gap-5'>
                {/* dropdown */}
                <select
                    name='dropdown'
                    id='dropdown'
                    className='w-[20%] rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px] text-richblack-5 font-medium border-richblack-600 border-b-[1px]'
                    {...register("countrycode", {required: true})}
                  >
                    {
                      CountryCode.map( (element,index) => {
                        return (
                          <option key={index} value={element.code}>
                            {element.code}-{element.country}
                          </option>
                        )
                      })
                    }
                </select>

                <input 
                    type='number'
                    name='phonenumber'
                    id='phonenumber'
                    placeholder='12345 67890'
                    className='w-[80%] rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px] text-richblack-5 font-medium border-richblack-600 border-b-[1px]'
                    {...register("phoneNo",
                      {
                        required:{value:true, message:"Please enter Phone Number"},
                        maxLength: {value:10, message:"Invalid Phone Number"},
                        minLength: {value:8, message:"Invalid phone Number"}
                      })
                    }
                />
                {
                  errors.phoneNo && (
                    <span>
                      {errors.phoneNo.message}
                    </span>
                  )
                }
            </div>
        </div>

        {/* message box */}
        <div className='flex flex-col gap-1'>
            <label htmlFor='message'>Message</label>
            <textarea 
              name='message'
              id='message'
              cols="30"
              rows="7"
              placeholder='Enter your message here'
              className='w-full rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px] text-richblack-5 font-medium border-richblack-600 border-b-[1px]'
              {...register("message", {required:true})}
            />
            {
              errors.message && (
                <span>
                  Please enter your message.
                </span>
              )
            }
        </div>

        <button type='submit'
        className='h-8 rounded-md bg-yellow-50 text-center px-6 text-[16px] font-medium text-black'>
            Send Message
        </button>

      </div>

    </form>
  )
}

export default ContactUsForm