
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLeaveLimits, clearLeaveError, clearLeaveMessage } from "../redux/LeaveSlice";

export default function SetLeaveLimits({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.leave);
  const { employees } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [form, setForm] = useState({ casual: 0, planned: 0, sick: 0, wfh: "unlimited" });

  // ✅ Build user list including admin at the top
  const userList = useMemo(() => {
    if (!user) return [];

    const empList = (employees || [])
      .filter(Boolean)
      .map((e) => ({ ...e, _id: e._id?.toString() }));

    if (user.role === "admin") {
      return [{ ...user, _id: user._id?.toString() }, ...empList]; // use _id consistently
    }

    return empList;
  }, [employees, user]);

  // ✅ Populate form when selectedUserId changes
  useEffect(() => {
    if (!selectedUserId) return;
    const u = userList.find((emp) => emp._id === selectedUserId);
    if (u) {
      setForm({
        casual: u.leaveLimits?.casual || 0,
        planned: u.leaveLimits?.planned || 0,
        sick: u.leaveLimits?.sick || 0,
        wfh: u.leaveLimits?.wfh || "unlimited",
      });
    }
  }, [selectedUserId, userList]);

  // ✅ Toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearLeaveError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearLeaveMessage());
      onClose();
      setSelectedUserId("");
    }
  }, [error, message, dispatch, onClose]);

  // ✅ Preselect admin when modal opens
  useEffect(() => {
    if (isOpen && user?.role === "admin" && !selectedUserId) {
      setSelectedUserId(user._id?.toString()); // use _id
    }
  }, [isOpen, user, selectedUserId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserId) return toast.error("Please select a user");

    dispatch(
      setLeaveLimits({
        userId: selectedUserId, // already valid string now
        leaveLimits: {
          casual: Number(form.casual),
          planned: Number(form.planned),
          sick: Number(form.sick),
          wfh: form.wfh,
        },
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Set Leave Limits</h2>

        <form onSubmit={handleSubmit} className="p-4 border border-blue-500 rounded-md shadow-md space-y-4">
          {/* Select User */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Select User</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="border border-blue-500 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a user</option>
              {userList.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
          </div>

          {/* Leave Inputs */}
          {["casual", "planned", "sick"].map((type) => (
            <div key={type} className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">
                {type.charAt(0).toUpperCase() + type.slice(1)} Leave
              </label>
              <input
                type="number"
                placeholder={`Max ${type}`}
                value={form[type]}
                onChange={(e) => setForm({ ...form, [type]: Number(e.target.value) })}
                className="border border-blue-500 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          ))}

          {/* WFH Input */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">WFH Limit</label>
            <input
              type="text"
              placeholder="WFH Limit (number or 'unlimited')"
              value={form.wfh}
              onChange={(e) => setForm({ ...form, wfh: e.target.value })}
              className="border border-blue-500 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Set Limits"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
