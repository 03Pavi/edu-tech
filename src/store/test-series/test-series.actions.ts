import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTestSeriesList = createAsyncThunk(
  "testSeries/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/test-series");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch test series");
    }
  }
);

export const createTestSeries = createAsyncThunk(
  "testSeries/create",
  async (data: {
    title: string;
    description?: string;
    courseId?: number;
    durationInMinutes: number;
    questions?: any[];
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/test-series", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to create test series");
    }
  }
);
