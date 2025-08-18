
import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import PunchDashboard from '../components/PunchDashboard'
import LeavesDashboard from '../components/LeavesDashboard'
import MonthlyDashboard from '../components/MonthlyDashboard';
import CalenderDashboard from '../components/CalenderDashboard';


const Dashboard = () => {

   const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
    <div className="bg-gray-900 min-h-screen p-6 space-y-4"> 
      {!showDashboard && (
        <div className="flex justify-end">
        <button
          onClick={() => setShowDashboard(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow "
        >
          Open Punch Dashboard
        </button>
        </div>
      )}

      {showDashboard && <PunchDashboard setShowDashboard = {setShowDashboard} />}
    <LeavesDashboard />
    <div className="flex  bg-gray-900 p-4 ">
      <MonthlyDashboard/>
      <CalenderDashboard/>
     
    </div>
    </div>
    </>
  )
}

export default Dashboard