import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className='mx-auto text-white '>
        {/* section 1 */}
        <section className='bg-richblack-800'>
            <div className='h-[600px] flex flex-col items-center gap-10 relative z-0'>
                <p className='text-sm text-richblack-200 mt-[90px]'>About us</p>
                <header className='lg:w-[650px] flex flex-col items-center text-3xl font-medium'>
                    Driving Innovation in Online Education for a
                    <HighlightText text={"Brighter Future"} />
                    <p className='text-sm text-richblack-200 font-normal mt-3 text-center'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
                <div className='absolute -bottom-16 flex gap-x-3 mx-auto'>
                    <img src={BannerImage1} />
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
                </div>
                <div className='min-w-[20%] min-h-[20%] absolute bottom-28 left-[50%] -translate-x-[50%] -z-10 shadow-yellow-50 shadow-[0px_-12px_60px]  '></div>
            </div>
        </section>

        {/* section 2 */}
        <section>
            <div className='w-8/12 h-44 mt-32 mx-auto'>
                <Quote />
            </div>
        </section>

        {/* section 3 */}
        <section className='border-richblack-500 border-t-[1px]'>
            <div className='w-8/12 mx-auto flex flex-col gap-24 my-16 '>
                {/* founding story wala div */}
                <div className='flex justify-between'>
                    {/* founding story left box */}
                    <div className='w-[45%] flex flex-col gap-4 text-sm text-richblack-200'>
                        <h1 className='text-3xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text'>Our Founding Story</h1>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* founding story right box */}
                    <div className='w-[45%] flex justify-center items-center relative z-0'>
                        <div className='min-w-[50%] min-h-[50%] absolute top-16 left-16 -z-10 bg-pink-50  shadow-pink-50 shadow-[-16px_-16px_60px] '></div>
                        <img src={FoundingStory} width={350} className='z-0 absolute left-16' />
                    </div>
                </div>

                {/* vision and mission wala parent div */}
                <div className='flex justify-between gap-28'>
                    {/* left box */}
                    <div className=' flex flex-col gap-4 text-sm text-richblack-200'>
                        <h1 className='text-3xl font-semibold bg-gradient-to-br from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>Our Vision</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience</p>
                    </div>

                    {/* right box */}
                    <div className=' flex flex-col gap-4 text-sm text-richblack-200'>
                        <h1 className='text-3xl'><HighlightText text={"Our Mission"} /></h1>
                        <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities</p>
                    </div>
                </div>
            </div>
        </section>

        {/* section 4 */}
        <StatsComponent />

        {/* section 5 */}
        <section className='mx-auto flex flex-col items-center justify-between gap-5 my-16'>
            <LearningGrid />
            <ContactFormSection />
        </section>

        <section>
            <div>
                Reviews from other learners
                {/* <ReviewSlider /> */}
            </div>
        </section>

        {/* footer */}
        <Footer />


    </div>
  )
}

export default About