import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "@/app/api/domain/auth/user-role.enum";
import { loginUser, registerUser, logoutUser } from "./auth.actions";

interface UserState {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  role: UserRole.STUDENT,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: number; name: string; email: string; role: UserRole }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.role = UserRole.STUDENT;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      // Note: We don't necessarily set isAuthenticated=true here unless the API explicitly logs them in.
      // Based on previous implementation, it required a separate login call.
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.id = 0;
      state.name = "";
      state.email = "";
      state.role = UserRole.STUDENT;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser, clearError, clearUser } = userSlice.actions;
export default userSlice.reducer;
