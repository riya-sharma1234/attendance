import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../utils/axios";
// Get all announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcement/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/announcement/get", { withCredentials: true });
      return res.data.announcements;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create a new announcement (Admin only)
export const createAnnouncement = createAsyncThunk(
  "announcement/create",
  async ({ title, message }, { rejectWithValue }) => {
    try {
      const res = await api.post("/announcement/create",
        { title, message },
        { withCredentials: true }
      );
      return res.data.announcement;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update announcement
export const updateAnnouncement = createAsyncThunk(
  "announcement/update",
  async ({ id, title, message, audience }, { rejectWithValue }) => {
    try {
      const res = await api.put( `/announcement/update/${id}`,
        { title, message, audience },
        { withCredentials: true }
      );
      return res.data.announcement;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete announcement
export const deleteAnnouncement = createAsyncThunk(
  "announcement/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/announcement/delete/${id}`, { withCredentials: true });
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ================= Slice ==================

const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    announcements: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearAnnouncementError: (state) => {
      state.error = null;
    },
    clearAnnouncementMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements.unshift(action.payload); // newest first
        state.successMessage = "Announcement created successfully";
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.announcements.findIndex(a => a._id === action.payload._id);
        if (index !== -1) state.announcements[index] = action.payload;
        state.successMessage = "Announcement updated successfully";
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = state.announcements.filter(a => a._id !== action.payload.id);
        state.successMessage = action.payload.message;
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnnouncementError, clearAnnouncementMessage } = announcementSlice.actions;
export default announcementSlice.reducer;
