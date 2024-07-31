import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-center mx-auto text-3xl font-semibold'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"} />
        ,
        <span className='bg-gradient-to-br from-[#FF512F]  to-[#F09819] text-transparent bg-clip-text'>
            {" "}
            expertise
        </span>
        , and community to create and
        <span className='bg-gradient-to-br from-[#E65C00]  to-[#F9D423] text-transparent bg-clip-text'>
            {" "}
            unparalleled educational experiance.
        </span>
    </div>
  )
}

export default Quote