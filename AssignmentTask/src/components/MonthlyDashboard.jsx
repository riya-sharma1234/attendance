import React from 'react';

const MonthlyDashboard = () => {
    return (
        <div className="p-4">
            <div className="bg-white p-4 rounded shadow space-y-6 max-w-md mx-auto">
                <div>
                    <h2 className="text-xl font-bold mb-4">Monthly Status</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <select className="border rounded px-3 py-1">
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <select className="border rounded px-3 py-1">
                            <option>2025</option>
                            <option>2026</option>
                            <option>2024</option>
                        </select>
                    </div>

                    {["Casual Leave", "Planned Leave", "Sick Leave", "WFH"].map(type => (
                        <div key={type} className="mb-2">
                            <div className="flex justify-between text-sm">
                                <span>{type}</span>
                                <span>0</span>
                            </div>
                            <div className="bg-gray-200 h-2 rounded-full mt-1" />
                        </div>
                    ))}
                </div>

                {/* Applied Requests */}
                <div>
                    <h3 className="text-md font-semibold mb-2">Applied Requests</h3>
                    <div className="h-85 overflow-y-auto space-y-2 hide-scrollbar pr-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                            <div key={i} className="border p-2 rounded shadow">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-sm">Name</p>
                                    <span className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded">Sick</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-2">17/06/2025 - 17/06/2025</p>
                                <div className="flex justify-end space-x-2">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">✔</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">🗑</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyDashboard;
