import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

// Async Thunk for Registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: { email: string; password: string; name: string; role?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Registration failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/auth/logout");
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
  }
);
