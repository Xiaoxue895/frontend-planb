import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../../config/api';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: Record<string, string> | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  errors: null,
};

// Helper function to get CSRF token from cookies
const getCSRFTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf_token') {
      return value;
    }
  }
  return null;
};

// Helper function to ensure CSRF token is available
const ensureCSRFToken = async (): Promise<void> => {
  const token = getCSRFTokenFromCookie();
  if (!token) {
    // Get CSRF token by making a request that will set the cookie
    await fetch(`${API_BASE_URL}/auth/csrf/restore`, {
      credentials: 'include',
    });
  }
};

export const thunkLogin = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: Record<string, string> }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    // Ensure CSRF token is available
    await ensureCSRFToken();
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status < 500) {
      const data = await response.json();
      return rejectWithValue(data);
    } else {
      return rejectWithValue({ server: 'Something went wrong. Please try again' });
    }
  } catch (error) {
    return rejectWithValue({ server: 'Network error. Please try again.' });
  }
});

export const thunkGoogleLogin = createAsyncThunk<
  { user: User; token: string },
  string,
  { rejectValue: Record<string, string> }
>('auth/googleLogin', async (idToken, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  
      body: JSON.stringify({ idToken }),
    });

    if (response.ok) {
      const data = await response.json();
      // Store the JWT token if provided
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
      }
      return data; 
    } else if (response.status < 500) {
      const data = await response.json();
      return rejectWithValue(data);
    } else {
      return rejectWithValue({ server: 'Google login failed. Please try again.' });
    }
  } catch (error) {
    return rejectWithValue({ server: 'Network error. Please try again.' });
  }
});

export const thunkSignup = createAsyncThunk<
  User,
  { email: string; username: string; password: string },
  { rejectValue: Record<string, string> }
>('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    // Ensure CSRF token is available
    await ensureCSRFToken();
    
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status < 500) {
      const data = await response.json();
      return rejectWithValue(data);
    } else {
      return rejectWithValue({ server: 'Something went wrong. Please try again' });
    }
  } catch (error) {
    return rejectWithValue({ server: 'Network error. Please try again.' });
  }
});

export const thunkAuthenticate = createAsyncThunk<User | null>(
  'auth/authenticate',
  async () => {
    try {
      console.log('Authenticating against:', `${API_BASE_URL}/auth/`);
      const response = await fetch(`${API_BASE_URL}/auth/`, {
        credentials: 'include',  
      });
      console.log('Authentication response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Authentication response data:', data);
        return data.errors ? null : data;
      }
      return null;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }
);

export const thunkLogout = createAsyncThunk('auth/logout', async () => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      credentials: 'include',  
    });
    // Clear any stored JWT token
    localStorage.removeItem('jwt_token');
    return null;
  } catch (error) {
    // Even if logout fails on server, clear local state
    localStorage.removeItem('jwt_token');
    return null;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.errors = null;
    },
    clearErrors(state) {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkLogin.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })
      .addCase(thunkLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(thunkLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload ?? { server: 'Login failed' };
      })

      .addCase(thunkSignup.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })
      .addCase(thunkSignup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(thunkSignup.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload ?? { server: 'Signup failed' };
      })

      .addCase(thunkAuthenticate.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(thunkLogout.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      })

      .addCase(thunkGoogleLogin.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })

      .addCase(thunkGoogleLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      
      .addCase(thunkGoogleLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload ?? { server: 'Google login failed' };
      })

  },
});

export const { setUser, clearErrors } = authSlice.actions;
export default authSlice.reducer;

