import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    type={type}
     className={ customClasses ? customClasses : 'h-7 w-fit px-3 py-1 rounded-md bg-yellow-50 text-richblack-900 text-sm font-semibold'}>
        {
            children ? (
                <div className='flex gap-1 items-center'>
                    <span>
                        {text}
                    </span>
                    {children}
                </div>
            ) 
            : (
                text
            )
        }
    </button>
  )
}

export default IconBtn