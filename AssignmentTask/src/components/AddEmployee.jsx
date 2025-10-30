// src/components/EmployeeForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../redux/employeeSlice";

const EmployeeForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.employees);

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    empId: " ",
    employeeCode: '',
    gender: 'Select Gender',
    designation: '',
    department: '',
    salary: 0,
    joiningDate: null,
    appraisalDate: null,
    dateOfBirth: null,
    role: 'Select Role',
    password: '',
    reportingManagerId: '',
    profileImage: null,
    PFCode: '',
    UAN: '',
    bankDetails: {
    accountNumber: '',
    ifsc: ''
  },
    office: ''
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", `${formData.firstName} ${formData.lastName}`);
    data.append("email", formData.email);
    data.append("empId", formData.empId);
    data.append("password", formData.password);
    data.append("designation", formData.designation);
    data.append("department", formData.department);
    data.append("gender", formData.gender);
    data.append("employeeCode", formData.employeeCode);
    if (formData.joiningDate) data.append("joiningDate", formData.joiningDate.toISOString());
    if (formData.appraisalDate) data.append("appraisalDate", formData.appraisalDate.toISOString());
    if (formData.dateOfBirth) data.append("dob", formData.dateOfBirth.toISOString());
    data.append("PFCode", formData.PFCode);
    data.append("UAN", formData.UAN);
    data.append("bankDetails", JSON.stringify(formData.bankDetails));
    data.append("salary", formData.salary);
    data.append("office", formData.office);

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const resultAction = await dispatch(createEmployee(data));

      if (createEmployee.fulfilled.match(resultAction)) {
        toast.success("Employee created successfully!");
        setFormData(initialState); // reset form
        onClose(); // optionally close the modal
      } else {
        toast.error(resultAction.payload || "Failed to add employee");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-6xl">
        <h2 className="text-2xl font-bold mb-3 text-center text-blue-500">
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit} >
         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-blue-800 font-medium">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-blue-800 font-medium">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Profile Image */}
          <div className="flex flex-col">
            <label htmlFor="profileImage" className="text-blue-800 font-medium">Profile Image</label>
            <input type="file" id="profileImage" name="profileImage" accept="image/*"
              onChange={(e) => setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }))}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-blue-800 font-medium">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="empId" className="text-blue-800 font-medium">EmpId</label>
            <input type="empId" id="empId" name="empId" value={formData.empId} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Employee Code */}
          <div className="flex flex-col">
            <label htmlFor="employeeCode" className="text-blue-800 font-medium">Employee Code</label>
            <input type="text" id="employeeCode" name="employeeCode" value={formData.employeeCode} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-blue-800 font-medium">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="Select Gender" disabled>Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label htmlFor="designation" className="text-blue-800 font-medium">Designation</label>
            <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          
          {/* Department */}
          <div className="flex flex-col">
            <label htmlFor="department" className="text-blue-800 font-medium">Department</label>
            <input type="text" id="department" name="department" value={formData.department} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label htmlFor="salary" className="text-blue-800 font-medium">Salary</label>
            <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Joining Date */}
          <div className="flex flex-col">
            <label htmlFor="joiningDate" className="text-blue-800 font-medium">Joining Date</label>
            <DatePicker
              selected={formData.joiningDate}
              onChange={(date) => handleDateChange(date, 'joiningDate')}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholderText="dd-mm-yyyy"
              dateFormat="dd-MM-yyyy"
            />
          </div>

          {/* Appraisal Date */}
          <div className="flex flex-col">
            <label htmlFor="appraisalDate" className="text-blue-800 font-medium">Appraisal Date</label>
            <DatePicker
              selected={formData.appraisalDate}
              onChange={(date) => handleDateChange(date, 'appraisalDate')}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholderText="dd-mm-yyyy"
              dateFormat="dd-MM-yyyy"
            />
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="text-blue-800 font-medium">Date of Birth</label>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date) => handleDateChange(date, 'dateOfBirth')}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholderText="dd-mm-yyyy"
              dateFormat="dd-MM-yyyy"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label htmlFor="role" className="text-blue-800 font-medium">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="Select Role" disabled>Select Role</option>
              <option value="intern">Intern</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-blue-800 font-medium">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Reporting Manager */}
          <div className="flex flex-col">
            <label htmlFor="reportingManagerId" className="text-blue-800 font-medium ">Reporting Manager ID</label>
            <input type="text" id="reportingManagerId" name="reportingManagerId" value={formData.reportingManagerId} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>


          {/* UAN */}
          <div className="flex flex-col">
            <label htmlFor="UAN" className="text-blue-800 font-medium">UAN</label>
            <input type="text" id="UAN" name="UAN" value={formData.UAN} onChange={handleChange}
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          {/* Bank Details */}
          {/* <div className="flex flex-col">
            <label htmlFor="accountNumber" className="text-blue-800 font-medium">Account Number</label>
            <input type="text" id="accountNumber" name="accountNumber" value={formData.bankDetails?.accountNumber || ""} onChange={(e) =>
              setFormData({
                ...formData,
                bankDetails: {
                  ...formData.bankDetails,
                  accountNumber: e.target.value,
                },
              })
            }
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div> */}

          {/* <div className="flex flex-col ">
            <label htmlFor="ifsc" className="text-blue-800 font-medium">IFSC Code</label>
            <input
              type="text"
              id="ifsc"
              name="ifsc"
              value={formData.bankDetails?.ifsc || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bankDetails: {
                    ...formData.bankDetails,
                    ifsc: e.target.value,
                  },
                })
              }
              className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            </div> */}
          <div className="flex space-x-6 mt-[-20] flex-col">
            <label className="text-blue-800 font-semibold mt-6 ">BankDetails:</label>

            {/* Account Number */}
            <div className="flex flex-col mb-3">
              <label htmlFor="accountNumber" className="text-sm text-gray-700">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.bankDetails?.accountNumber || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankDetails: {
                      ...formData.bankDetails,
                      accountNumber: e.target.value,
                    },
                  })
                }
                className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* IFSC */}
            <div className="flex flex-col">
              <label htmlFor="ifsc" className="text-sm text-gray-700">IFSC Code</label>
              <input
                type="text"
                id="ifsc"
                name="ifsc"
                value={formData.bankDetails?.ifsc || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankDetails: {
                      ...formData.bankDetails,
                      ifsc: e.target.value,
                    },
                  })
                }
                className="p-2 border border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>


          {/* Buttons  */}
          
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button type="button" onClick={onClose}
              className="px-6 py-2 rounded-md font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit"
              className="px-6 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer">
              {loading ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
