import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee, deleteEmployee } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
import EditEmployeeForm from "./EditEmployee";

const EmployeeCard = ({ employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = () => {
    navigate(`/dashboard/${employee._id}`);
  };

  const handleSave = (formData) => {
    dispatch(updateEmployee({ id: employee._id, formData }))
      .unwrap()
      .then(() => setShowModal(false))
      .catch((err) => console.error("Update failed:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <div className="flex justify-center items-center">
      {/* Card container */}
      <div
        className={`flip-card w-[300px] h-[400px] ${
          user?.role === "admin" ? "admin-hover" : ""
        }`}
      >
        {/* Inner card for flip */}
        <div className="flip-card-inner relative w-full h-full">
          {/* FRONT SIDE */}
          <div className="flip-card-front absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-xl border">
            <div className="bg-[#043e6d] h-24 relative">
              <div className="text-white text-center py-4">
                <h2 className="text-lg font-bold">OctaAds Media Private Limited</h2>
              </div>
              <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                <img
                  src={employee.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>
            <div className="mt-16 px-4 text-center">
              <h3 className="font-bold text-lg text-[#801b3b]">{employee.name}</h3>
              <p className="text-sm text-gray-600 font-semibold">{employee.department}</p>
              <div className="text-sm mt-4 text-left text-gray-700">
                <p>
                  <span className="font-semibold">Designation</span> : {employee.designation}
                </p>
                <p>
                  <span className="font-semibold">ID NO</span> : {employee.employeeCode}
                </p>
                <p>
                  <span className="font-semibold">DOB</span> : {employee.dob ? new Date(employee.dob).toLocaleDateString() : "-"}
                </p>
                <p>
                  <span className="font-semibold">Gender</span> : {employee.gender}
                </p>
                <p>
                  <span className="font-semibold">E-mail</span> : {employee.email}
                </p>
              </div>
            </div>
          </div>

          {/* BACK SIDE - only for admins */}
          {user?.role === "admin" && (
            <div className="flip-card-back absolute w-full h-full bg-white rounded-xl overflow-hidden shadow-xl border">
              <div className="bg-[#043e6d] h-20 text-white text-center py-3">
                <h2 className="text-lg font-bold">OctaAds Media Private Limited</h2>
              </div>
              <div className="px-4 py-6 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Join Date</span> :{" "}
                  {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "-"}
                </p>
                <p>
                  <span className="font-semibold">Appraisal Date</span> :{" "}
                  {employee.appraisalDate ? new Date(employee.appraisalDate).toLocaleDateString() : "-"}
                </p>
                <br />
                <p>
                  <span className="font-semibold">UAN</span> : {employee.UAN}
                </p>
                <p>
                  <span className="font-semibold">Salary</span> : {employee.salary}
                </p>
                <br />
                <div>
                  <span className="font-semibold">Bank Details : </span>
                  {employee.bankDetails ? (
                    <div>
                      <p className="text-gray-700">Account No: {employee.bankDetails.accountNumber}</p>
                      <p className="text-gray-700">IFSC: {employee.bankDetails.ifsc}</p>
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>

                <div className="mt-5 flex gap-4 justify-between">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                    onClick={handleViewDetails}
                  >
                    View Details
                  </button>
                </div>

                <div className="relative">
                  <button
                    className="absolute right-2 top-5 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(employee._id)}
                  >
                    <AiFillDelete size={35} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <EditEmployeeForm
          initialValues={employee}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeeCard;
