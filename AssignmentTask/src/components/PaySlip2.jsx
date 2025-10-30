import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import octaadslogo from "../assets/octaadslogo.jpg"; 
import signature from "../assets/signature.png";

const PaySlip = () => {
    const [employee, setEmployee] = useState({
        name: "",
        date: "",
        designation: "",
        department: "",
        employeeId: "",
        bankName: "",
        bankAccount: "",
        pan: "",
        ctc: "",
        basic: "",
        da: "",
        hra: "",
        epf: "",
        eps: "",
        esi: "",
        otherAllowance: "",
        EPF: "",
        EPS: "",
        ESI: "",
        otherDeduction: "",
    });
 
    const payslipRef = useRef();

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    // const downloadPDF = () => {
    //   const input = payslipRef.current;
    //   html2canvas(input, { scale: 2 }).then((canvas) => {
    //     const imgData = canvas.toDataURL("image/png");
    //     const pdf = new jsPDF("p", "mm", "a4");
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    //     const pdfHeight = pdf.internal.pageSize.getHeight();
    //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //     pdf.save(`${employee.name || "payslip"}.pdf`);
    //   });
    // };
    //   const downloadPDF = () => {
    //   const input = payslipRef.current;
    //   html2canvas(input, { scale: 1 }).then((canvas) => {
    //     const imgData = canvas.toDataURL("image/jpeg", 0.7); // JPEG with compression
    //     const pdf = new jsPDF("p", "mm", "a4");
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    //     const pdfHeight = pdf.internal.pageSize.getHeight();
    //     pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    //     pdf.save(`${employee.name || "payslip"}.pdf`);
    //   });
    // };

    const downloadPDF = () => {
        const input = payslipRef.current;

        html2canvas(input, { scale: 1.5, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 0.8);
            // jpeg with 80% quality → balance between clarity & size

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Agar height A4 se badi ho, to multiple pages me break karega
            // let position = 0;
            // let heightLeft = pdfHeight;

            // while (heightLeft > 0) {
            //   pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
            //   heightLeft -= pdf.internal.pageSize.getHeight();
            //   if (heightLeft > 0) {
            //     pdf.addPage();
            //     position = 0;
            //   }
            // }
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

            pdf.save(`${employee.name || "payslip"}.pdf`);
        });
    };


    const grossSalary =
        Number(employee.basic || 0) +
        Number(employee.da || 0) +
        Number(employee.hra || 0) +
        Number(employee.epf || 0) +
        Number(employee.eps || 0) +
        Number(employee.esi || 0) +
        Number(employee.otherAllowance || 0);

    const totalDeductions =
        Number(employee.EPF || 0) +
        Number(employee.EPS || 0) +
        Number(employee.ESI || 0) +
        Number(employee.otherDeduction || 0);

    const netInHand = grossSalary - totalDeductions;

    return (
        <div className="space-y-6 p-4">
            {/* Employee Info Form */}
            <div style={{ backgroundColor: "#ffffff" }} className="p-6 rounded-lg shadow-md max-w-6xl mx-auto ">
                <h2 style={{ color: "#1f2937" }} className="text-2xl font-bold mb-6 text-center">
                    📝 Employee Details
                </h2>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {["name", "date", "designation", "department", "employeeId", "bankName", "bankAccount", "pan"].map((key) => (
                        <div key={key} className="flex flex-col">
                            <label style={{ color: "#374151" }} className="block font-medium mb-1 capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type={key === "date" ? "date" : "text"}
                                name={key}
                                value={employee[key]}
                                onChange={handleChange}
                                style={{ borderColor: "#d1d5db" }}
                                className="w-full p-2 border rounded-lg focus:outline-none transition-all"
                            />
                        </div>
                    ))}
                </div>

                {/* Salary Details */}
                <h3 style={{ color: "#111827" }} className="text-lg font-semibold mb-2">💰 Salary Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {["ctc", "basic", "da", "hra", "epf", "eps", "esi", "otherAllowance"].map((key) => (
                        <div key={key} className="flex flex-col">
                            <label style={{ color: "#374151" }} className="block font-medium mb-1 capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={employee[key]}
                                onChange={handleChange}
                                style={{ borderColor: "#d1d5db" }}
                                className="w-full p-2 border rounded-lg focus:outline-none transition-all"
                            />
                        </div>
                    ))}
                </div>

                {/* Deductions */}
                <h3 style={{ color: "#111827" }} className="text-lg font-semibold mb-2">📉 Deductions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["EPF", "EPS", "ESI", "otherDeduction"].map((key) => (
                        <div key={key} className="flex flex-col">
                            <label style={{ color: "#374151" }} className="block font-medium mb-1 capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={employee[key]}
                                onChange={handleChange}
                                style={{ borderColor: "#d1d5db" }}
                                className="w-full p-2 border rounded-lg focus:outline-none transition-all"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Payslip Preview */}
            <div
                ref={payslipRef}
                style={{ backgroundColor: "#ffffff", borderColor: "#d1d5db", boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
                className="p-8 w-[850px] mx-auto text-sm rounded-lg relative "
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <img src={octaadslogo} alt="logo" className="h-20 object-contain opacity-90 rounded-full" />
                        <div>
                            <h2 style={{ color: "#111827", fontWeight: "bold" }}>OCTAADS MEDIA PVT. LTD.</h2>
                            <p style={{ color: "#6b7280" }}>Advertising & Marketing</p>
                        </div>
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "10px", textAlign: "right" }}>
                        <p>CIN: U73100JH2024PTC022034</p>
                        <p>PAN: AAECO3028M</p>
                    </div>
                </div>

                {/* Cyan Divider */}
                <div style={{ height: "4px", backgroundColor: "#06b6d4", borderRadius: "4px", marginBottom: "24px" }}></div>

                {/* Payslip Title */}
                <h3 style={{ color: "#111827", fontWeight: "bold" }} className="text-center underline text-lg mb-6 tracking-wide">
                    PAYSLIP FOR{" "}
                    {/* {employee.date
                        ? new Date(employee.date).toLocaleString("default", { month: "long", year: "numeric" })
                        : "2025"} */}
                    {employee.date
                        ? new Date(employee.date)
                            .toLocaleString("default", { month: "long", year: "numeric" })
                            .toUpperCase()
                        : "2025"}
                </h3>


                <div className="relative mb-6">
                    {/* Transparent background logo */}
                    <img
                        src={octaadslogo}    
                        alt="watermark"
                        className="absolute inset-0 m-auto opacity-15  w-[60%] object-contain rounded-full"
                        style={{ zIndex: 0 }}
                    />
                    {/* Employee Info */}
                    <div className="grid grid-cols-2 gap-6 mb-6 text-sm relative">
                        <div className="space-y-1">
                            <p><strong>Name:</strong> {employee.name}</p>
                            <p><strong>Date:</strong> {employee.date}</p>
                            <p><strong>Designation:</strong> {employee.designation}</p>
                            <p><strong>Department:</strong> {employee.department}</p>  
                        </div>
                        <div className="space-y-1" style={{ textAlign: "right" }}>
                            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                            <p><strong>Bank Name:</strong> {employee.bankName}</p>
                            <p><strong>Bank Account:</strong> {employee.bankAccount}</p>
                            <p><strong>PAN:</strong> {employee.pan}</p>     
                        </div>
                    </div>

                    {/* Salary Table */}
                    <table className="relative" style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #d1d5db", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                        <thead>
                            <tr >
                                <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "left" }}>DETAILS</th>
                                <th style={{ border: "1px solid #d1d5db", padding: "6px", textAlign: "left" }}>AMOUNT (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>CTC</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.ctc}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>Basic</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.basic}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>DA</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.da}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>HRA</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.hra}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>EPF</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.epf}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>EPS</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.eps}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>ESI</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.esi}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>Other Allowance</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.otherAllowance}</td></tr>
                            <tr style={{ fontWeight: "600", }}><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>Gross Salary</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{grossSalary}</td></tr>
                            <tr style={{ fontWeight: "600", }}><td colSpan={2} style={{ border: "1px solid #d1d5db", padding: "4px" }}>Deductions</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>EPF</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.EPF}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>EPS</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.EPS}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>ESI</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.ESI}</td></tr>
                            <tr><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>Other Deductions</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{employee.otherDeduction}</td></tr>
                            <tr style={{ fontWeight: "bold", backgroundColor: "white" }}><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>Net In-Hand</td><td style={{ border: "1px solid #d1d5db", padding: "4px" }}>{netInHand}</td></tr>
                        </tbody>
                    </table>

                </div>

                {/* Footer */}
                <div style={{ borderTop: "1px solid #d1d5db", paddingTop: "1rem" }} className="flex justify-between items-end">
                    <div>
                        <p><strong>Sincerely,</strong></p>
                        <p>Abdulla Khan</p>
                        <p>Co-Founder & Director</p>
                        <p>Octaads Media</p>
                        <a href="mailto:abdullakhan@octaadsmedia.com" style={{ color: "#2563eb", textDecoration: "underline" }}>
                            abdullakhan@octaadsmedia.com
                        </a>
                    </div>
                    {/* <div style={{ textAlign: "right", color: "#6b21a8", fontSize: "10px" }}>
                        <p>Authorised Signatory/Director</p>
                    </div> */}
                    <div style={{ textAlign: "right",  }} className="w-70">
                                <img src={signature} className="" alt="" />
                              </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", alignItems: "center" }}>
                        <span style={{ color: "#06b6d4", fontSize: "1.25rem" }}>📍</span>
                        <p>
                            C/O: Siraj Khan, 1ST Floor, Loco Bazar, Near Loco Bazar Masjid,
                            Gomoh, Dhanbad, Jharkhand, 828401
                        </p>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <div style={{ textAlign: "center" }}>
                <button
                    onClick={downloadPDF}
                    style={{ backgroundColor: "#06b6d4", color: "#ffffff", borderRadius: "0.5rem", padding: "0.5rem 2rem", marginTop: "1.5rem", cursor: "pointer" }}
                >
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default PaySlip;
