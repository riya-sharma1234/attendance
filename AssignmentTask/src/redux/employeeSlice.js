import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios.js";

// CREATE employee
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/user/employee",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // cookie auth
        }
      );
      return res.data; // resolved payload
    } catch (err) {
      return rejectWithValue(err.res?.data?.message);
    }
  }
);

// GET all employees
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/employees", { withCredentials: true });
      return res.data.employees; 
    } catch (err) {
      return rejectWithValue(err.res?.data?.message);
    }
  }
);

// DELETE employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/user/employee/${id}`, { withCredentials: true });
      return id; // return deleted employee id
    } catch (err) {
      return rejectWithValue(err.res?.data?.message);
    }
  }
);

// UPDATE employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/user/employee/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data.employee; // updated employee
    } catch (err) {
      return rejectWithValue(err.res?.data?.message);
    }
  }
);

export const fetchBirthdays = createAsyncThunk(
  "birthday/fetchBirthdays",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/employee/birthday"); // backend route
      if (res.data.success) return res.data.users;
      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // CREATE
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload); // add new employee to state
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(getEmployees.pending, (state) => { state.loading = true; })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteEmployee.pending, (state) => { state.loading = true; })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(emp => emp._id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // UPDATE
      .addCase(updateEmployee.pending, (state) => { state.loading = true; })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.map(emp =>
          emp._id === action.payload._id ? action.payload : emp
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(fetchBirthdays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBirthdays.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchBirthdays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default employeeSlice.reducer;
