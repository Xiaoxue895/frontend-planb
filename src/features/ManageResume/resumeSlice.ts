import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Resume {
  id: number;
  user_id: number;
  title: string | null;
  file_url: string;
  extracted_text: string | null;
  uploaded_at: string;
}

interface ResumeState {
  resumes: Resume[];
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  resumes: [],
  loading: false,
  error: null,
};

// ----------- Async actions -----------

export const uploadResume = createAsyncThunk(
  'resumes/upload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/resumes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.resume as Resume;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Upload failed');
    }
  }
);

export const updateResume = createAsyncThunk(
  'resumes/update',
  async (
    { resumeId, formData }: { resumeId: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`/api/resumes/${resumeId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.resume as Resume;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Update failed');
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resumes/delete',
  async (resumeId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/resumes/${resumeId}`);
      return resumeId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Delete failed');
    }
  }
);

export const fetchUserResumes = createAsyncThunk(
  'resumes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/resumes');
      return res.data.resumes as Resume[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch resumes');
    }
  }
);

// ----------- Slice -----------

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setResumes(state, action: PayloadAction<Resume[]>) {
      state.resumes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.resumes.push(action.payload);
        state.loading = false;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateResume.fulfilled, (state, action) => {
        const index = state.resumes.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.resumes[index] = action.payload;
        }
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.filter(r => r.id !== action.payload);
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Fetch all
      .addCase(fetchUserResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserResumes.fulfilled, (state, action) => {
        state.resumes = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setResumes } = resumeSlice.actions;

export default resumeSlice.reducer;

