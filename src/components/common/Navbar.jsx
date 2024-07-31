import React, { useState, useEffect } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { RiArrowDownSLine } from "react-icons/ri";

const subLinks = [
    {
        title: "Python",
        link: "/catalog/python"
    },
    {
        title:"Web dev",
        link:"/catalog/web-development"
    }
]

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth );  //extracting token from state of auth
    console.log("Token: ",token);
    const {user} = useSelector( (state) => state.profile );  //extracting user from state of profile
    const {totalItems} = useSelector( (state) => state.cart );  //extracting totalItems from state of cart

    const location = useLocation();

    // // const [subLinks, setSubLinks] = useState([]);

    // const fetchSublinks = async() => {
    //     try{
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         console.log("Printing sublinks result: ", result);
    //         setSubLinks(result.data.data);
    //     }
    //     catch(error){
    //         console.log("Could not fetch the category list")
    //     }
    // }

    // useEffect( () => {
    //     // fetchSublinks();
    // },[])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex flex-row w-11/12 max-w-maxContent items-center justify-between'>

                {/* Image */}
            <Link to="/">
                <img src={logo} alt='logo' width={160} height={42} loading='lazy' />
            </Link>

            {/* Nav links */}
            <nav>
                <ul className='flex flex-row gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => {
                        return <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                     <div className='relative flex items-center gap-1 group '>
                                            <p>{link.title}</p>
                                            <RiArrowDownSLine />

                                            <div className='invisible absolute z-10 left-[50%] -translate-x-[50%] 
                                            top-[50%] translate-y-[20%] 
                                            flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                            opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                                            lg:w-[250px] md:w-[200px] hover:cursor-pointer'>

                                                <div className='absolute -z-10 left-[50%] translate-x-[80%] top-0
                                                -translate-y-[10%] h-6 w-6 rounded-sm rotate-45 bg-richblack-5 mb-40'></div>

                                                {
                                                    subLinks.length ? (
                                                            subLinks.map( (subLink, index) => (
                                                                <Link to={`${subLink.link}`} key={index}>
                                                                    <p className='text-sm font-inter font-medium px-3 py-2 hover:bg-richblack-25 rounded-md'>{subLink.title}</p>
                                                                </Link>
                                                            ))
                                                    ) : (<div></div>)
                                                }

                                            </div>
                                     </div>
                                ) : (
                                    <Link to={link?.path}>                                                        
                                        <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25" }`} >       
                                            {link.title}
                                        </p>
                                    </Link>
                                )
                            }
                        </li>
                    })
                }
                </ul>
            </nav>  

            {/* Login/Signup/Dashboard */}
            <div className='flex gap-x-4 '> 

                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart />
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100 rounded-md '>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {   
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100 rounded-md '>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }

            </div>

        </div>  
    </div>
  )
}

export default Navbar