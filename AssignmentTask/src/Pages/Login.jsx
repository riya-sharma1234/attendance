import React, { useState, useEffect } from 'react';
import octaadslogo from "../assets/octaadslogo.jpg"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify"
import api from "../utils/axios.js"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/authSlice";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleLogin = async () => {
    //     if (!email || !password) {
    //         toast.error("Please enter email and password");
    //         return;
    //     }
    //     try {
    //         const res = await api.post("/user/login", {
    //             email, password
    //         });

    //         if (res.data.success) {
    //             toast.success("Login successful!")
    //             console.log("user", res.data.user);
    //         } else {
    //             toast.error(res.data.message);
    //         }
    //     }
    //     catch (err) {
    //         toast.error(err.response?.data?.message || "Login failed");
    //     }
    // };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    // redirect if already logged in
    useEffect(() => {
        if (user) {
            toast.success("Login successful!");
            navigate("/"); // go to dashboard
        }
    }, [user, navigate]);

    const handleLogin = () => {
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        dispatch(loginUser({ email, password }));
    };
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

                <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}
                    className='w-full mt-4 mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-500 outline-none' />

                <div className='relative mb-4'>
                    <input type={showPassword ? "text" : "password"} placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full   px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-500 outline-none' />
                    <span className='absolute right-3 top-2.5 text-gray-500 cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye />}
                    </span>
                </div>

                <button onClick={handleLogin}
                    className='w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold cursor-pointer'>
                    Login
                </button>

                <div className='text-center mt-3'>
                    <Link to="/reset-password" className='text-sm text-blue-500 hover:underline'>
                        Forget Password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login