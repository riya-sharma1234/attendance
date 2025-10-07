// src/redux/attendanceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios"

// Punch In
export const punchIn = createAsyncThunk(
  "attendance/punchIn",
  async ({ userId, lat, lon }, { rejectWithValue }) => {
    try {
      const res = await api.post("/attendance/punch-in", { userId, lat, lon });
      return res.data.attendance;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Punch-in failed");
    }
  }
);

// Punch Out
export const punchOut = createAsyncThunk(
  "attendance/punchOut",
  async ({ userId, lat, lon }, { rejectWithValue }) => {
    try {
      const res = await api.post("/attendance/punch-out", { userId, lat, lon });
      return res.data.attendance;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Punch-out failed");
    }
  }
);

// Get Today Attendance
export const getTodayAttendance = createAsyncThunk(
  "attendance/getToday",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get("/attendance/today", { params: { userId } });
      return res.data.attendance;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch attendance");
    }
  }
);


export const getAttendanceByDateRange = createAsyncThunk(
  "attendance/getByDateRange",
  async ({ userId, startDate, endDate }, { rejectWithValue }) => {
    try {
      if (!userId || !startDate || !endDate) {
        return rejectWithValue("userId, startDate and endDate are required");
      }

      const response = await api.get(`/attendance/range`, {
        params: { userId, startDate, endDate },
      });

      return response.data.attendance; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch attendance range"
      );
    }
  }
);



export const getMonthlyReport = createAsyncThunk(
  "attendance/getMonthlyReport",
  async ({ userId, month, year }, { rejectWithValue }) => {
    try {
      const res = await api.get("/attendance/report", {
        params: { userId, month, year },
      });
      return res.data.report;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch monthly report");
    }
  }
);


const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    punchData: null,
    attendanceHistory: [], 
    monthlyReport: [], 
    loading: false,
    error: null,
  },
  reducers: {
    resetAttendance: (state) => {
      state.punchData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Punch In
      .addCase(punchIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(punchIn.fulfilled, (state, action) => {
        state.loading = false;
        state.punchData = action.payload;
        state.error = null;
      })
      .addCase(punchIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Punch Out
      .addCase(punchOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(punchOut.fulfilled, (state, action) => {
        state.loading = false;
        state.punchData = action.payload;
        state.error = null;
      })
      .addCase(punchOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Today
      .addCase(getTodayAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodayAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.punchData = action.payload;
        state.error = null;
      })
      .addCase(getTodayAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(getAttendanceByDateRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttendanceByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceHistory = action.payload;
        state.error = null;
      })
      .addCase(getAttendanceByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Monthly Report
      .addCase(getMonthlyReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyReport = action.payload;
        state.error = null;
      })
      .addCase(getMonthlyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
  })

export const { resetAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
