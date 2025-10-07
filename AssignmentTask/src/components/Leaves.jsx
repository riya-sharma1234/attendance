// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getEmployees } from "../redux/employeeSlice"; // fetch all employees
// import api from "../utils/axios"; // axios instance

// const AdminLeaveDashboard = () => {
//   const dispatch = useDispatch();
//   const { employees } = useSelector((state) => state.employees);

//   // Filters
//   const [selectedUser, setSelectedUser] = useState("");
//   const [leaveType, setLeaveType] = useState("");
//   const [status, setStatus] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   // Leaves data
//   const [leaves, setLeaves] = useState([]);
//   const [summary, setSummary] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Fetch employees on mount
//   useEffect(() => {
//     dispatch(getEmployees());
//   }, [dispatch]);

//   // Fetch leaves whenever any filter changes
//   useEffect(() => {
//     fetchLeaves();
//   }, [selectedUser, leaveType, status, month, year]);

//   const fetchLeaves = async () => {
//     if (!selectedUser) {
//       setLeaves([]);
//       setSummary({});
//       return;
//     }

//     setLoading(true);
//     try {
//       const params = { userId: selectedUser };
//       if (leaveType) params.leaveType = leaveType;
//       if (status) params.status = status;
//       if (month) params.month = month;
//       if (year) params.year = year;

//       const res = await api.get("/leaves/filter", { params });
//       if (res.data.success) {
//         setLeaves(res.data.leaves || []);
//         setSummary(res.data.status || {});
//       }
//     } catch (err) {
//       console.error(err);
//       setLeaves([]);
//       setSummary({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#0d1321] p-4 space-y-4 mx-20">
//       <div className="bg-white p-4 rounded shadow-md">
//         <h2 className="font-semibold mb-4 text-center text-gray-900 font-bold text-xl">
//            Leave Dashboard
//         </h2>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-4">
//           {/* Employee */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//           >
//             <option value="">Select Employee</option>
//             {employees.map((emp) => (
//               <option key={emp._id} value={emp._id}>
//                 {emp.name}
//               </option>
//             ))}
//           </select>

//           {/* Leave type */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={leaveType}
//             onChange={(e) => setLeaveType(e.target.value)}
//           >
//             <option value="">All Leave Types</option>
//             <option value="casual">Casual</option>
//             <option value="planned">Planned</option>
//             <option value="sick">Sick</option>
//             <option value="wfh">WFH</option>
//           </select>

//           {/* Status */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>

//           {/* Month */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           >
//             <option value="">Month</option>
//             {Array.from({ length: 12 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {new Date(0, i).toLocaleString("default", { month: "long" })}
//               </option>
//             ))}
//           </select>

//           {/* Year */}
//           <select
//             className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           >
//             <option value="">Year</option>
//             {[2025, 2024, 2023, 2022].map((yr) => (
//               <option key={yr} value={yr}>
//                 {yr}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Leave Summary */}
//         {summary && Object.keys(summary).length > 0 && (
//           <div className="flex justify-between gap-4 mb-4">
//             {Object.entries(summary).map(([type, data]) => (
//               <div
//                 key={type}
//                 className="bg-blue-500 text-white p-2 rounded shadow-md text-center flex-1"
//               >
//                 <p className="font-semibold">{type.toUpperCase()}</p>
//                 <p>Consumed: {data.consumed || 0}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Leaves Table */}
//         <div className="overflow-x-auto border-blue-600 rounded-md">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 font-semibold">
//               <tr>
//                 <th className="px-4 py-3 border">Leave Type</th>
//                 <th className="px-4 py-3 border">Start Date</th>
//                 <th className="px-4 py-3 border">End Date</th>
//                 <th className="px-4 py-3 border">No. of Days</th>
//                 <th className="px-4 py-3 border">Reason</th>
//                 <th className="px-4 py-3 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : leaves.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
//                     No leaves found
//                   </td>
//                 </tr>
//               ) : (
//                 leaves.map((leave) => {
//                   const from = new Date(leave.fromDate);
//                   const to = new Date(leave.toDate);
//                   const noOfDays = Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

//                   return (
//                     <tr key={leave._id}>
//                       <td className="border px-4 py-2">{leave.leaveType}</td>
//                       <td className="border px-4 py-2">{from.toLocaleDateString()}</td>
//                       <td className="border px-4 py-2">{to.toLocaleDateString()}</td>
//                       <td className="border px-4 py-2">{noOfDays}</td>
//                       <td className="border px-4 py-2">{leave.reason}</td>
//                       <td className="border px-4 py-2">{leave.status}</td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLeaveDashboard;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../redux/employeeSlice";
import api from "../utils/axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Leave = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);

  const [selectedUser, setSelectedUser] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [leaves, setLeaves] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    fetchLeaves();
  }, [selectedUser, leaveType, status, month, year]);

  const fetchLeaves = async () => {
    if (!selectedUser) {
      setLeaves([]);
      setSummary({});
      return;
    }

    setLoading(true);
    try {
      const params = { userId: selectedUser };
      if (leaveType) params.leaveType = leaveType;
      if (status) params.status = status;
      if (month) params.month = month;
      if (year) params.year = year;

      const res = await api.get("/leaves/filter", { params });
      if (res.data.success) {
        setLeaves(res.data.leaves || []);
        setSummary(res.data.status || {});
      }
    } catch (err) {
      console.error(err);
      setLeaves([]);
      setSummary({});
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- Excel Download ----------------------
  const downloadExcel = () => {
    if (!leaves.length) return;

    // Prepare data
    const data = leaves.map((leave) => {
      const from = new Date(leave.fromDate).toLocaleDateString();
      const to = new Date(leave.toDate).toLocaleDateString();
      const noOfDays = Math.floor((new Date(leave.toDate) - new Date(leave.fromDate)) / (1000*60*60*24)) + 1;

      return {
        "Leave Type": leave.leaveType,
        "Start Date": from,
        "End Date": to,
        "No. of Days": noOfDays,
        "Reason": leave.reason,
        "Status": leave.status
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leaves");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `leaves_${selectedUser || "all"}.xlsx`);
  };

  return (
    <div className="bg-[#0d1321] p-4 space-y-4 mx-20">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="font-semibold mb-4 text-center text-gray-900 font-bold text-xl">
          Leave Dashboard
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>

          <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2">
            <option value="">All Leave Types</option>
            <option value="casual">Casual</option>
            <option value="planned">Planned</option>
            <option value="sick">Sick</option>
            <option value="wfh">WFH</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select value={month} onChange={(e) => setMonth(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2">
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i+1} value={i+1}>{new Date(0, i).toLocaleString("default", { month: "long" })}</option>
            ))}
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2">
            <option value="">Year</option>
            {[2025,2024,2023,2022].map((yr) => <option key={yr} value={yr}>{yr}</option>)}
          </select>

          <button
            onClick={downloadExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>

        {/* Leave Summary */}
        {summary && Object.keys(summary).length > 0 && (
          <div className="flex justify-between gap-4 mb-4">
            {Object.entries(summary).map(([type, data]) => (
              <div key={type} className="bg-blue-500 text-white p-2 rounded shadow-md text-center flex-1">
                <p className="font-semibold">{type.toUpperCase()}</p>
                <p>Consumed: {data.consumed || 0}</p>
              </div>
            ))}
          </div>
        )}

        {/* Leaves Table */}
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
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-6 text-gray-500">Loading...</td>
                </tr>
              ) : leaves.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-6 text-gray-500">No leaves found</td>
                </tr>
              ) : (
                leaves.map((leave) => {
                  const from = new Date(leave.fromDate);
                  const to = new Date(leave.toDate);
                  const noOfDays = Math.floor((to - from) / (1000*60*60*24)) + 1;
                  return (
                    <tr key={leave._id}>
                      <td className="border px-4 py-2">{leave.leaveType}</td>
                      <td className="border px-4 py-2">{from.toLocaleDateString()}</td>
                      <td className="border px-4 py-2">{to.toLocaleDateString()}</td>
                      <td className="border px-4 py-2">{noOfDays}</td>
                      <td className="border px-4 py-2">{leave.reason}</td>
                      <td className="border px-4 py-2">{leave.status}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
