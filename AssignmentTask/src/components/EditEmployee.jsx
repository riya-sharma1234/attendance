import React, { useState, useEffect } from "react";

const EditEmployeeForm = ({ initialValues, onSave, onCancel }) => {

const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    empId: "",
    employeeCode: "",
    gender: "",
    designation: "",
    department: "",
    salary: "",
    joiningDate: "",
    appraisalDate: "",
    dob: "",
    role: "",
    reportingManagerId: "",
    UAN: "",
    bankDetails: { accountNumber: "", ifsc: "" },
    profileImage: null,
  });

  // Populate initial values
  useEffect(() => {
    if (initialValues) {
      setFormData({
        firstName: initialValues.firstName || "",
        lastName: initialValues.lastName || "",
        email: initialValues.email || "",
        employeeCode: initialValues.employeeCode || "",
        empId: initialValues.empId|| "",
        gender: initialValues.gender || "",
        designation: initialValues.designation || "",
        department: initialValues.department || "",
        salary: initialValues.salary || "",
        joiningDate: initialValues.joiningDate || "",
        appraisalDate: initialValues.appraisalDate || "",
        dob: initialValues.dob || "",
        role: initialValues.role || "",
        reportingManagerId: initialValues.reportingManagerId || "",
        UAN: initialValues.UAN || "",
        bankDetails: initialValues.bankDetails || { accountNumber: "", ifsc: "" },
        profileImage: initialValues.profileImage || null,
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name.includes("bankDetails.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        bankDetails: { ...formData.bankDetails, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();

  // Combine first and last name
  data.append("name", `${formData.firstName} ${formData.lastName}`);

  Object.entries(formData).forEach(([key, value]) => {
    if (key === "firstName" || key === "lastName") return;

    if (key === "bankDetails" && value) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        data.append(`bankDetails.${nestedKey}`, nestedValue);
      });
    } else if (value instanceof File) {
      data.append(key, value);
    } else if (value !== undefined && value !== null) {
      data.append(key, value);
    }
  });

  onSave(data);
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Profile Image</label>
            <input type="file" name="profileImage" onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Employee Code</label>
            <input name="employeeCode" value={formData.employeeCode} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label>EmpId</label>
            <input name="empId" value={formData.empId} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Designation</label>
            <input name="designation" value={formData.designation} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Department</label>
            <input name="department" value={formData.department} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Salary</label>
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Joining Date</label>
            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Appraisal Date</label>
            <input type="date" name="appraisalDate" value={formData.appraisalDate} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="p-2 border rounded">
              <option value="">Select Role</option>
              <option value="intern">Intern</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Reporting Manager ID</label>
            <input name="reportingManagerId" value={formData.reportingManagerId} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>UAN</label>
            <input name="UAN" value={formData.UAN} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Bank Account Number</label>
            <input name="bankDetails.accountNumber" value={formData.bankDetails.accountNumber} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col">
            <label>Bank IFSC</label>
            <input name="bankDetails.ifsc" value={formData.bankDetails.ifsc} onChange={handleChange} className="p-2 border rounded" />
          </div>
          <div className="col-span-3 flex justify-end gap-4 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">Save</button>
            <button type="button" onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 cursor-pointer">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
