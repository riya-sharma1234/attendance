import React from "react";

const EmployeeDetailsForm = () => {
  return (
    <div className=" bg-[#0d1321] p-2 space-y-2 mx-20" >
      <div className="bg-white p-2 rounded shadow-md">
        <h2 className="font-semibold mb-2 text-center  font-bold text-xl">📝 Fill Employee Details</h2>
        {/* Section: Employee Details */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input type="text" label="Employee Name" />
          <Input type="text" label="Employee ID" />
          <Input type="text" label="Designation" />
          <Input type="text" label="Department" />
          <Input type="text" label="Bank Name" />
          <Input type="text" label="Bank Account Number" />
          <Input type="text" label="PAN" />
          <Input type="text" label="LOP" />
          <Input type="text" label="Month" placeholder="e.g., January 2025" />
        </div>

        {/* Section: Earnings */}
        <h3 className="text-xl font-semibold mt-4 mb-2">💰 Earnings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input type="number" label="Basic Pay"  step={1} min={0} max={31} />
          <Input type="number" label="HRA"  step={1} min={0} max={31} />
          <Input type="number" label="Medical Allowance" step={1} min={0} max={31} />
          <Input type="number" label="Other Benefits"  step={1} min={0} max={31}/>
        </div>


        {/* Section: Deductions */}
        <h3 className="text-xl font-semibold mt-4 mb-2">🧾 Deductions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input type="number" label="Provident Fund"  step={1} min={0} max={31} />
          <Input type="number" label="Professional Tax"  step={1} min={0} max={31}/>
          <Input type="number" label="Unpaid Leaves"  step={1} min={0} max={31}/>
        </div>
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({ type, label,  readOnly = false, placeholder = "" , step,min, max,}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
     type={type}
     step={step}
      min={min}
      max={max}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border ${readOnly ? "bg-blue-50 cursor-not-allowed" : "bg-white"
        } border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
);

export default EmployeeDetailsForm;
