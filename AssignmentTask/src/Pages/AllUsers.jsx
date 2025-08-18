import React from 'react'
import EmployeeCard from '../components/EmployeeCard'


const AllUsers = () => {
  
    const employees = [
        {
            name: "Rohit sharma",
            gender: "Male",
            role:"Software Developer",
            email:"rs@gmail.com"
        },
        {
            name: "Rahul sharma",
            gender: "Male",
            role:"Software Developer",
            email:"r@gmail.com"
        },
        {
            name: "Simran khajuria",
            gender: "Female",
            role:"Software Developer",
            email:"sk@gmail.com"
        },
         {
            name: "Riya Sharma",
            gender: "Female",
            role:"Software Developer",
            email:"hs@gmail.com"
        },

    ]
  return (
    <div className='min-h-screen  bg-gray-900 p-4'>
        <div className='flex justify-between items-center  mb-6'>
            <h1 className='text-2xl font-bold text-white'>Employees</h1>
            <div className='flex gap-3'>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Employee</button>
                 <button className="px-4 py-2 bg-green-600 text-white rounded">Adjust Leave Balance</button>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 p-5 bg-gradient-t0-br from-gray-800 to-gray-900 m-h-screen ">
            {employees.map((emp, index) => (
                <EmployeeCard key={index} employee={emp} />
            ))}
        </div>
    </div>
  )
}

export default AllUsers