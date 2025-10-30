import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch employee data from API
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, thunkAPI) => {
    console.log("🔄 fetchEmployees thunk is running...");  // <--- Add this
    try {
      const response = await axios.get("/api/employees");
      console.log("✅ API Response:", response.data);       // <--- Add this
      return response.data;
    } catch (error) {
      console.error("❌ API Error:", error);                // <--- Add this
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching employees");
    }
  }
);

const punchSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch employees";
      });
  },
});

export default punchSlice.reducer;
