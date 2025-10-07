import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "../redux/authSlice";

const UserData = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

     useEffect(() => {
     dispatch(fetchMe());
  }, [dispatch]);

    if (loading) return <p className="text-white">Loading...</p>;
    if (!user) return <p className="text-white">No user logged in</p>;

    return (
        <div className=" bg-[#0d1321] flex justify-center items-center p-1 mx-20">
            <div className="flex flex-col md:flex-row gap-10">

               
                <div className="w-70 bg-white rounded-xl shadow-xl transition-transform hover:scale-105">
                    <div className="bg-[#043e6d] h-20 rounded-t-xl relative">
                        <div className="text-white text-center py-1">
                            <h2 className="text-xl font-bold tracking-wide">OctaAds Media</h2>
                        </div>
                        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                            <img
                                src= {user.profileImage}
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
                            />
                        </div>
                    </div>

                    <div className="mt-12 px-4 pb-4 text-center">
                        <h3 className="font-bold text-lg text-black">{user.name}</h3>
                        <p className="text-sm text-gray-600 font-semibold">{user.department}</p>
                        <div className="text-sm mt-3 text-left text-gray-700 space-y-1">
                            <p><span className="font-semibold">DOB</span>: {user.dob}</p>
                            {/* <p><span className="font-semibold">Phone</span>: {user.phone}</p> */}
                            <p><span className="font-semibold">E-mail</span>: {user.email}</p>
                             <p><span className="font-semibold">salary</span>:{user.salary} </p>
                        </div>
                    </div>
                </div>

                
                <div className="w-70 bg-white rounded-xl shadow-xl transition-transform hover:scale-105">
                    <div className="bg-[#043e6d] h-18 text-white text-center py-2 rounded-t-xl">
                        <h2 className="text-xl font-bold tracking-wide">OctaAds Media</h2>
                    </div>

                    <div className="px-4 py-5 text-sm text-gray-700 space-y-3">
                        <p><span className="font-semibold">Join Date</span>: {user.joiningDate}</p>
                        <p><span className="font-semibold">Expire Date</span>: {user.appraisalDate}</p>

                        <div className="text-center text-xs text-gray-500 pt-3">
                            <p>Your address goes here</p>
                            <p>125 Street, USA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}

export default UserData