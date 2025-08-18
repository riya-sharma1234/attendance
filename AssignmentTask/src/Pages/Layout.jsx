import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {

  return (
    <div>
      <Navbar />
      <div className='p-6'>
        <Outlet /> {/* This will load Dashboard or AllUsers based on route */}
      </div>
      </div>
  )
}

export default Layout