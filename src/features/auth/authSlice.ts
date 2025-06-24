import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAuthSkipEnabled } from '@/utils/config';

interface User {
  id: number;
  username: string;
  email: string;
  role?: 'user' | 'admin';
  isAdmin?: boolean;
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

// Mock users for testing
const mockUsers = {
  'admin@jobhatch.com': {
    id: 1,
    username: 'Admin User',
    email: 'admin@jobhatch.com',
    role: 'admin' as const,
    isAdmin: true,
    password: 'admin123'
  },
  'user@jobhatch.com': {
    id: 2,
    username: 'Test User',
    email: 'user@jobhatch.com',
    role: 'user' as const,
    isAdmin: false,
    password: 'user123'
  }
};

export const thunkLogin = createAsyncThunk<
  User,
  { email: string; password: string; isAdmin?: boolean },
  { rejectValue: Record<string, string> }
>('auth/login', async (credentials, { rejectWithValue }) => {
  // In testing mode, use mock authentication
  if (isAuthSkipEnabled()) {
    console.log('🧪 Using mock authentication for testing');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = mockUsers[credentials.email as keyof typeof mockUsers];
    if (mockUser && mockUser.password === credentials.password) {
      const { password, ...userWithoutPassword } = mockUser;
      return userWithoutPassword;
    } else {
      return rejectWithValue({ email: 'Invalid email or password' });
    }
  }

  // Real API call for production
  const endpoint = credentials.isAdmin ? '/api/auth/admin/login' : '/api/auth/login';
  try {
    const response = await fetch(endpoint, {
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
    return rejectWithValue({ server: 'Network error. Please check your connection.' });
  }
});

// Admin-specific login thunk
export const thunkAdminLogin = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: Record<string, string> }
>('auth/adminLogin', async (credentials, { rejectWithValue }) => {
  // In testing mode, use mock authentication
  if (isAuthSkipEnabled()) {
    console.log('🔐 Using mock admin authentication for testing');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser = mockUsers[credentials.email as keyof typeof mockUsers];
    if (mockUser && mockUser.password === credentials.password && mockUser.isAdmin) {
      const { password, ...userWithoutPassword } = mockUser;
      return userWithoutPassword;
    } else {
      return rejectWithValue({ 
        email: 'Invalid admin credentials or insufficient permissions' 
      });
    }
  }

  // Real API call for production
  try {
    const response = await fetch('/api/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...credentials, isAdmin: true }),
    });

    if (response.ok) {
      const userData = await response.json();
      return { ...userData, role: 'admin', isAdmin: true };
    } else if (response.status < 500) {
      const data = await response.json();
      return rejectWithValue(data);
    } else {
      return rejectWithValue({ server: 'Admin login failed. Please try again' });
    }
  } catch (error) {
    return rejectWithValue({ server: 'Network error. Please check your connection.' });
  }
});

export const thunkGoogleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: Record<string, string> }
>('auth/googleLogin', async (idToken, { rejectWithValue }) => {
  // In testing mode, simulate Google login
  if (isAuthSkipEnabled()) {
    console.log('🧪 Using mock Google authentication for testing');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: 3,
      username: 'Google Test User',
      email: 'google@test.com',
      role: 'user',
      isAdmin: false
    };
  }

  // Real API call for production
  try {
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
  } catch (error) {
    return rejectWithValue({ server: 'Network error. Please check your connection.' });
  }
});


export const thunkSignup = createAsyncThunk<
  User,
  { email: string; username: string; password: string },
  { rejectValue: Record<string, string> }
>('auth/signup', async (userData, { rejectWithValue }) => {
  // In testing mode, simulate signup
  if (isAuthSkipEnabled()) {
    console.log('🧪 Using mock signup for testing');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: Math.floor(Math.random() * 1000) + 100,
      username: userData.username,
      email: userData.email,
      role: 'user',
      isAdmin: false
    };
  }

  // Real API call for production
  try {
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
  } catch (error) {
    return rejectWithValue({ server: 'Network error. Please check your connection.' });
  }
});

export const thunkAuthenticate = createAsyncThunk<User | null>(
  'auth/authenticate',
  async () => {
    // In testing mode, return null (no persistent auth)
    if (isAuthSkipEnabled()) {
      return null;
    }

    // Real API call for production
    try {
      const response = await fetch('/api/auth/', {
        credentials: 'include',  
      });
      if (response.ok) {
        const data = await response.json();
        return data.errors ? null : data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
);

export const thunkLogout = createAsyncThunk('auth/logout', async () => {
  // In testing mode, just clear state
  if (isAuthSkipEnabled()) {
    console.log('🧪 Mock logout for testing');
    return null;
  }

  // Real API call for production
  try {
    await fetch('/api/auth/logout', {
      credentials: 'include',  
    });
  } catch (error) {
    console.log('Logout error:', error);
  }
  return null;
});

// Action to simulate auth skip for testing
export const skipAuthForTesting = createAsyncThunk<User>(
  'auth/skipAuthForTesting',
  async (_, { rejectWithValue }) => {
    if (!isAuthSkipEnabled()) {
      return rejectWithValue({ server: 'Auth skip not allowed in production' });
    }

    console.log('🧪 Skipping authentication for testing');
    
    return {
      id: 999,
      username: 'Test User',
      email: 'test@jobhatch.com',
      role: 'user',
      isAdmin: false
    };
  }
);

// Action to simulate admin auth skip for testing
export const skipAdminAuthForTesting = createAsyncThunk<User>(
  'auth/skipAdminAuthForTesting',
  async (_, { rejectWithValue }) => {
    if (!isAuthSkipEnabled()) {
      return rejectWithValue({ server: 'Auth skip not allowed in production' });
    }

    console.log('🔐 Skipping admin authentication for testing');
    
    return {
      id: 998,
      username: 'Test Admin',
      email: 'admin@test.com',
      role: 'admin',
      isAdmin: true
    };
  }
);

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
    resetAuthState(state) {
      state.user = null;
      state.status = 'idle';
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

      .addCase(thunkAdminLogin.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })

      .addCase(thunkAdminLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      
      .addCase(thunkAdminLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload ?? { server: 'Admin login failed' };
      })

      .addCase(skipAuthForTesting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })

      .addCase(skipAdminAuthForTesting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })

  },
});

export const { setUser, clearErrors, resetAuthState } = authSlice.actions;
export default authSlice.reducer;

