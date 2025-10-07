// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../utils/axios"; // your axios instance

// // Async login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/user/login", { email, password });
//       if (res.data.success) return res.data.user;
//       return rejectWithValue(res.data.message);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Async logout
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/user/logout");
//       if (res.data.success) return true;
//       return rejectWithValue(res.data.message);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// export const fetchMe = createAsyncThunk(
//   "auth/fetchMe",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/user/me", { withCredentials: true });
//       if (res.data.success) return res.data.user;
//       return rejectWithValue(res.data.message);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     // user: null,
//     user: JSON.parse(localStorage.getItem("user")) || null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Logout
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         localStorage.removeItem("user");
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

      
//       .addCase(fetchMe.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMe.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;        // overwrite with full profile
//       })
//       .addCase(fetchMe.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

// 🔹 Check current session (cookie-based)
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/me", { withCredentials: true });
      if (res.data.success) return res.data.user;
      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔹 Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      // Login → sets cookie on server
      const res = await api.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        const me = await dispatch(fetchMe()).unwrap();
        return me;
      }

      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔹 Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/logout", {}, { withCredentials: true });
      if (res.data.success) return true;
      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // 🔹 no more localStorage
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // ✅ full profile
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // ✅ reset user instantly
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FetchMe
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // ✅ hydrate from cookie
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.user = null; // 🔹 if invalid session, clear user
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
