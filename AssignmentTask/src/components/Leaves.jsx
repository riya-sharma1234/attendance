import React from 'react'

const Leaves = () => {

    const data = [] ;

    return (
        <div className=" bg-[#0d1321] p-4 space-y-4 mx-20">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="font-semibold mb-2 text-center text-gray-900 font-bold text-xl">Leaves</h2>
                <div className="flex  gap-2 justify-between items-center bg-white p-3 rounded-lg shadow-md">
                    <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/3">
                        <option value="">Select Leave Type</option>
                    </select>

                    <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/3">
                        <option value="">Select Month</option>
                    </select>

                    <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/3">
                        <option value="">Select Year</option>
                    </select>
                </div>
                <div className="overflow-x-auto border-blue-600 rounded-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="px-4 py-3 border">Leave Type</th>
                                <th className="px-4 py-3 border">Start Date</th>
                                <th className="px-4 py-3 border">End Date</th>
                                <th className="px-4 py-3 border">No. of Days</th>
                                <th className="px-4 py-3 border">Reason</th>
                                <th className="px-4 py-3 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                                        No data found for the selected filters
                                    </td>
                                </tr>
                            ) : (
                                data.map((leave, idx) => (
                                    <tr key={idx}>
                                        <td className="border px-4 py-2">{leave.type}</td>
                                        <td className="border px-4 py-2">{leave.start}</td>
                                        <td className="border px-4 py-2">{leave.end}</td>
                                        <td className="border px-4 py-2">{leave.days}</td>
                                        <td className="border px-4 py-2">{leave.reason}</td>
                                        <td className="border px-4 py-2">{leave.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Leaves