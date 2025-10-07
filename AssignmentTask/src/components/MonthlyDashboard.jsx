// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMonthlyLeaveStatus } from '../redux/LeaveSlice';

// const MonthlyDashboard = ( ) => {
//   const dispatch = useDispatch();
//   const { statusByMonth, loading } = useSelector(state => state.leave);

//   const [selectedMonth, setSelectedMonth] = useState("January");
//   const [selectedYear, setSelectedYear] = useState("2025");

//   const leaveTypes = ["casual", "planned", "sick", "wfh"];

//   // Map month names to numbers
//   const monthMap = {
//     January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
//     July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
//   };

//   useEffect(() => {
//     dispatch(getMonthlyLeaveStatus({ month: monthMap[selectedMonth], year: Number(selectedYear) }));
//   }, [dispatch, selectedMonth, selectedYear]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen m-2 mt-4 rounded-lg">
//       <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto space-y-6">
//         <h2 className="text-2xl font-bold text-center">Monthly Leave Dashboard</h2>

//         {/* Month & Year Select */}
//         <div className="flex justify-center gap-4 mb-6">
//           <select
//             value={selectedMonth}
//             onChange={e => setSelectedMonth(e.target.value)}
//             className="border rounded px-4 py-2"
//           >
//             {Object.keys(monthMap).map(m => <option key={m}>{m}</option>)}
//           </select>
//           <select
//             value={selectedYear}
//             onChange={e => setSelectedYear(e.target.value)}
//             className="border rounded px-4 py-2"
//           >
//             {["2024", "2025", "2026"].map(y => <option key={y}>{y}</option>)}
//           </select>
//         </div>

//         {/* Leave Bars */}
//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : (
//           <div className="space-y-4">
//             {leaveTypes.map(type => {
//               const consumed = statusByMonth[type]?.consumed || 0;
//               const limit = 30; // example limit, can be dynamic
//               const percentage = Math.min((consumed / limit) * 100, 100);

//               return (
//                 <div key={type}>
//                   <div className="flex justify-between text-sm font-medium">
//                     <span>{type.charAt(0).toUpperCase() + type.slice(1)} Leave</span>
//                     <span>{consumed} / {limit}</span>
//                   </div>
//                   <div className="bg-gray-200 h-3 rounded-full mt-1">
//                     <div
//                       className="bg-blue-500 h-3 rounded-full"
//                       style={{ width: `${percentage}%` }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MonthlyDashboard;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyLeaveStatus } from "../redux/LeaveSlice";

const MonthlyDashboard = ({ user }) => {
  const dispatch = useDispatch();
  const { statusByMonth, loading } = useSelector((state) => state.leave);

  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2025");

  const leaveTypes = ["casual", "planned", "sick", "wfh"];

  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // Fetch monthly leave only if no user prop (logged-in admin/employee)
  useEffect(() => {
    if (!user) {
      dispatch(
        getMonthlyLeaveStatus({
          month: monthMap[selectedMonth],
          year: Number(selectedYear),
        })
      );
    }
  }, [dispatch, selectedMonth, selectedYear, user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen m-2 mt-4 rounded-lg flex-1">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {user ? `${user.name}'s` : "Your"} Monthly Leave Dashboard
        </h2>

        {/* Month & Year Select */}
        <div className="flex justify-center gap-4 mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded px-4 py-2"
          >
            {Object.keys(monthMap).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded px-4 py-2"
          >
            {["2024", "2025", "2026"].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Leave Bars */}
        {loading && !user ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-4">
            {leaveTypes.map((type) => {
              // Use user prop if exists, otherwise Redux data
              const consumed =
                user?.consumedLeaves?.[type] ??
                statusByMonth?.[type]?.consumed ??
                0;

              let limit =
                user?.leaveLimits?.[type] ??
                statusByMonth?.[type]?.limit ??
                30;

              let percentage = 0;
              if (limit === "unlimited") {
                percentage = 100;
                limit = "∞";
              } else {
                percentage = Math.min((consumed / limit) * 100, 100);
              }

              return (
                <div key={type}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>
                      {type.charAt(0).toUpperCase() + type.slice(1)} Leave
                    </span>
                    <span>
                      {consumed} / {limit}
                    </span>
                  </div>
                  <div className="bg-gray-200 h-3 rounded-full mt-1">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyDashboard;
