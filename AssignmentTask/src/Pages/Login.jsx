import React, { useState } from 'react'
import octaadslogo from "../assets/octaadslogo.jpg"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {toast} from "react-toastify"

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-100'>

                <div className="flex items-center space-x-1 mb-4">
                    <img
                        src={octaadslogo}
                        alt="OctaAds Logo"
                        className="h-[70px] w-[70px] rounded-full object-cover mix-blend-multiply"
                    />

                    <span className="text-5xl font-bold text-black leading-tight ">
                        <span className="block text-black">ctaads</span>
                        <span className=" text-xl block  text-gray-600 tracking-widest px-4">Media</span>
                    </span>
                </div>

                <input type="email" placeholder='Enter email' className='w-full mt-4 mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-500 outline-none'/>

                <div className='relative mb-4'>
                    <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full   px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-500 outline-none'/> 
                    <span className='absolute right-3 top-2.5 text-gray-500 cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye/>}
                    </span>
                </div>

                <button className='w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold'>
                 Login
                </button>

                <div className='text-center mt-3'>
                    <a href="#" className='text-s, text-blue-500 hover:underline'>
                        Forget Password?
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login