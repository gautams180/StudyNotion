import React from 'react'

const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    <div className='h-52 bg-richblack-800'>
        <div className='py-16'>
            <div className='w-8/12 mx-auto flex gap-x-5 justify-around items-center'>
                {
                    Stats.map( (data,index) => {
                        return (
                            <div key={index} className='flex flex-col items-center gap-4'>
                                <h1 className='text-3xl font-semibold'>
                                    {data.count}
                                </h1>
                                <h2 className='text-sm text-richblack-200'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default StatsComponent