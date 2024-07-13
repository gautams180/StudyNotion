import React from 'react'
import { BsPersonFill } from "react-icons/bs";
import { ImTree } from "react-icons/im";

const CourseCard = ({key,cardData,currentCard,setCurrentCard}) => {
  return (
    <div className={`lg:w-[340px] lg:h-[300px] flex flex-col gap-3
    ${cardData.heading == currentCard ? "bg-white shadow-yellow-50 shadow-[10px_10px]" : "bg-richblack-800"} transition-all duration-200 hover:scale-95 `}
    onClick={() => setCurrentCard(cardData.heading)}>
        <div className='px-10 pt-10 font-inter border-dashed border-b-2 border-richblack-300'>
            <h3 className={`text-lg font-semibold mb-4 
            ${cardData.heading == currentCard ? "text-black" : "text-richblack-50" }`}>{cardData.heading}</h3>
            <p className='text-md text-richblack-300 pb-16'>{cardData.description}</p>
        </div>

        <div className={`flex flex-row justify-between items-center font-inter font-semibold px-10
        ${cardData.heading == currentCard ? "text-blue-300" : "text-richblack-300" }`}>
            <div className='flex flex-row gap-1 items-center '>
                <BsPersonFill className=''/>
                <p>{cardData.level}</p>
            </div>
            <div className='flex flex-row gap-1 items-center'>
                <ImTree className=''/>
                <p>{cardData.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
}

export default CourseCard