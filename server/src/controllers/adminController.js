import User from "../models/user.models.js";
import Leave from "../models/leave.models.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose"
import fetch from "node-fetch";


export const createEmployee = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create employees" });
    }

    // Destructure fields from req.body
    let {
      empId, name, email, password, designation, gender, employeeCode,
      joiningDate, appraisalDate, UAN, bankDetails, salary,
      dob, department
    } = req.body;

    //  Parse bankDetails if it comes as string
    if (typeof bankDetails === "string") {
      try {
        bankDetails = JSON.parse(bankDetails);
      } catch (err) {
        bankDetails = {}; // fallback if JSON invalid
      }
    }

    const profileImageUrl = req.file ? req.file.path : "";

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Check if employeeCode exists
    const existingCode = await User.findOne({ employeeCode });
    if (existingCode) {
      return res.status(400).json({ success: false, message: "Employee code already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle image upload
    // const profileImage = req.file
    //   ? { data: req.file.buffer, contentType: req.file.mimetype }
    //   : null;

    // Create employee
    const employee = await User.create({
      empId,
      name,
      email,
      password: hashedPassword,
      role: "employee",
      employeeCode,
      designation,
      department,
      gender,
      joiningDate,
      appraisalDate,
      uploadedBy: req.user._id,
      profileImage: profileImageUrl,
      UAN,
      bankDetails,
      salary,
      dob
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: {
        _id: employee._id,
        name: employee.name,
        id:employee.empId,
        email: employee.email,
        employeeCode: employee.employeeCode,
        designation: employee.designation,
        joiningDate: employee.joiningDate,
        role: employee.role
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all employees (Admin only)
export const getEmployees = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ success: false, message: "Only admin can view employees" });
    // }

    const employees = await User.find({ role: "employee" }).select("-password");
    res.status(200).json({ success: true, employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get employee by ID (Admin or Self)
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select("-password");
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    if (req.user.role !== "admin" && req.user._id.toString() !== employee._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to view this profile" });
    }

    res.status(200).json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /employees/:id

export const deleteEmployee = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete employees"
      });
    }

    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid employee ID" });
    }

    const employee = await User.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    if (employee._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "Admin cannot delete themselves" });
    }

    // Delete
    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update employees" });
    }

    const employee = await User.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const updates = { ...req.body };

    // Handle profile image uploaded via Cloudinary
    if (req.file) {
      updates.profileImage = req.file.path; // Multer Cloudinary provides the URL
    }

    if (req.body["bankDetails.accountNumber"] || req.body["bankDetails.ifsc"]) {
      updates.bankDetails = {
        accountNumber: req.body["bankDetails.accountNumber"] || employee.bankDetails.accountNumber,
        ifsc: req.body["bankDetails.ifsc"] || employee.bankDetails.ifsc,
      };
    }


    Object.assign(employee, updates);
    await employee.save();

    res.status(200).json({ success: true, employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getAllBirthdays = async (req, res) => {
  try {
    const users = await User.find({}, "name dob");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Proxy to Nager.Date
// export const holiday =  async (req, res) => {
//   const { year, country } = req.params;
//   console.log("Holiday route hit:", year, country);

//   try {
//     const upstream = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${country}`);
//     console.log("Nager status:", upstream.status);

//     if (upstream.status === 204) {
//       return res.json([]); // No holidays
//     }

//     if (!upstream.ok) {
//       const text = await upstream.text();
//       console.error("Upstream error:", text);
//       return res.status(upstream.status).send(text);
//     }

//     const data = await upstream.json();
//     res.json(data); // send to React unchanged
//   } catch (err) {
//     console.error("Holiday proxy error:", err);
//     res.status(500).send("Error fetching holidays");
//   }
// };
// routes/holiday.js

// const holidayCache = {};

// export const holiday =  async (req, res) => {
//   const { year, country } = req.params;

//   // Return from cache if exists
//   if (holidayCache[`${country}-${year}`]) {
//     return res.json(holidayCache[`${country}-${year}`]);
//   }

//   try {
//     const API_KEY = process.env.ABSTRACT_API_KEY; // store your key in env
//     const url = `https://holidays.abstractapi.com/v1/?api_key=${API_KEY}&country=${country}&year=${year}`;
    
    
//     const response = await fetch(url);
//     if (!response.ok) {
//       const text = await response.text();
//       console.error("Abstract API error:", text);
//       return res.status(response.status).send(text);
//     }

//     const data = await response.json();
//     // Cache the holidays
//     holidayCache[`${country}-${year}`] = data;

//     res.json(data);
//   } catch (err) {
//     console.error("Holiday fetch error:", err);
//     res.status(500).send("Error fetching holidays");
//   }
// };





