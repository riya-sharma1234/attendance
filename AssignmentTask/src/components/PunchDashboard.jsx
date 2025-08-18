import React, { useState } from 'react';

const PunchDashboard = ({ setShowDashboard }) => {
  const [today] = useState(new Date().toISOString().slice(0, 10));
  const [selectedDate, setSelectedDate] = useState(today);
  const [punchData, setPunchData] = useState({
    punchIn: null,
    punchOut: null
  });

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        {/* Modal Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-6xl w-full space-y-4">
          
          <div className='flex justify-between gap-2 flex'>

            {/* Punch In/Out Buttons */}
            <div className="bg-white shadow-md rounded p-4 w-fit">
              <h2 className="text-lg font-bold mb-2">Punch In / Punch Out</h2>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded">Get Location</button>
                <button className="bg-blue-500 text-white px-4 py-1 rounded">Punch In</button>
                <button className="bg-blue-500 text-white px-4 py-1 rounded">Punch Out</button>
              </div>
            </div>

            {/* Today's Punch Info */}
            <div className="bg-white shadow-md rounded p-4 w-fit max-w-md space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Today Punch</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Punch-In Time</p>
                  <p className="text-base text-gray-900 mt-1">
                    {punchData.punchIn || 'No Record for today.'}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Punch-Out Time</p>
                  <p className="text-base text-gray-900 mt-1">
                    {punchData.punchOut || 'No Record for today.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Select Date Section */}
            <div className="bg-white shadow-md rounded p-4 w-fit">
              <label className="block text-gray-700 text-sm font-medium mb-2">Select Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mt-2 mb-2">Punch for {selectedDate}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-600">Punch-In Time</p>
                  <p className="text-base text-gray-800 mt-1">{punchData.punchIn || '—'}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-600">Punch-Out Time</p>
                  <p className="text-base text-gray-800 mt-1">{punchData.punchOut || '—'}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowDashboard(false)}
              className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700"
            >
              Close Punch Dashboard
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default PunchDashboard;

