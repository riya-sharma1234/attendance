import User from "../models/user.models.js";
import Leave from "../models/leave.models.js";


// controllers/adminController.js
export const createEmployee = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can create employees" });
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  const employee = await User.create({
    name,
    email,
    password,
    role: "employee"
  });

  res.json({ message: "Employee created", employee });
};


