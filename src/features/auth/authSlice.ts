import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../../config/api';
import { csrfFetch } from '@/app/csrfFetch';

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

export const thunkLogin = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: Record<string, string> }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await csrfFetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
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
    const response = await csrfFetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });

    if (response.ok) {
      const data = await response.json();
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
    const response = await csrfFetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
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
      const response = await csrfFetch(`${API_BASE_URL}/auth/`, {
        method: 'GET',
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
    await csrfFetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
    localStorage.removeItem('jwt_token');
    return null;
  } catch (error) {
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
      });
  },
});

export const { setUser, clearErrors } = authSlice.actions;
export default authSlice.reducer;


