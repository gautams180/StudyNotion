import React from 'react'
import ContactUsForm from '../../contact/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='w-3/12 mx-auto flex flex-col gap-2 items-center my-16'>
        <h1 className='text-3xl font-semibold'>
            Get in touch
        </h1>
        <p className='text-sm text-richblack-200'>
            We'd love to hear from you, Please fill out this form.
        </p>
        <div className='mt-10'>
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection