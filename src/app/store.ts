import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/ShowJob/showjobSlice';
import resumeReducer from '../features/ManageResume/resumeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    resumes:resumeReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;