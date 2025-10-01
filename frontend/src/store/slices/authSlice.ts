import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Role = 'teacher' | 'student' | null;

interface AuthState {
  role: Role;
  name: string | null; // per-tab unique name for students
}

const initialState: AuthState = {
  role: null,
  name: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
    setName(state, action: PayloadAction<string | null>) {
      state.name = action.payload;
    },
    resetAuth() {
      return initialState;
    }
  }
});

export const { setRole, setName, resetAuth } = authSlice.actions;
export default authSlice.reducer;


