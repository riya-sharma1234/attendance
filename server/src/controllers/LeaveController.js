import Leave from "../models/leave.models.js";
import User from "../models/user.models.js";

// yearly limits by type
const LEAVE_LIMITS = {
  casual: 12,
  planned: 10,
  sick: 13,
  wfh: Infinity // unlimited
};

export const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;
    const employee = req.user._id; // from auth middleware

    if (!LEAVE_LIMITS.hasOwnProperty(leaveType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid leave type: ${leaveType}`
      });
    }

    const leaveYear = new Date(fromDate).getFullYear();

    // 1. Find all approved + pending leaves of same type for that year
    const leaves = await Leave.find({
      employee,
      year: leaveYear,
      status: { $in: ["approved", "pending"] },
      leaveType
    });

    // 2. Count total days consumed
    let totalConsumed = 0;
    leaves.forEach(l => {
      const from = new Date(l.fromDate);
      const to = new Date(l.toDate);
      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1; // inclusive
      totalConsumed += days;
    });

    // 3. Days in current request
    const reqFrom = new Date(fromDate);
    const reqTo = new Date(toDate);
    const reqDays = Math.ceil((reqTo - reqFrom) / (1000 * 60 * 60 * 24)) + 1;

    // 4. Check yearly limit (skip if unlimited / WFH)
    const limit = LEAVE_LIMITS[leaveType];
    if (limit !== Infinity && totalConsumed + reqDays > limit) {
      return res.status(400).json({
        success: false,
        message: `Yearly limit for ${leaveType} leave is ${limit}. You already consumed ${totalConsumed} days.`,
        consumed: totalConsumed,
        balance: limit - totalConsumed
      });
    }

    // 5. Save leave
    const leave = await Leave.create({
      employee,
      leaveType,
      fromDate,
      toDate,
      reason
    });

    // 6. Build response
    let response = {
      success: true,
      message: "Leave applied successfully, waiting for admin approval",
      leave
    };

    if (limit === Infinity) {
      // WFH
      response.consumed = totalConsumed + reqDays;
      response.balance = "Unlimited";
    } else {
      const newConsumed = totalConsumed + reqDays;
      const balance = limit - newConsumed;
      response.consumed = newConsumed;
      response.balance = balance;
    }

    res.json(response);

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getMonthlyLeaveStatus = async (req, res) => {
  try {
    const { month, year } = req.query; 
    const employee = req.user._id;

    // Fetch all non-rejected leaves (pending + approved)
    const leaves = await Leave.find({
      employee,
      month: Number(month),
      year: Number(year),
      status: { $in: ["pending", "approved"] }  // include pending
    });

    // Initialize status
    const leaveTypes = ["casual", "planned", "sick", "unpaid"];
    const status = {};

    leaveTypes.forEach(type => {
      status[type] = {
        consumed: 0
      };
    });

    // Count days
    leaves.forEach(l => {
      if (status[l.leaveType]) {
        const from = new Date(l.fromDate);
        const to = new Date(l.toDate);
        const days =
          Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

        status[l.leaveType].consumed += days;
      }
    });

    res.json({
      success: true,
      month: Number(month),
      year: Number(year),
      status
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    // find leave first (before updating)
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    // calculate days for this leave
    const from = new Date(leave.fromDate);
    const to = new Date(leave.toDate);
    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    // update status
    leave.status = status;
    await leave.save();

    // update consumed count in User model (example: user.consumedLeaves[leaveType])
    const user = await User.findById(leave.employee);

    if (status === "approved" || status === "pending") {
      // add consumed
      user.consumedLeaves[leave.leaveType] =
        (user.consumedLeaves[leave.leaveType] || 0) + days;
    } else if (status === "rejected") {
      // subtract consumed if previously counted
      user.consumedLeaves[leave.leaveType] =
        Math.max(0, (user.consumedLeaves[leave.leaveType] || 0) - days);
    }

    await user.save();

    res.json({
      success: true,
      message: `Leave ${status}`,
      leave,
      consumedLeaves: user.consumedLeaves
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all pending leaves (admin view)
export const getPendingLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: "pending" })
      .populate("employee", "name email");
    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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

