
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import EmployeeCard from '../components/EmployeeCard'
import AddEmployee from '../components/AddEmployee'
import SetLeaveLimits from '../components/SetLeaveLimits';
import { getEmployees } from '../redux/employeeSlice'; 

const AllUsers = () => {
     const dispatch = useDispatch();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAdjustOpen, setIsAdjustOpen] = useState(false);

    // Get employees from Redux store
    const { employees, loading, error } = useSelector(state => state.employees);
    // Fetch employees on mount
    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    return (
        <div className='min-h-screen  bg-gray-900 p-4'>
            <div className='flex justify-between items-center  mb-6'>
                <h1 className='text-2xl font-bold text-white'>Employees</h1>
                <div className='flex gap-3'>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer" onClick={() => setIsFormOpen(true)}>Add Employee</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer" onClick={() =>setIsAdjustOpen(true)}>Set Leave Limits</button>
                    {/* Conditionally render the form */}
                    <AddEmployee isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
                    <SetLeaveLimits isOpen={isAdjustOpen} onClose={() => setIsAdjustOpen(false) }/>
                </div>
            </div>
            
            {loading && <p className="text-white">Loading employees...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 p-5 bg-gradient-t0-br from-gray-800 to-gray-900 m-h-screen ">
                {Array.isArray(employees) && employees.map(emp => (
                  <EmployeeCard key={emp._id} employee={emp} />
                  ))}
            </div>
        </div>
    )
}

export default AllUsers   

