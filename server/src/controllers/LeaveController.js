import mongoose from "mongoose";
import Leave from "../models/leave.models.js";
import User from "../models/user.models.js";

 
const calculateDays = (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);
  return Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
};


// export const applyLeave = async (req, res) => {
//   try {
//     const { leaveType, fromDate, toDate, reason } = req.body;
//     const employeeId = req.user._id;

//     const user = await User.findById(employeeId);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const leaveLimits = user.leaveLimits || {}; // dynamic limits per type
//     const limit = leaveLimits[leaveType];

//     if (limit === undefined) {
//       return res.status(400).json({ success: false, message: `Invalid leave type: ${leaveType}` });
//     }

//     const leaveYear = new Date(fromDate).getFullYear();

//     // Calculate total consumed leaves of this type (approved + pending)
//     if (!user.consumedLeaves) user.consumedLeaves = {};
//     if (!user.consumedLeaves[leaveType]) user.consumedLeaves[leaveType] = 0;

//     const from = new Date(fromDate);
//     const to = new Date(toDate);
//     from.setHours(0,0,0,0);
//     to.setHours(0,0,0,0);
//     const reqDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

//     // Check if leave balance is sufficient
//     if (limit !== "unlimited" && user.consumedLeaves[leaveType] + reqDays > limit) {
//       return res.status(400).json({
//         success: false,
//         message: `Insufficient leave balance for ${leaveType}`,
//         consumed: user.consumedLeaves[leaveType],
//         balance: limit - user.consumedLeaves[leaveType]
//       });
//     }

//     // Create leave request (status: pending)
//     const leave = await Leave.create({
//       employee: employeeId,
//       leaveType,
//       fromDate,
//       toDate,
//       reason,
//       year: leaveYear,
//       status: "pending"
//     });

//     // Increase consumedLeaves immediately
//     user.consumedLeaves[leaveType] += reqDays;
//     await user.save();

//     // Compute remaining balance dynamically
//     const balance = {};
//     Object.keys(leaveLimits).forEach(type => {
//       if (leaveLimits[type] === "unlimited") {
//         balance[type] = "Unlimited";
//       } else {
//         balance[type] = leaveLimits[type] - (user.consumedLeaves[type] || 0);
//       }
//     });

//     res.json({
//       success: true,
//       message: "Leave request submitted and balance updated",
//       leave,
//       consumedLeaves: user.consumedLeaves,
//       balance
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// Update leave status (approve/reject)
// export const updateLeaveStatus = async (req, res) => {
//   try {
//     const { leaveId, status } = req.body;

//     if (!leaveId || !status) return res.status(400).json({ success: false, message: "leaveId and status are required" });

//     const leave = await Leave.findById(leaveId);
//     if (!leave) return res.status(404).json({ success: false, message: "Leave not found" });

//     const user = await User.findById(leave.employee);
//     if (!user) return res.status(404).json({ success: false, message: "Employee not found" });

//     if (!user.consumedLeaves) user.consumedLeaves = {};
//     if (!leave.leaveType) return res.status(400).json({ success: false, message: "Leave type is missing" });
//     if (!user.consumedLeaves[leave.leaveType]) user.consumedLeaves[leave.leaveType] = 0;

//     const from = new Date(leave.fromDate);
//     const to = new Date(leave.toDate);
//     const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

//     if (status === "approved" && leave.status !== "approved") {
//       user.consumedLeaves[leave.leaveType] += days;
//     } else if (status === "rejected" && leave.status === "approved") {
//       user.consumedLeaves[leave.leaveType] = Math.max(0, user.consumedLeaves[leave.leaveType] - days);
//     }

//     leave.status = status;

//     await leave.save();
//     await user.save();

//     // Compute remaining balance dynamically
//     const leaveLimits = user.leaveLimits || {};
//     const balance = {};
//     Object.keys(leaveLimits).forEach(type => {
//       if (leaveLimits[type] === "unlimited") {
//         balance[type] = "Unlimited";
//       } else {
//         balance[type] = leaveLimits[type] - (user.consumedLeaves[type] || 0);
//       }
//     });

//     res.json({
//       success: true,
//       message: `Leave ${status} successfully`,
//       leave,
//       consumedLeaves: user.consumedLeaves,
//       balance
//     });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

export const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;
    const employeeId = req.user._id;

    const user = await User.findById(employeeId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const leaveLimits = user.leaveLimits || {};
    const limit = leaveLimits[leaveType];
    if (limit === undefined) return res.status(400).json({ success: false, message: `Invalid leave type: ${leaveType}` });

    const leaveYear = new Date(fromDate).getFullYear();

    // Calculate requested days
    const from = new Date(fromDate);
    const to = new Date(toDate);
    from.setHours(0,0,0,0);
    to.setHours(0,0,0,0);
    const reqDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    // Initialize consumedLeaves and balance if not present
    if (!user.consumedLeaves) user.consumedLeaves = {};
    if (!user.consumedLeaves[leaveType]) user.consumedLeaves[leaveType] = 0;

    if (!user.balance) user.balance = {};
    if (user.balance[leaveType] === undefined) {
      user.balance[leaveType] = limit === "unlimited" ? "Unlimited" : Number(limit);
    }

    // Check if leave balance is sufficient
    if (limit !== "unlimited" && user.consumedLeaves[leaveType] + reqDays > limit) {
      return res.status(400).json({
        success: false,
        message: `Insufficient leave balance for ${leaveType}`,
        consumed: user.consumedLeaves[leaveType],
        balance: user.balance[leaveType]
      });
    }

    // Create leave request (status: pending)
    const leave = await Leave.create({
      employee: employeeId,
      leaveType,
      fromDate,
      toDate,
      reason,
      year: leaveYear,
      status: "pending"
    });

    // Update consumedLeaves and balance
    user.consumedLeaves[leaveType] += reqDays;
    if (limit !== "unlimited") {
      user.balance[leaveType] = Math.max(0, user.balance[leaveType] - reqDays);
    }

    user.markModified("consumedLeaves");
    user.markModified("balance");
    await user.save();

    res.json({
      success: true,
      message: "Leave request submitted and balance updated",
      leave,
      leaveLimits: user.leaveLimits,
      consumedLeaves: user.consumedLeaves,
      balance: user.balance
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    if (!leaveId || !status) 
      return res.status(400).json({ success: false, message: "leaveId and status are required" });

    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ success: false, message: "Leave not found" });

    const user = await User.findById(leave.employee);
    if (!user) return res.status(404).json({ success: false, message: "Employee not found" });

    if (!user.consumedLeaves) user.consumedLeaves = {};
    if (!leave.leaveType) return res.status(400).json({ success: false, message: "Leave type is missing" });
    if (!user.consumedLeaves[leave.leaveType]) user.consumedLeaves[leave.leaveType] = 0;

    const from = new Date(leave.fromDate);
    const to = new Date(leave.toDate);
    from.setHours(0,0,0,0);
    to.setHours(0,0,0,0);
    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    if (status === "approved") {
      // Do nothing here, because consumedLeaves was already increased on apply
    }

    if (status === "rejected") {
      // Always restore consumed leaves on rejection
      user.consumedLeaves[leave.leaveType] = Math.max(0, user.consumedLeaves[leave.leaveType] - days);
    }

    leave.status = status;

    await leave.save();
    await user.save();

    // Compute remaining balance dynamically
    const leaveLimits = user.leaveLimits || {};
    const balance = {};
    Object.keys(leaveLimits).forEach(type => {
      if (leaveLimits[type] === "unlimited") {
        balance[type] = "Unlimited";
      } else {
        balance[type] = leaveLimits[type] - (user.consumedLeaves[type] || 0);
      }
    });

    res.json({
      success: true,
      message: `Leave ${status} successfully`,
      leave,
      consumedLeaves: user.consumedLeaves,
      balance
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getLeaveBalances = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const consumedLeaves = user.consumedLeaves || {};
    const leaveLimits = user.leaveLimits || { casual: 12, planned: 10, sick: 13, wfh: "unlimited" };

    const balance = {};

    Object.keys(leaveLimits).forEach(type => {
      if (String(leaveLimits[type]).toLowerCase() === "unlimited") {
        balance[type] = "Unlimited";
      } else {
        balance[type] = Math.max(0, Number(leaveLimits[type]) - (consumedLeaves[type] || 0));
      }
    });

    res.json({ success: true, consumedLeaves, balance });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getMonthlyLeaveStatus = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });

    const employee = req.user._id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ success: false, message: "Month and year are required" });
    }

    const monthNum = Number(month);
    const yearNum = Number(year);

    if (isNaN(monthNum) || isNaN(yearNum)) {
      return res.status(400).json({ success: false, message: "Invalid month or year" });
    }

    // Date range for the month
    const startDate = new Date(yearNum, monthNum - 1, 1);
    const endDate = new Date(yearNum, monthNum, 0, 23, 59, 59); // last day of month

    // Fetch leaves overlapping this month
    const leaves = await Leave.find({
      employee,
      status: { $in: ["pending", "approved"] },
      fromDate: { $lte: endDate },
      toDate: { $gte: startDate }
    });

    const leaveTypes = ["casual", "planned", "sick", "wfh"];
    const status = {};

    leaveTypes.forEach(type => status[type] = { consumed: 0 });

    leaves.forEach(l => {
      if (status[l.leaveType]) {
        const from = l.fromDate < startDate ? startDate : l.fromDate;
        const to = l.toDate > endDate ? endDate : l.toDate;
        const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
        status[l.leaveType].consumed += days;
      }
    });

    res.json({
      success: true,
      leaves,
      month: monthNum,
      year: yearNum,
      status
    });

  } catch (err) {
    console.error("Error in getMonthlyLeaveStatus:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};




// Get all pending leaves (admin view)
export const getPendingLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: "pending" })
      .populate("employee", "name ");
    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message,  });
  }
};


// Search leaves by status for logged-in user
export const getLeavesByStatus = async (req, res) => {
  try {
    const { status } = req.body; // frontend sends { "status": "approved" } or "pending"
    const employee = req.user._id; // logged-in user

    // Find leaves by status & employee
    const leaves = await Leave.find({ 
      employee,
      status
    }).populate("employee", "name email");

    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Fetch leaves by status, optionally filter by employeeId
export const getLeavesByStatusbyid = async (req, res) => {
try {
    const { status, employeeId } = req.query;

    let query = { status };

    if (employeeId) {
      // If admin clicked employee card → filter by that employee
      query.employee = employeeId;
    } else {
      // Otherwise → show logged-in admin's own leaves
      query.employee = req.user._id;
    }

    const leaves = await Leave.find(query).populate("employee", "name email");

    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const setLeaveLimits = async (req, res) => {
  try {
    const { userId, leaveLimits } = req.body;
    const requester = req.user; // attached via auth middleware

    //  Ensure userId exists and is a valid MongoDB ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    //  Authorization: only admins allowed
    if (requester.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only admins can set leave limits" });
    }

    //  Fetch the target user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    //  Validate leave limits
    const validTypes = ["casual", "planned", "sick", "wfh"];
    for (const [type, value] of Object.entries(leaveLimits)) {
      if (!validTypes.includes(type)) {
        return res.status(400).json({ success: false, message: `Invalid leave type: ${type}` });
      }

      if (type === "wfh" && value !== "unlimited" && Number(value) < 0) {
        return res.status(400).json({ success: false, message: "Invalid WFH limit" });
      }

      if (type !== "wfh" && Number(value) < 0) {
        return res.status(400).json({ success: false, message: `Leave limit cannot be negative for ${type}` });
      }
    }

    //  Apply the limits
    user.leaveLimits = { ...user.leaveLimits, ...leaveLimits };
    await user.save();

    return res.json({
      success: true,
      message: `Leave limits updated for ${user.name}`,
      leaveLimits: user.leaveLimits,
      name: user.name,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const filterLeaves = async (req, res) => {
  try {
    //  Admin only
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only admins can access this" });
    }

    const { userId, leaveType, status, month, year } = req.query;

    const filter = {};

    if (userId && mongoose.Types.ObjectId.isValid(userId)) filter.employee = userId;
    if (leaveType) filter.leaveType = leaveType;
    if (status) filter.status = status;

    // Month and year filter
    if (month && year) {
      const startDate = new Date(Number(year), Number(month) - 1, 1);
      const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);
      filter.fromDate = { $lte: endDate };
      filter.toDate = { $gte: startDate };
    }

    // Fetch leaves and populate employee details
    const leaves = await Leave.find(filter).populate("employee", "name email");

    // Leave summary (consumed per type)
    const leaveTypes = ["casual", "planned", "sick", "wfh"];
    const statusSummary = {};
    leaveTypes.forEach((type) => statusSummary[type] = { consumed: 0 });

    leaves.forEach((l) => {
      const from = month && year ? (l.fromDate < new Date(year, month - 1, 1) ? new Date(year, month - 1, 1) : l.fromDate) : l.fromDate;
      const to = month && year ? (l.toDate > new Date(year, month, 0, 23, 59, 59) ? new Date(year, month, 0, 23, 59, 59) : l.toDate) : l.toDate;
      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

      if (statusSummary[l.leaveType]) statusSummary[l.leaveType].consumed += days;
    });

    res.json({ success: true, leaves, status: statusSummary });

  } catch (err) {
    console.error("filterLeaves error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
