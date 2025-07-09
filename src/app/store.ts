import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/ShowJob/showjobSlice';
import resumesReducer from '../features/ManageResume/resumeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    resumes: resumesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;