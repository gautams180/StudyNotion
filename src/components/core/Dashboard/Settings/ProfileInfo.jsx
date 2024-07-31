import React from 'react'

const ProfileInfo = () => {
  return (
    <div className='text-richblack-5'>
        <h1>
            Profile Information
        </h1>
        <div>
            <div>
                <p>Display Name</p>
                <input
                    type='text'
                 />
                <p>Name enteres above will be used for all issued certificates.</p>
            </div>
            <div>
                <p>Profession</p>
                <div>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfo