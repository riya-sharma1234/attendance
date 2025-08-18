
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },
  resetOtp: {
    type:Number,
    default: null
  },
  resetOtpExpireAt:{
    type:Date,
    default: null
  },
  consumedLeaves: {
    casual: { type: Number, default: 0 },
    planned: { type: Number, default: 0 },
    sick: { type: Number, default: 0 },
    wfh: { type: Number, default: 0 }
  },
  employeeCode: String,
  designation: String,
  joiningDate: Date,
  appraisalDate: Date,
  PFCode: String,
  UAN: String,
  bankDetails: {
    accountNumber: String,
    ifsc: String
  },
  resignationDate: Date,
  bonusReceived: Number,
  dob: Date,
  salary: Number,
  office: String,
  lop: Number,

}, { timestamps: true });


// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
