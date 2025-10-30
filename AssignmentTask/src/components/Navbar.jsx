import React, { useEffect, useRef, useState } from 'react';
import { FaUsers, FaUserCircle, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dashboardlogo from "../assets/dashboardlogo.png";
import { logoutUser } from '../redux/authSlice';
import { fetchMe } from "../redux/authSlice";

const Navbar = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  
       useEffect(() => {
       dispatch(fetchMe());
    }, [dispatch]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err || "Logout failed");
      });
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-3 relative">
      {/* Logo and Dashboard */}
      <div className='flex items-center space-x-2 cursor-pointer' onClick={() => navigate('/dashboard')}>
        <img className="w-10 h-10" src={dashboardlogo} alt="Dashboard Logo" />
        <h1 className="text-2xl font-semibold text-gray-600">Dashboard</h1>
      </div>

      {/* User Icons */}
      <div className="flex items-center gap-4 relative mr-7 px-3 space-x-2">
        <FaUsers
          className="text-5xl text-gray-600 cursor-pointer"
          onClick={() => navigate('/allUsers')}
        />

        {/* User Avatar */}
        <div className="flex flex-col items-end relative">
          {/* <FaUserCircle
            className="text-4xl text-gray-600 cursor-pointer"
            onClick={() => setShowDropDown((prev) => !prev)}
          />
          {user && (
            <span className="text-sm text-gray-700 font-medium mt-1">{user.name}</span>
          )} */}
          {user ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={() => setShowDropDown((prev) => !prev)}
            />
          ) : (
            <>
              <FaUserCircle
                className="text-4xl text-gray-600 cursor-pointer"
                onClick={() => setShowDropDown((prev) => !prev)}
              />
              {/* <span className="text-sm text-gray-700 font-medium mt-1">{user.name}</span> */}
            </>
          )}

          {/* Dropdown */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 bg-white border-2 shadow-md rounded-md w-40 z-50 border-gray-900"
            >
              <button
                onClick={() => {
                  navigate('/employee-details');
                  setShowDropDown(false);
                }}
                className="flex gap-1 w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md text-gray-900 cursor-pointer"
              >
                <FaUser className="text-gray-600 mt-1" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full gap-1 text-left px-2 py-2 text-red-600 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <FaSignOutAlt className="text-red-500 mt-1" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
