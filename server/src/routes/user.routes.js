// routes/userRoutes.js
import express from "express";
import { login, logout, me, resetPassword, sendResetOtp,  } from "../controllers/user.controllers.js";
import { createEmployee , getEmployees, getEmployeeById,deleteEmployee, updateEmployee, getAllBirthdays,} from "../controllers/adminController.js";
// import { upload } from "../middlewares.js/upload.js"; // multer memoryStorage
import upload from "../config/cloudinary.js"
import { isAuthenticated } from "../middlewares.js/auth.js";

const router = express.Router();

router.post("/login", login);
// Admin creates employees
router.post("/employee", isAuthenticated, upload.single("profileImage"),createEmployee);
router.get("/me", isAuthenticated, me)
// Admin view all employees
router.get("/employees", isAuthenticated, getEmployees);
router.get("/employee/birthday",isAuthenticated, getAllBirthdays)
// router.get("/holidays/:year/:country", holiday);
// Admin or self can view employee details
router.get("/employee/:id", isAuthenticated, getEmployeeById);
//admin delete the employees
router.delete("/employee/:id", isAuthenticated, deleteEmployee);
// Update employee by ID (admin only)
router.put("/employee/:id", isAuthenticated, upload.single("profileImage"), updateEmployee);
router.post("/logout", isAuthenticated,logout);
router.post("/reset-otp",isAuthenticated, sendResetOtp)
router.post("/reset-password", isAuthenticated, resetPassword)

export default router;
