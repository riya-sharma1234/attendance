import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingLeaves, updateLeaveStatus } from "../redux/LeaveSlice";
import { FaCheck, FaTrash } from "react-icons/fa";

const AdminLeaveDashboard = () => {
  const dispatch = useDispatch();
  const { pendingLeaves, loading } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getPendingLeaves());
    }
  }, [dispatch, user]);

  const handleStatusChange = (leaveId, status) => {
    console.log("Sending update request:", { leaveId, status });
    dispatch(updateLeaveStatus({ leaveId, status }));
  };

  if (user?.role !== "admin") {
    return (
      <p className="text-center mt-10 text-red-600">
        You are not authorized to view this page.
      </p>
    );
  }

  return (
    <div className="p-2 bg-gray-100 max-h-[450] rounded-lg">
      {/* Applied Requests Section */}
      <h2 className="text-2xl font-semibold mb-2 text-center">Applied Leave Requests</h2>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {(!pendingLeaves || pendingLeaves.length === 0) && (
          <p className="text-gray-600">No applied leave requests.</p>
        )}

        {pendingLeaves?.map((leave) => (
          <div
            key={leave._id}
            className="bg-white p-2 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              {/* <p className="font-bold">{leave.employee.name}</p> */}
              <p className="font-bold">{leave.employee?.name || "N/A"}</p>
              <p className="text-gray-600">
                {leave.leaveType.toUpperCase()} |{" "}
                {new Date(leave.fromDate).toLocaleDateString()} -{" "}
                {new Date(leave.toDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500">{leave.reason}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(leave._id, "approved")}
                className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
              >
                <FaCheck /> Approve
              </button>
              <button
                onClick={() => handleStatusChange(leave._id, "rejected")}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                <FaTrash /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeaveDashboard;


