import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import ContactUsForm from '../components/contact/ContactUsForm';
import Footer from '../components/common/Footer';


const contactTypes = [
  {
    icon: <HiChatBubbleLeftRight />,
    title: "Chat on us",
    description: "Our friendly team is here to help @mail address"
  },
  {
    icon: <BsGlobeCentralSouthAsia  />,
    title: "Visit us",
    description: "Come and say hello at our office HQ. Here is the location/address"
  },
  {
    icon: <IoIosCall  />,
    title: "Call us",
    description: "Mon - Fri From 8am to 5pm +123 456 7890"
  }
]

const ContactUs = () => {
  return (
    <div className='text-richblack-5'>

        <div className='w-11/12 mx-auto flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-10 mt-20'>

          <div className='w-[300px] h-fit bg-richblack-800 flex flex-col gap-6 p-8 rounded-md'>
              {
                contactTypes.map((contact, index) => {
                  return (
                    <div key={index} className=' flex gap-1'>
                      {contact.icon}
                      <div className=''>
                        <h1 className=' text-sm font-semibold'>{contact.title}</h1>
                        <p className='text-[11px] text-richblack-300 w-[200px]'>{contact.description}</p>
                      </div>
                    </div>
                  )
                })
              }
          </div>

          <div className='w-[300px] lg:w-[450px] p-8 border-richblack-600 border-[1px] rounded-md'>
              <h1 className='text-2xl fonts-semibold'>
                Got a Idea? We've got the skills.
                Let's team up
              </h1>
              <p className='text-[11px] text-richblack-300 mt-1 mb-4'>
                Tell us more about yourself and what you've got in mind.
              </p>
              <ContactUsForm />
          </div>

          <Footer />

        </div>

    </div>
  )
}

export default ContactUs