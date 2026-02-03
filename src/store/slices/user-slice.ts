
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = 'user' | 'admin' | 'teacher';

interface UserState {
  name: string;
  role: UserRole;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  name: "",
  role: 'user',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; role?: UserRole }>) => {
      state.name = action.payload.name;
      state.role = action.payload.role || 'user';
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = "";
      state.role = 'user';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
