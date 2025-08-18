import React, { useEffect, useRef, useState } from 'react';
import { FaUsers, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dashboardlogo from "../assets/dashboardlogo.png"
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ toggleAllUsers }) => {
  const [showDropdown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-3 relative">
      <div className='flex items-center  space-x-2' onClick={() => navigate('/dashboard')}>
        <img className="w-10 h-10 cursor-pointer " src={dashboardlogo} alt="" />
        <h1 className="text-2xl font-semibold text-gray-600 cursor-pointer">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4 relative mr-7 px-3 space-x-2">
        <FaUsers
          className="text-5xl text-gray-600 cursor-pointer"
          onClick={() => navigate('/allUsers')}
        />
        <FaUserCircle
          className="text-4xl text-gray-600 cursor-pointer "
          onClick={() => setShowDropDown((prev) => !prev)}
        />
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-12 bg-white border-2 shadow-md rounded-md w-40 z-50 border-gray-900 "
          >
            <button
              onClick={() => {
                navigate('/employee-details'); 
                setShowDropDown(false); // Close dropdown after click
              }}
              className="flex gap-1  w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md outline-none text-gray-900 cursor-pointer"
              style={{ color: '#1f2937' }}
            >
              <FaUser className="text-gray-600 mt-1" />
              Profile
            </button>
            <button className="flex w-full gap-1 text-left px-2 py-2 text-red-600 hover:bg-gray-100 rounded-md outline-none cursor-pointer ">
               <FaSignOutAlt className="text-red-500 mt-1" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
