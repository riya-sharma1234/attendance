// routes/userRoutes.js
import express from "express";
import { login, logout, resetPassword, sendResetOtp } from "../controllers/user.controllers.js";
import { createEmployee } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares.js/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/employee", isAuthenticated, createEmployee);
router.post("/logout", isAuthenticated,logout);
router.post("/reset-otp",isAuthenticated, sendResetOtp)
router.post("/reset-password", isAuthenticated, resetPassword)

export default router;
