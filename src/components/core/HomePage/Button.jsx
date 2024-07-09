import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>

        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
          ${active ? "bg-yellow-50 text-black shadow-yellow-25" : "bg-richblack-800 shadow-richblack-600" }
          hover:scale-95 transition-all duration-200 shadow-inner `} 
        > 
            {children}
        </div>

    </Link>
  )
}

export default CTAButton;