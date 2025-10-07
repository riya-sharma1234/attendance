
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Navbar from '../components/Navbar'
// import PunchDashboard from '../components/PunchDashboard'
// import LeavesDashboard from '../components/LeavesDashboard'
// import MonthlyDashboard from '../components/MonthlyDashboard';
// import CalenderDashboard from '../components/CalenderDashboard';
// import AdminLeaveDashboard from '../components/AdminLeaveDashboard';
// // import { useSelector } from 'react-redux';
// import { GetAnnouncement } from '../components/GetAnnouncement';
// import api from "../utils/axios"; // your axios instance


// const Dashboard = () => {

//    const [showDashboard, setShowDashboard] = useState(false);
//    const [targetUser, setTargetUser] = useState(null);


//   const { employeeId } = useParams(); //
//   const { user } = useSelector(state => state.auth); 

//     // decide which ID to use
//   const targetId = employeeId || user?._id;

//    useEffect(() => {
//     // yahan aap API call kar sakte hain agar dusre user ka dashboard load karna ho
//     if (targetId) {
//       api.get(`/user/employee/${targetId}`).then((res) => {
//          setTargetUser(res.data.employee);
//       });
//     }
//   }, [targetId]);

//   return (
//     <>
//     <div className="bg-gray-900 min-h-screen p-6 space-y-4"> 
//         <h2 className="text-white text-xl">
//         Dashboard – {targetUser?.name || user?.name}
//       </h2>
//       {!showDashboard && (
//         <div className="flex justify-end" >
//         <button
//           onClick={() => setShowDashboard(true)}
//           className="bg-blue-600 text-white px-6 py-2 rounded shadow "
//         >
//           Open Punch Dashboard
//         </button>
//         </div>
//       )}

//       {showDashboard && <PunchDashboard setShowDashboard = {setShowDashboard}  user={targetUser || user}/>}
//     <LeavesDashboard  user={targetUser || user}/>
//      {user?.role === 'admin' && <AdminLeaveDashboard/>}
//      <GetAnnouncement />
//     <div className="flex  bg-gray-900  ">
//       <MonthlyDashboard  user={targetUser || user}/>
//       <CalenderDashboard user={targetUser || user}/> 
//     </div>

//     </div>
//     </>
//   )
// }

// export default Dashboard

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import PunchDashboard from "../components/PunchDashboard";
import LeavesDashboard from "../components/LeavesDashboard";
import MonthlyDashboard from "../components/MonthlyDashboard";
import CalenderDashboard from "../components/CalenderDashboard";
import AdminLeaveDashboard from "../components/AdminLeaveDashboard";
import { GetAnnouncement } from "../components/GetAnnouncement";
import api from "../utils/axios";

const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  const { employeeId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  // Decide target user
  const targetId = employeeId || user?._id;

  useEffect(() => {
      if (!user) return; // stop if no user
      
    if (employeeId && user?.role !== "admin") {
      //  Normal employee should not open other dashboards
      navigate("/dashboard");
      return;
    }

    if (targetId) {
      api.get(`/user/employee/${targetId}`).then((res) => {
        setTargetUser(res.data.employee);
      });
    }
  }, [targetId, employeeId, user, navigate]);


    const isViewingEmployee = user?.role === "admin" && targetUser && targetUser._id !== user._id;

  return (
    <div className="bg-gray-900 min-h-screen p-6 space-y-4">
      <h2 className="text-white text-xl">
        Dashboard – {targetUser?.name || user?.name}
      </h2>

      {/* Punch Dashboard */}
      {!showDashboard && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow cursor-pointer"
          >
            Open Punch Dashboard
          </button>
        </div>
      )}
      {showDashboard && (
        <PunchDashboard
          setShowDashboard={setShowDashboard}
          user={targetUser || user}
        />
      )}

      {/* Leaves + Admin Leave */}
      <LeavesDashboard user={targetUser || user} />
      {/* {user?.role === "admin" && <AdminLeaveDashboard />} */}
         {/* Admin Leave Dashboard only if not viewing a specific employee */}
      {!isViewingEmployee && user?.role === "admin" && <AdminLeaveDashboard />}
      <GetAnnouncement />

      {/* Monthly + Calendar */}
      <div className="flex bg-gray-900">
        <MonthlyDashboard user={targetUser || user} />
        <CalenderDashboard user={targetUser || user} />
      </div>
    </div>
  );
};

export default Dashboard;
