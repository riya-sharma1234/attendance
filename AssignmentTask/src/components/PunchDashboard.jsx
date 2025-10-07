
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   punchIn,
//   punchOut,
//   getTodayAttendance,
//   getAttendanceByDateRange,
//   getMonthlyReport,
// } from "../redux/attendanceSlice";
// import { getEmployees } from "../redux/employeeSlice";

// const PunchDashboard = ({ setShowDashboard, user }) => {
//   const dispatch = useDispatch();
//   const { employees = [] } = useSelector((state) => state.employees);
//   const {
//     punchData,
//     attendanceHistory = [],
//     monthlyReport = [],
//     loading,
//     error,
//   } = useSelector((state) => state.attendance);

//   const [selectedUserId, setSelectedUserId] = useState(user?._id);
//   const [coords, setCoords] = useState(null);
//   const [view, setView] = useState("today");
//   const [range, setRange] = useState({ start: "", end: "" });
//   const [monthYear, setMonthYear] = useState({ month: 9, year: 2025 });

//   // Fetch employees if admin
//   useEffect(() => {
//     if (user?.role === "admin") {
//       dispatch(getEmployees());
//     }
//   }, [user, dispatch]);

//   // Load today's punch for selected user
//   useEffect(() => {
//     if (selectedUserId) {
//       dispatch(getTodayAttendance(selectedUserId));
//     }
//   }, [selectedUserId, dispatch]);

//   // Punch IN
//   const handlePunchIn = () => {
//     if (!coords) return alert("Get location first");
//     if (!selectedUserId) return alert("User not available");
//     dispatch(punchIn({ userId: selectedUserId, ...coords }));
//   };

//   // Punch OUT
//   const handlePunchOut = () => {
//     if (!coords) return alert("Get location first");
//     if (!selectedUserId) return alert("User not available");
//     dispatch(punchOut({ userId: selectedUserId, ...coords }));
//   };

//   // Date Range Search
//   const handleRangeSearch = () => {
//     if (!range.start || !range.end) return alert("Pick start and end date");

//     dispatch(
//       getAttendanceByDateRange({
//         userId: selectedUserId,
//         startDate: range.start,
//         endDate: range.end,
//       })
//     );
//   };

//   // Monthly Report Search
//   const handleMonthlySearch = () => {
//     if (!monthYear.month || !monthYear.year) return alert("Pick month & year");

//     dispatch(
//       getMonthlyReport({
//         userId: selectedUserId,
//         month: Number(monthYear.month),
//         year: Number(monthYear.year),
//       })
//     );
//   };

//   // Find employee name/email from ID
//   const getEmployeeInfo = (id) => {
//     if (id === user._id) return `${user.name} (${user.email}) - You`;
//     const emp = employees.find((e) => e._id === id);
//     return emp ? `${emp.name} (${emp.email})` : "Unknown";
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center min-h-screen">
//       <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-6xl w-full space-y-4">

//         {/* Employee Selector → Only for Admin */}
//         {user?.role === "admin" && (
//           <div className="bg-white p-3 rounded mb-3">
//             <label className="block text-sm mb-1">Select Employee</label>
//             <select
//               value={selectedUserId}
//               onChange={(e) => setSelectedUserId(e.target.value)}
//               className="border px-2 py-1 rounded w-full"
//             >
//               <option value="">-- Select Employee --</option>
//               {/* Admin themselves */}
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.email}) - You
//               </option>
//               {/* Other employees */}
//               {employees.map((emp) => (
//                 <option key={emp._id} value={emp._id}>
//                   {emp.name} ({emp.email})
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* View Switcher */}
//         <div className="flex gap-4 mb-4">
//           <button
//             onClick={() => setView("today")}
//             className={`px-4 py-2 rounded  cursor-pointer ${
//               view === "today" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Today
//           </button>

//           {/* Extra views only for Admin */}
//           {user?.role === "admin" && (
//             <>
//               <button
//                 onClick={() => setView("range")}
//                 className={`px-4 py-2 rounded cursor-pointer ${
//                   view === "range" ? "bg-blue-600 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 Date Range
//               </button>
//               <button
//                 onClick={() => setView("monthly")}
//                 className={`px-4 py-2 rounded cursor-pointer ${
//                   view === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 Monthly
//               </button>
//             </>
//           )}
//         </div>

//         {/* Punch In / Out */}
//         <div className="bg-white shadow-md rounded p-4 w-fit">
//           <h2 className="text-lg font-bold mb-2">Punch In / Punch Out</h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() =>
//                 navigator.geolocation.getCurrentPosition(
//                   (pos) =>
//                     setCoords({
//                       lat: pos.coords.latitude,
//                       lon: pos.coords.longitude,
//                     }),
//                   () => alert("Location access denied")
//                 )
//               }
//               className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
//             >
//               Get Location
//             </button>
//             <button
//               onClick={handlePunchIn}
//               className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
//             >
//               Punch In
//             </button>
//             <button
//               onClick={handlePunchOut}
//               className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
//             >
//               Punch Out
//             </button>
//           </div>
//         </div>

//         {/* Today View */}
//         {view === "today" && (
//           <div className="bg-white shadow-md rounded p-4">
//             <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//               Today Punch — {getEmployeeInfo(selectedUserId)}
//             </h2>
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-sm text-gray-600">Punch-In Time</p>
//                   <p className="text-lg">
//                     {punchData?.punchIn
//                       ? new Date(punchData.punchIn).toLocaleTimeString()
//                       : "—"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Punch-Out Time</p>
//                   <p className="text-lg">
//                     {punchData?.punchOut
//                       ? new Date(punchData.punchOut).toLocaleTimeString()
//                       : "—"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Date Range View */}
//         {user?.role === "admin" && view === "range" && (
//           <div className="bg-white shadow-md rounded p-4">
//             <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//               Attendance by Date Range — {getEmployeeInfo(selectedUserId)}
//             </h2>
//             <div className="flex gap-2 mb-4">
//               <input
//                 type="date"
//                 value={range.start}
//                 onChange={(e) => setRange({ ...range, start: e.target.value })}
//                 className="border rounded px-2 py-1"
//               />
//               <input
//                 type="date"
//                 value={range.end}
//                 onChange={(e) => setRange({ ...range, end: e.target.value })}
//                 className="border rounded px-2 py-1"
//               />
//               <button
//                 onClick={handleRangeSearch}
//                 className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
//               >
//                 Search
//               </button>
//             </div>
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <ul className="space-y-2">
//                 {attendanceHistory.map((a) => (
//                   <li
//                     key={a._id}
//                     className="flex justify-between border-b py-1 text-sm"
//                   >
//                     <span>{new Date(a.date).toDateString()}</span>
//                     <span>
//                       In: {a.punchIn ? new Date(a.punchIn).toLocaleTimeString() : "—"}
//                       {" | "}
//                       Out: {a.punchOut ? new Date(a.punchOut).toLocaleTimeString() : "—"}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {/* Monthly View */}
//         {user?.role === "admin" && view === "monthly" && (
//           <div className="bg-white shadow-md rounded p-4">
//             <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//               Monthly Report — {getEmployeeInfo(selectedUserId)}
//             </h2>
//             <div className="flex gap-2 mb-4">
//               <input
//                 type="number"
//                 value={monthYear.month}
//                 onChange={(e) =>
//                   setMonthYear({ ...monthYear, month: e.target.value })
//                 }
//                 className="border rounded px-2 py-1 w-20"
//                 placeholder="MM"
//               />
//               <input
//                 type="number"
//                 value={monthYear.year}
//                 onChange={(e) =>
//                   setMonthYear({ ...monthYear, year: e.target.value })
//                 }
//                 className="border rounded px-2 py-1 w-28"
//                 placeholder="YYYY"
//               />
//               <button
//                 onClick={handleMonthlySearch}
//                 className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
//               >
//                 Load
//               </button>
//             </div>
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <table className="w-full border">
//                 <thead>
//                   <tr className="bg-gray-100 text-left text-sm">
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Punch In</th>
//                     <th className="p-2">Punch Out</th>
//                     <th className="p-2">Hours Worked</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {monthlyReport.map((r, i) => (
//                     <tr key={i} className="border-t text-sm">
//                       <td className="p-2">
//                         {new Date(r.date).toDateString()}
//                       </td>
//                       <td className="p-2">
//                         {r.punchIn ? new Date(r.punchIn).toLocaleTimeString() : "—"}
//                       </td>
//                       <td className="p-2">
//                         {r.punchOut ? new Date(r.punchOut).toLocaleTimeString() : "—"}
//                       </td>
//                       <td className="p-2">{r.hoursWorked} hrs</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {/* Close Dashboard */}
//         <div className="flex justify-end">
//           <button
//             onClick={() => setShowDashboard(false)}
//             className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 cursor-pointer"
//           >
//             Close Punch Dashboard
//           </button>
//         </div>

//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default PunchDashboard;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  punchIn,
  punchOut,
  getTodayAttendance,
  getAttendanceByDateRange,
  getMonthlyReport,
} from "../redux/attendanceSlice";
import { getEmployees } from "../redux/employeeSlice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Excel Export Helper
const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${filename}.xlsx`);
};

const PunchDashboard = ({ setShowDashboard, user }) => {
  const dispatch = useDispatch();
  const { employees = [] } = useSelector((state) => state.employees);
  const {
    punchData,
    attendanceHistory = [],
    monthlyReport = [],
    loading,
    error,
  } = useSelector((state) => state.attendance);

  const [selectedUserId, setSelectedUserId] = useState(user?._id);
  const [coords, setCoords] = useState(null);
  const [view, setView] = useState("today");
  const [range, setRange] = useState({ start: "", end: "" });
  const [monthYear, setMonthYear] = useState({ month: 9, year: 2025 });

  // Fetch employees if admin
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getEmployees());
    }
  }, [user, dispatch]);

  // Load today's punch for selected user
  useEffect(() => {
    if (selectedUserId) {
      dispatch(getTodayAttendance(selectedUserId));
    }
  }, [selectedUserId, dispatch]);

  // Punch IN
  const handlePunchIn = () => {
    if (!coords) return alert("Get location first");
    if (!selectedUserId) return alert("User not available");
    dispatch(punchIn({ userId: selectedUserId, ...coords }));
  };

  // Punch OUT
  const handlePunchOut = () => {
    if (!coords) return alert("Get location first");
    if (!selectedUserId) return alert("User not available");
    dispatch(punchOut({ userId: selectedUserId, ...coords }));
  };

  // Date Range Search
  const handleRangeSearch = () => {
    if (!range.start || !range.end) return alert("Pick start and end date");

    dispatch(
      getAttendanceByDateRange({
        userId: selectedUserId,
        startDate: range.start,
        endDate: range.end,
      })
    );
  };

  // Monthly Report Search
  const handleMonthlySearch = () => {
    if (!monthYear.month || !monthYear.year) return alert("Pick month & year");

    dispatch(
      getMonthlyReport({
        userId: selectedUserId,
        month: Number(monthYear.month),
        year: Number(monthYear.year),
      })
    );
  };

  // Find employee name/email from ID
  const getEmployeeInfo = (id) => {
    if (id === user._id) return `${user.name} (${user.email}) - You`;
    const emp = employees.find((e) => e._id === id);
    return emp ? `${emp.name} (${emp.email})` : "Unknown";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-6xl w-full space-y-4">
        {/* Employee Selector → Only for Admin */}
        {user?.role === "admin" && (
          <div className="bg-white p-3 rounded mb-3">
            <label className="block text-sm mb-1">Select Employee</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">-- Select Employee --</option>
              {/* Admin themselves */}
              <option key={user._id} value={user._id}>
                {user.name} ({user.email}) - You
              </option>
              {/* Other employees */}
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* View Switcher */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setView("today")}
            className={`px-4 py-2 rounded cursor-pointer ${view === "today" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            Today
          </button>

          {/* Extra views only for Admin */}
          {user?.role === "admin" && (
            <>
              <button
                onClick={() => setView("range")}
                className={`px-4 py-2 rounded cursor-pointer ${view === "range" ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
              >
                Date Range
              </button>
              <button
                onClick={() => setView("monthly")}
                className={`px-4 py-2 rounded cursor-pointer ${view === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
              >
                Monthly
              </button>
            </>
          )}
        </div>

        {/* Punch In / Out */}
        <div className="bg-white shadow-md rounded p-4 w-fit">
          <h2 className="text-lg font-bold mb-2">Punch In / Punch Out</h2>
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigator.geolocation.getCurrentPosition(
                  (pos) =>
                    setCoords({
                      lat: pos.coords.latitude,
                      lon: pos.coords.longitude,
                    }),
                  () => alert("Location access denied")
                )
              }
              className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
            >
              Get Location
            </button>
            <button
              onClick={handlePunchIn}
              className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
            >
              Punch In
            </button>
            <button
              onClick={handlePunchOut}
              className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
            >
              Punch Out
            </button>
          </div>
        </div>

        {/* Today View */}
        {view === "today" && (
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Today Punch — {getEmployeeInfo(selectedUserId)}
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Punch-In Time</p>
                  <p className="text-lg">
                    {punchData?.punchIn
                      ? new Date(punchData.punchIn).toLocaleTimeString()
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Punch-Out Time</p>
                  <p className="text-lg">
                    {punchData?.punchOut
                      ? new Date(punchData.punchOut).toLocaleTimeString()
                      : "—"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Date Range View */}
        {user?.role === "admin" && view === "range" && (
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Attendance by Date Range — {getEmployeeInfo(selectedUserId)}
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="date"
                value={range.start}
                onChange={(e) => setRange({ ...range, start: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <input
                type="date"
                value={range.end}
                onChange={(e) => setRange({ ...range, end: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <button
                onClick={handleRangeSearch}
                className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
              >
                Search
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <ul className="space-y-2">
                  {attendanceHistory.map((a) => {
                    let hours = "—";
                    if (a.punchIn && a.punchOut) {
                      const diffMs = new Date(a.punchOut) - new Date(a.punchIn);
                      hours = (diffMs / (1000 * 60 * 60)).toFixed(2) + " hrs";
                    }
                    return (
                      <li
                        key={a._id}
                        className="flex justify-between border-b py-1 text-sm"
                      >
                        <span>{new Date(a.date).toDateString()}</span>
                        <span>
                          In:{" "}
                          {a.punchIn
                            ? new Date(a.punchIn).toLocaleTimeString()
                            : "—"}{" "}
                          | Out:{" "}
                          {a.punchOut
                            ? new Date(a.punchOut).toLocaleTimeString()
                            : "—"}{" "}
                          | {hours}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {attendanceHistory.length > 0 && (
                  <button
                    onClick={() => {
                      const empName =
                        selectedUserId === user._id
                          ? user.name
                          : employees.find((e) => e._id === selectedUserId)?.name || "User";
                      exportToExcel(
                        attendanceHistory.map((a) => ({
                          Date: new Date(a.date).toDateString(),
                          PunchIn: a.punchIn
                            ? new Date(a.punchIn).toLocaleTimeString()
                            : "—",
                          PunchOut: a.punchOut
                            ? new Date(a.punchOut).toLocaleTimeString()
                            : "—",
                          HoursWorked:
                            a.punchIn && a.punchOut
                              ? (
                                (new Date(a.punchOut) - new Date(a.punchIn)) /
                                (1000 * 60 * 60)
                              ).toFixed(2)
                              : "—",
                        })),
                        `${empName}_${range.start}_to_${range.end}`
                      )
                    }
                    }
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded cursor-pointer"
                  >
                    Download Excel
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Monthly View */}
        {user?.role === "admin" && view === "monthly" && (
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Monthly Report — {getEmployeeInfo(selectedUserId)}
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={monthYear.month}
                onChange={(e) =>
                  setMonthYear({ ...monthYear, month: e.target.value })
                }
                className="border rounded px-2 py-1 w-20"
                placeholder="MM"
              />
              <input
                type="number"
                value={monthYear.year}
                onChange={(e) =>
                  setMonthYear({ ...monthYear, year: e.target.value })
                }
                className="border rounded px-2 py-1 w-28"
                placeholder="YYYY"
              />
              <button
                onClick={handleMonthlySearch}
                className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
              >
                Load
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm">
                      <th className="p-2">Date</th>
                      <th className="p-2">Punch In</th>
                      <th className="p-2">Punch Out</th>
                      <th className="p-2">Hours Worked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyReport.map((r, i) => {
                      let hours = "—";
                      if (r.punchIn && r.punchOut) {
                        const diffMs =
                          new Date(r.punchOut) - new Date(r.punchIn);
                        hours = (diffMs / (1000 * 60 * 60)).toFixed(2) + " hrs";
                      }
                      return (
                        <tr key={i} className="border-t text-sm">
                          <td className="p-2">
                            {new Date(r.date).toDateString()}
                          </td>
                          <td className="p-2">
                            {r.punchIn
                              ? new Date(r.punchIn).toLocaleTimeString()
                              : "—"}
                          </td>
                          <td className="p-2">
                            {r.punchOut
                              ? new Date(r.punchOut).toLocaleTimeString()
                              : "—"}
                          </td>
                          <td className="p-2">{hours}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {monthlyReport.length > 0 && (
                  <button
                    onClick={() => {
                      const empName =
                        selectedUserId === user._id
                          ? user.name
                          : employees.find((e) => e._id === selectedUserId)?.name || "User";
                      exportToExcel(
                        monthlyReport.map((r) => ({
                          Date: new Date(r.date).toDateString(),
                          PunchIn: r.punchIn
                            ? new Date(r.punchIn).toLocaleTimeString()
                            : "—",
                          PunchOut: r.punchOut
                            ? new Date(r.punchOut).toLocaleTimeString()
                            : "—",
                          HoursWorked:
                            r.punchIn && r.punchOut
                              ? (
                                (new Date(r.punchOut) - new Date(r.punchIn)) /
                                (1000 * 60 * 60)
                              ).toFixed(2)
                              : "—",
                        })),
                        `${empName}-${monthYear.month}-${monthYear.year}`
                      )
                    }
                  }
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded cursor-pointer"
                  >
                    Download Excel
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Close Dashboard */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowDashboard(false)}
            className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 cursor-pointer"
          >
            Close Punch Dashboard
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default PunchDashboard;
