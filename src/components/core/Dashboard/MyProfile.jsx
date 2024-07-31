import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { LiaEditSolid } from "react-icons/lia";

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='text-richblack-5 font-inter'>

        <div className='w-3/12 lg:w-9/12 mx-auto flex flex-col gap-10'>
            <h1 className='text-3xl font-medium'>
                My Profile
            </h1>

            {/* section 1 */}
            <div className='bg-richblack-800 flex justify-between items-center p-6 rounded-md'>
                <div className='flex gap-2 items-center'>
                    <img 
                        src={user?.image}
                        alt={`profile-${user?.firstName}`} 
                        className='aspect-square w-[58px] rounded-full object-cover'
                    /> 
                    <div className='flex flex-col'>
                        <p className='font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-[14px] text-richblack-300'>{user?.email}</p>
                    </div>
                </div>
                <IconBtn 
                    text="Edit"
                    children={<LiaEditSolid />}
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>

            {/* section 2 */}
            <div className='bg-richblack-800 flex flex-col items-start gap-4 p-6 rounded-md'>
                <div className='w-full flex justify-between font-semibold'>
                    <p>About</p>
                    <IconBtn 
                        text="Edit"
                        children={<LiaEditSolid />}
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    />
                </div>
                <p className='w-10/12 text-[14px] text-richblack-300'>{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
            </div>

            {/* section 3 */}
            <div className='bg-richblack-800 flex flex-col items-start gap-4 p-6 rounded-md'>
                <div className='w-full flex justify-between font-semibold'>
                    <p className='font-semibold'>Personal Details</p>
                    <IconBtn 
                        text="Edit"
                        children={<LiaEditSolid />}
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    />
                </div>

                <div className='flex gap-20'>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <p className='text-[14px] text-richblack-300'>First Name</p>
                            <p className='font-semibold'>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className='text-[14px] text-richblack-300'>Email</p>
                            <p className='font-semibold'>{user?.email}</p>
                        </div>
                        <div>
                            <p className='text-[14px] text-richblack-300'>Gender</p>
                            <p className='font-semibold'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <p className='text-[14px] text-richblack-300'>Last Name</p>
                            <p className='font-semibold'>{user?.lastName}</p>
                        </div>
                        <div>
                            <p className='text-[14px] text-richblack-300'>Phone Number</p>
                            <p className='font-semibold'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className='text-[14px] text-richblack-300'>Date of Birth</p>
                            <p className='font-semibold'>{user?.additionalDetails?.dateOfBirth ?? "Add date of birth "}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default MyProfile