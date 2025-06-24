import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/ShowJob/showjobSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;