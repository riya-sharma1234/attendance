import React, { useState } from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import ResetPassword from './Pages/ResetPassword'
import AllUsers from './Pages/AllUsers'
import Layout from './Pages/Layout'
import './App.css'
import EmployeeDetails from './Pages/EmployeeDetails'
import ApplyLeave from './components/ApplyLeave'


const App = () => {

  //  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Layout />}>
         <Route index element={<Dashboard />} />   
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:employeeId" element={<Dashboard />} />
          <Route path="allUsers" element={<AllUsers />} />
          <Route path="employee-details" element={<EmployeeDetails/>}></Route>
          <Route path="apply-leave" element={<ApplyLeave />} />
        </Route>
        <Route path="/login"   element={<Login  />}/>
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default App