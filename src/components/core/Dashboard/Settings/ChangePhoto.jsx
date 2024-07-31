import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const ChangePhoto = () => {

    const {user} = useSelector((state) => state.profile);

  return (
    <div className=''>
      <div className='text-richblack-5 ml-10 flex items-center gap-5 p-7 rounded-md bg-richblack-800'>
        <img
        src={user?.image}
        className='w-[78px] rounded-full' />
        <div className='flex flex-col gap-3'>
          <p className='font-medium'>Change Profile Picture</p>
          <div className='flex gap-3'>
            <IconBtn 
              text="Change"
            />
            <IconBtn 
              text='Remove'
              customClasses='h-7 w-fit px-3 rounded-md bg-richblack-600 text-sm text-richblack-5 font-semibold border-[1px] border-richblack-300'
            />
          </div>
        </div>
    </div>
    </div>
  )
}

export default ChangePhoto