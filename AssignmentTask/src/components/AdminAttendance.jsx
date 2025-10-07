import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/employeeSlice";
import { getMonthlyReport } from "../redux/attendanceSlice";

const AdminAttendance = () => {
  const dispatch = useDispatch();
  const { list: employees, loading: empLoading } = useSelector((state) => state.employees);
  const { monthlyReport, loading: attLoading } = useSelector((state) => state.attendance);

  const [selectedUser, setSelectedUser] = useState("");
  const [monthYear, setMonthYear] = useState({ month: 9, year: 2025 });

  // Load employees when page loads
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleMonthlySearch = () => {
    if (!selectedUser) return alert("Select an employee first");
    dispatch(getMonthlyReport({ userId: selectedUser, ...monthYear }));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin: Monthly Attendance</h1>

      {/* Employee Selector */}
      {empLoading ? (
        <p>Loading employees...</p>
      ) : (
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border px-2 py-1 mb-4"
        >
          <option value="">-- Select Employee --</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>
      )}

      {/* Month-Year Inputs */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={monthYear.month}
          onChange={(e) => setMonthYear({ ...monthYear, month: Number(e.target.value) })}
          className="border px-2 py-1 w-20"
          placeholder="MM"
        />
        <input
          type="number"
          value={monthYear.year}
          onChange={(e) => setMonthYear({ ...monthYear, year: Number(e.target.value) })}
          className="border px-2 py-1 w-28"
          placeholder="YYYY"
        />
        <button
          onClick={handleMonthlySearch}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Load Report
        </button>
      </div>

      {/* Attendance Table */}
      {attLoading ? (
        <p>Loading attendance...</p>
      ) : (
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
            {monthlyReport.map((r, i) => (
              <tr key={i} className="border-t text-sm">
                <td className="p-2">{new Date(r.date).toDateString()}</td>
                <td className="p-2">{r.punchIn ? new Date(r.punchIn).toLocaleTimeString() : "—"}</td>
                <td className="p-2">{r.punchOut ? new Date(r.punchOut).toLocaleTimeString() : "—"}</td>
                <td className="p-2">{r.hoursWorked} hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAttendance;
