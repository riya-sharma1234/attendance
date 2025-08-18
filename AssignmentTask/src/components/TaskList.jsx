import React from 'react'
import { FaTrash } from 'react-icons/fa';

const TaskList = () => {
    return (
        <div className=" bg-[#0d1321] p-4 space-y-4 mx-20">
            <div className="bg-white p-4 rounded shadow-md">
              
                 <h2 className="font-semibold mb-2 text-center text-gray-900 font-bold text-xl">Tasks List</h2>
                {/* You can map tasks here */} 
                <ol className="mt-3 space-y-2 list-disc pl-5 text-gray-800">
                    <li className="border-b pb-2 flex justify-between items-center">
                        <span>Task 1</span>
                        <button className="text-red-500 hover:text-red-700 cursor-pointer">
                            <FaTrash />
                        </button>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default TaskList