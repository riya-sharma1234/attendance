import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { applyLeave, clearLeaveError ,fetchLeaveBalances} from "../redux/LeaveSlice";
import { toast } from "react-toastify";

const ApplyLeave = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // leave type coming from LeaveCard → location.state
  const initialType = location.state?.leaveType || "";

  const { user } = useSelector((state) => state.auth); // assuming you store logged in user in redux
  const { loading, error } = useSelector((state) => state.leave);

  const [formData, setFormData] = useState({
    leaveType: initialType,
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to apply leave");
      dispatch(clearLeaveError());
    }
  }, [error, dispatch]);

const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.leaveType || !formData.fromDate || !formData.toDate) {
    toast.error("Please fill all required fields");
    return;
  }

  const payload = {
    ...formData,
    userId: user?.id,
    userName: user?.name,
  };

  console.log(user);

  dispatch(applyLeave(payload))
    .unwrap()
    .then(() => {
      toast.success("Leave applied successfully");
       dispatch(fetchLeaveBalances());
      navigate("/"); // redirect
    })
    .catch((error) => { toast.error(error.message)});
};


  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      {/* Title Section */}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
        Apply Leave
      </h2>

      {/* User Info */}
      <p className="text-center text-gray-700 mb-4">
        <span className="font-semibold">Employee:</span>{" "}
        {user?.name || "Unknown User"}
      </p>

      {/* Leave Type Display */}
      <p className="text-center text-gray-700 mb-6">
        <span className="font-semibold">Leave Type:</span>{" "}
        {formData.leaveType
          ? formData.leaveType.replace("-", " ").toUpperCase()
          : "Not Selected"}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Leave Type Selector */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Leave Type</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            disabled={!!initialType}
            className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Leave Type</option>
            <option value="casual">Casual</option>
            <option value="planned">Planned</option>
            <option value="sick">Sick</option>
            <option value="wfh">WFH</option>
          </select>
        </div>

        {/* From Date */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">To Date</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Reason */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="3"
            className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-md font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Submitting..." : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeave;
