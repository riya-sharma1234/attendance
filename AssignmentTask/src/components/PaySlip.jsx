import React from 'react'
import octaadslogo from "../assets/octaadslogo.jpg"

const PaySlip = () => {
  return (
    <div>
    <div id="payslip" className="bg-white p-6 rounded-md shadow-md w-[800px] mx-auto text-sm">
  <div className="flex justify-between items-center">
    <div>
      <img src={octaadslogo} alt="logo" className="h-12 mb-2" />
      <h2 className="font-bold text-lg">OCTAADS MEDIA PVT. LTD.</h2>
      <p>Advertising & Marketing</p>
    </div>
    <div className="text-right text-xs">
      <p>CIN: U73100JH2024PTC022034</p>
      <p>PAN: AAECO3028M</p>
    </div>
  </div>

  <hr className="my-2 border-t-2 border-cyan-500" />

  <h3 className="text-center font-bold underline text-lg mt-2">Payslip for Month of August 2025</h3>

  <div className="flex justify-between my-4">
    <div className="space-y-1">
      <p><strong>Name:</strong> Riya</p>
      <p><strong>Designation:</strong> Developer</p>
      <p><strong>Department:</strong> Tech</p>
      <p><strong>LOP:</strong> 2</p>
    </div>
    <div className="space-y-1 text-right">
      <p><strong>Employee ID:</strong> EMP001</p>
      <p><strong>Bank Name:</strong> Axis Bank</p>
      <p><strong>Account Number:</strong> 1234567890</p>
      <p><strong>PAN:</strong> AXXXXX9999Z</p>
    </div>
  </div>

  <table className="w-full border border-collapse">
    <thead>
      <tr className="bg-gray-300 text-left">
        <th className="border px-2 py-1">Earnings</th>
        <th className="border px-2 py-1">Amount</th>
        <th className="border px-2 py-1">Deductions</th>
        <th className="border px-2 py-1">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border px-2 py-1">Basic Pay</td>
        <td className="border px-2 py-1">30000</td>
        <td className="border px-2 py-1">Provident Fund</td>
        <td className="border px-2 py-1">1800</td>
      </tr>
      <tr>
        <td className="border px-2 py-1">HRA</td>
        <td className="border px-2 py-1">10000</td>
        <td className="border px-2 py-1">Professional Tax</td>
        <td className="border px-2 py-1">200</td>
      </tr>
      <tr>
        <td className="border px-2 py-1">Medical Allowance</td>
        <td className="border px-2 py-1">2500</td>
        <td className="border px-2 py-1">Unpaid Leaves</td>
        <td className="border px-2 py-1">1000</td>
      </tr>
      <tr>
        <td className="border px-2 py-1">Other Benefits</td>
        <td className="border px-2 py-1">1500</td>
        <td className="border px-2 py-1"></td>
        <td className="border px-2 py-1"></td>
      </tr>
      <tr className="font-semibold">
        <td className="border px-2 py-1">Total Earnings</td>
        <td className="border px-2 py-1">44000</td>
        <td className="border px-2 py-1">Total Deductions</td>
        <td className="border px-2 py-1">3000</td>
      </tr>
      <tr className="font-bold">
        <td colSpan="2" className="border px-2 py-1 text-right">Net Pay:</td>
        <td colSpan="2" className="border px-2 py-1">₹41,000</td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  )
}

export default PaySlip