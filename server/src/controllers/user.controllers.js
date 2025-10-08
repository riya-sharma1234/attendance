// controllers/authController.js
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ success: false, message: "Invalid email " });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid  password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // can't access via JS
      // secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      // sameSite: "strict",
      secure: false,          // for localhost only
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day

      // httpOnly: true,           // cannot be accessed via JS
      // secure: true,             // must be true on HTTPS
      // sameSite: "none",         // allow cross-site cookies
      // maxAge: 24 * 60 * 60 * 1000 // 
    });

    res.json({
      success: true, message: "Login successful", role: user.role, user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",

    // }).json({ success: true });

    return res.json({ success: true, message: "logged out" })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

//send password Reset otp

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" })
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins from now
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "reset otp",
      text: `Your OTP for resetting your password is ${otp}. It will expire in 15 minutes.`,
    }
    await transporter.sendMail(mailOptions).catch(err => {
      throw new Error("Failed to send email: " + err.message);
    });
    return res.json({ success: true, message: "otp sent to your email", otp })
  }
  catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

// Reset password

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.json({ sucess: false, message: "Email, OTP, new Password are required" })
  }

  if (newPassword !== confirmPassword) {
    return res.json({ success: false, message: "Passwords do not match" });
  }


  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }
    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" })
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Otp expired" })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.resetOtp = "";
    user.resetOtpExpireAt = null;
    await user.save();
    return res.json({ success: true, message: "Password has been reset successfully" })
  }
  catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
}