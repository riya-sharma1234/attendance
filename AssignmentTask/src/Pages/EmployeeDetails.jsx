import React from 'react'
import UserData from '../components/userData'
import Announcement from '../components/Announcement'
// import TaskList from '../components/TaskList'
import Document from '../components/Document'
import Leaves from '../components/Leaves'
import EmployeeDetailsForm from '../components/EmployeeDetailsForm'
import { fetchMe } from '../redux/authSlice'
import PaySlip from '../components/PaySlip'
import PaySlip2 from '../components/PaySlip2'
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const EmployeeDetails = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
  dispatch(fetchMe());
}, [dispatch]);


  return (
    <div className='bg-gray-900 min-h-screen p-4 space-y-6 mx-auto w-full max-w-8xl'>
        <UserData />
        <Announcement />
        {/* <TaskList /> */}
        <Document />
        <Leaves />
        {/* <EmployeeDetailsForm/> */}
        {user?.role === "admin" && <PaySlip />}
        {user?.role === "admin" && <PaySlip2 />}
    </div>
  )
}

export default EmployeeDetails