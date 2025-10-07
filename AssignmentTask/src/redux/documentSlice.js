
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

// Upload new document (with formData)
export const uploadDocument = createAsyncThunk(
  "documents/uploadDocument",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/document/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) return res.data.document;
      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch documents visible to logged-in user
export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/document/get", { withCredentials: true });
      if (res.data.success) return res.data.documents;
      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete document (admin or owner only)
export const deleteDocument = createAsyncThunk(
  "documents/deleteDocument",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/document/delete/${id}`, { withCredentials: true });
      if (res.data.success) return id;
      return rejectWithValue(res.data.message);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const documentSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearDocumentError: (state) => {
      state.error = null;
    },
    clearDocumentMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPLOAD */
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Document uploaded successfully";
        state.documents.push(action.payload);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Document deleted successfully";
        state.documents = state.documents.filter((doc) => doc._id !== action.payload);
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDocumentError, clearDocumentMessage } = documentSlice.actions;
export default documentSlice.reducer;
