
import mongoose from "mongoose";


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

  leaveLimits: { // total allowed leaves per type
    casual: { type: Number, default: 0 },
    planned: { type: Number, default: 0 },
    sick: { type: Number, default: 0 },
    wfh: { type: String, default: "0" } // use "unlimited" string or number
  },

  consumedLeaves: {  // leaves already used
    casual: { type: Number, default: 0 },
    planned: { type: Number, default: 0 },
    sick: { type: Number, default: 0 },
    wfh: { type: Number, default: 0 }
  },

  employeeCode: { type: String, required: true, unique: true },
  gender: {type: String},
  designation: { type: String, required: true },
  department: { type: String, required: true },
  appraisalDate: { type: Date },
  joiningDate: { type: Date, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who added employee
  //  store Cloudinary URL as string
  profileImage: {
    type: String,
    default: "", // optional default
  },

  //  profileImage: {
  //   data: Buffer,
  //   contentType: String,
  // },
  UAN: String,
  bankDetails: {
    accountNumber: String,
    ifsc: String
  },
  resignationDate: Date,
  bonusReceived: Number,
  dob: Date,
  salary: Number,
  lop: Number,

}, { timestamps: true });


// Hash password before save
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   if (!this.password.startsWith("$2a$")) { // only hash if not already hashed
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   // this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export default mongoose.model("User", userSchema);
