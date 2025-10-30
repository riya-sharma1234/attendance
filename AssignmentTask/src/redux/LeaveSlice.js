
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";


export const fetchLeaveBalances = createAsyncThunk(
  "leave/fetchLeaveBalances",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/leaves/leave-balances");
      return res.data; // { consumedLeaves: {}, balance: {} }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const applyLeave = createAsyncThunk(
  "leave/applyLeave",
  async (leaveData, { rejectWithValue }) => {
    try {
      const res = await api.post("/leaves/apply", leaveData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to apply leave" });
    }
  }
);

// 2. Get monthly leave status
export const getMonthlyLeaveStatus = createAsyncThunk(
  "leave/getMonthlyLeaveStatus",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/leaves/monthly-status?month=${month}&year=${year}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch status" });
    }
  }
);

// 3. Update leave status (approve/reject)
export const updateLeaveStatus = createAsyncThunk(
  "leave/updateLeaveStatus",
  async ({ leaveId, status }, { rejectWithValue }) => {
    try {
      const res = await api.post("/leaves/update-status", { leaveId, status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to update leave status" });
    }
  }
);

// 4. Get pending leaves (admin)
export const getPendingLeaves = createAsyncThunk(
  "leave/getPendingLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/leaves/pending");
      return res.data.leaves;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch pending leaves" });
    }
  }
);

// 5. Get leaves by status
export const getLeavesByStatus = createAsyncThunk(
  "leave/getLeavesByStatus",
  async ({ status }, { rejectWithValue }) => {
    try {
      const res = await api.post("/leaves/leave-status", { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch leaves" });
    }
  }
);

export const getLeavesByStatusbyid = createAsyncThunk(
  "leave/getLeavesByStatusbyid",
  async ({ status, employeeId }, { rejectWithValue }) => {
    try {
      // const res = await api.post("/leaves/leave-status", { status, employeeId });
      const res = await api.get(
        `/leaves/status?status=${status}${employeeId ? `&employeeId=${employeeId}` : ""}`
      );
      if (res.data.success) {
        return res.data.leaves; // populated leaves
      }
      return rejectWithValue(res.data.message || "Failed to fetch leaves");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// --- Set Leave Limits Thunk ---
// export const setLeaveLimits = createAsyncThunk(
//   "leave/setLeaveLimits",
//   async ({ userId, leaveLimits }, { rejectWithValue }) => {
//     try {
//       const res = await api.put(
//         "/leaves/set-limits",
//         { userId, leaveLimits },
//         { withCredentials: true }
//       );
//       if (res.data.success)
//         return {
//           userName: res.data.userName || "",
//           leaveLimits: res.data.leaveLimits,
//           message: res.data.message,
//         };
//       return rejectWithValue(res.data.message);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// --- Slice ---
export const setLeaveLimits = createAsyncThunk(
  "leave/setLeaveLimits",
  async ({ userId, leaveLimits }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        "/leaves/set-limits",
        { userId, leaveLimits },
        { withCredentials: true }
      );

      if (res.data.success)
        return {
          userId,
          leaveLimits: res.data.leaveLimits,
          message: res.data.message,
        };

      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchLeaves = createAsyncThunk(
  "leave/fetchLeaves",
  async (filters, { rejectWithValue }) => {
    try {
      const res = await api.get("/leaves/filter", { params: filters });
      return res.data; // { leaves: [], status: { casual: { consumed }, ... } }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    employees: [],
    summary: {},
    leaves: [],
    leaveLimits: {},
    pendingLeaves: [],
    statusByMonth: {},
    consumedLeaves: {},
    balance: {},
    selectedUser: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearLeaveError: (state) => {
      state.error = null;
    },
    clearLeaveState: (state) => {
      state.leaves = [];
      state.pendingLeaves = [];
      state.statusByMonth = {};
      state.consumedLeaves = {};
      state.balance = {};
      state.loading = false;
      state.error = null;
    },
    clearLeaveMessage: (state) => {
      state.message = null;
    },
    setSelectedUser: (state, action) => { state.selectedUser = action.payload; },
  },
  extraReducers: (builder) => {
    builder

      // Fetch Leave Balances
      .addCase(fetchLeaveBalances.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchLeaveBalances.fulfilled, (state, action) => {
        state.loading = false;
        state.consumedLeaves = action.payload.consumedLeaves;
        state.balance = action.payload.balance;
      })
      .addCase(fetchLeaveBalances.rejected, (state, action) => { state.loading = false; state.error = action.payload; })


      // --- Apply Leave ---
      .addCase(applyLeave.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(applyLeave.fulfilled, (state, action) => { state.loading = false; state.leaves.push(action.payload.leave); })
      .addCase(applyLeave.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // --- Monthly Status ---
      .addCase(getMonthlyLeaveStatus.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getMonthlyLeaveStatus.fulfilled, (state, action) => { state.loading = false; state.leaves = action.payload.leaves || []; state.statusByMonth = action.payload.status; })
      .addCase(getMonthlyLeaveStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // --- Update Leave Status ---
      .addCase(updateLeaveStatus.pending, (state) => { state.loading = true; state.error = null; })
      // .addCase(updateLeaveStatus.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const index = state.leaves.findIndex(l => l._id === action.payload.leave._id);
      //   if (index !== -1) state.leaves[index] = action.payload.leave;
      // })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the leave from pendingLeaves once approved/rejected
        state.pendingLeaves = state.pendingLeaves.filter(
          (l) => l._id !== action.payload.leave._id
        );
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // --- Get Pending Leaves ---
      .addCase(getPendingLeaves.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getPendingLeaves.fulfilled, (state, action) => { state.loading = false; state.pendingLeaves = action.payload; })
      .addCase(getPendingLeaves.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // --- Get Leaves By Status ---
      .addCase(getLeavesByStatus.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getLeavesByStatus.fulfilled, (state, action) => { state.loading = false; state.leaves = action.payload.leaves; })
      .addCase(getLeavesByStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(getLeavesByStatusbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeavesByStatusbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(getLeavesByStatusbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // setLeaveLimits
      .addCase(setLeaveLimits.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(setLeaveLimits.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        // Update leaveLimits in employees array
        if (state.employees) {
          const index = state.employees.findIndex(
            (emp) => emp._id.toString() === action.payload.userId.toString()
          );
          if (index !== -1) {
            state.employees[index].leaveLimits = action.payload.leaveLimits;
          }
        }

        // Update selectedUser if it matches
        if (
          state.selectedUser &&
          state.selectedUser._id.toString() === action.payload.userId.toString()
        ) {
          state.selectedUser.leaveLimits = action.payload.leaveLimits;
        }
      })
      .addCase(setLeaveLimits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload.leaves || [];
        state.summary = action.payload.status || {};
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLeaveError, clearLeaveState, clearLeaveMessage, setSelectedUser } = leaveSlice.actions;
export default leaveSlice.reducer;
