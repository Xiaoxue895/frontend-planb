import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
  const response = await fetch('/api/auth/login', {
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
});

export const thunkGoogleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: Record<string, string> }
>('auth/googleLogin', async (idToken, { rejectWithValue }) => {
  const response = await fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',  
    body: JSON.stringify({ idToken }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.user; 
  } else if (response.status < 500) {
    const data = await response.json();
    return rejectWithValue(data);
  } else {
    return rejectWithValue({ server: 'Google login failed. Please try again.' });
  }
});


export const thunkSignup = createAsyncThunk<
  User,
  { email: string; username: string; password: string },
  { rejectValue: Record<string, string> }
>('auth/signup', async (userData, { rejectWithValue }) => {
  const response = await fetch('/api/auth/signup', {
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
});

export const thunkAuthenticate = createAsyncThunk<User | null>(
  'auth/authenticate',
  async () => {
    const response = await fetch('/api/auth/', {
      credentials: 'include',  
    });
    if (response.ok) {
      const data = await response.json();
      return data.errors ? null : data;
    }
    return null;
  }
);

export const thunkLogout = createAsyncThunk('auth/logout', async () => {
  await fetch('/api/auth/logout', {
    credentials: 'include',  
  });
  return null;
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
        state.user = action.payload;
      })
      
      .addCase(thunkGoogleLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload ?? { server: 'Google login failed' };
      })

  },
});

export const { setUser, clearErrors } = authSlice.actions;
export default authSlice.reducer;

