import React from 'react'

const Announcement = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-20  bg-[#0d1321] p-1">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="font-semibold mb-2 text-center text-gray-900 font-bold text-xl">Add Announcement</h2>
                <textarea
                    placeholder="Write your announcement here..."
                    className="w-full border p-1 rounded mb-2 resize-none border-blue-600"
                    rows={2}
                />
                <div className='flex justify-center'>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                        Add Announcement
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="font-semibold mb-2  text-center text-gray-900 font-bold text-xl">Add Task</h2>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <select className="border p-2 rounded  border-blue-600">
                        <option>Select a user</option>
                    </select>
                    <input type="text" placeholder="New Task" className="border p-2 rounded  border-blue-600 focus:border-blue-400" />
                </div>
                <div className='flex justify-center'>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer mt-3">
                        Add Task
                    </button>
                </div>
            </div>

           
        </div>



    )
}

export default Announcement