import React, { useState } from 'react'
import octaadslogo from "../assets/octaadslogo.jpg"
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import api from "../utils/axios.js"
import { toast } from "react-toastify"

const ResetPassword = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailSent, setISEmailSent] = useState("")
  const [otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)
   
    const inputRefs = React.useRef([])

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text");
        const pasteArray = paste.split("");
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        })
    }
   

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const {data} = await api.post("/user/reset-otp", {email})
            if(data.success){ 
                toast.success(data.message)
                setISEmailSent(true)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
             toast.error(error.message)
        }
    }

    const onSubmitOTP = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value)
        setOtp(otpArray.join(""))
        setIsOtpSubmited(true)
    }
    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
     try {
        const {data} = await api.post("/user/reset-password", {email, otp, newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && Navigate("/login")
     }catch (error){
        toast.error(error.message)
     }
    };

    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //     },
    //     validationSchema: Yup.object({
    //         email: Yup.string()
    //             .email('Invalid email address')
    //             .required('Email is required'),
    //     }),
    //     onSubmit: (values) => {
    //         console.log('Form submitted with:', values);
    //         // handle form submission (e.g., API call)
    //     },
    // });

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-900'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-120 '>

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

                {/* email form */}

                 {!isEmailSent && <form  onSubmit= {onSubmitEmail}>
                        <h1 className='text-blue-600 font-bold text-2xl font-semibold text-center mb-4'>Reset Password</h1>
                        <p className='text-left  text-blue-600'>Enter your registered email address.</p>
                         <input type="email" placeholder='Enter email' className='w-full mt-1 mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-500 outline-none'/>
                        <button className='w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold'>Submit</button>
                        </form>}
                {/* <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
                    <h1 className="text-blue-600 text-2xl font-bold text-center mb-4">Reset Password</h1>
                    <p className="text-left text-blue-600 mb-2">Enter your registered email address.</p>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className={`w-full mt-1 mb-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500' : 'border-blue-500 focus:ring-blue-600'
                            }`}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mb-2">{formik.errors.email}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-3 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold"
                    >
                        Submit
                    </button>
                </form> */}


                {/* otp input form */}
               {!isOtpSubmited && isEmailSent && <form  onSubmit={onSubmitOTP} >
                    <h1 className='text-blue-600 font-bold text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
                    <p className='text-left  text-blue-600 mb-2'>Enter the 6-digit code sent to your email id.</p>
                    <div className='flex justify-between mb-8' onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} type="text" maxLength="1" key={index} required className="w-10 h-10 bg-[#333A5C] text-white text-center rounded-md" />
                        ))}
                    </div>
                    <button className='w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold'>Submit</button>
                </form> }

                {/* Enter new password */}
                {isOtpSubmited && isEmailSent && <form onSubmit={onSubmitNewPassword}>
                    <h1 className='text-blue-600 font-bold text-2xl font-semibold text-center mb-4'>New Password</h1>
                    <p className='text-left  text-blue-600'>Enter the new password below.</p>

                    <div className='relative mb-4'>
                        <input type={showPassword ? "text" : "password"} placeholder='Password'  className='w-full   px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-500 outline-none'
                      />

                        <span className='absolute right-3 top-2.5 text-gray-500 cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash/> : <FaEye />}
                        </span>
                    </div>
                    
                    <div className='relative mb-4'>
                       <input  type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" className="w-full mt-1 mb-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-500"  required />
                       <span className='absolute right-3 top-3 text-gray-500 cursor-pointer ' onClick={() =>  setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                 

                    <button className='w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold'>Submit</button>
                </form> }

            </div>
        </div>
    )
}

export default ResetPassword