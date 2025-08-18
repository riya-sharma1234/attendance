import React from 'react'
import UserData from '../components/userData'
import Announcement from '../components/Announcement'
import TaskList from '../components/TaskList'
import Document from '../components/Document'
import Leaves from '../components/Leaves'
import EmployeeDetailsForm from '../components/EmployeeDetailsForm'
import PaySlip from '../components/PaySlip'


const EmployeeDetails = () => {
  return (
    <div className='bg-gray-900 min-h-screen p-4 space-y-6 mx-auto w-full max-w-8xl'>
        <UserData />
        <Announcement />
        <TaskList />
        <Document />
        <Leaves />
        <EmployeeDetailsForm/>
        <PaySlip />
    </div>
  )
}

export default EmployeeDetails