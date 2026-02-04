import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchActiveBanners = createAsyncThunk(
  "cms/fetchActiveBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/banners");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch banners");
    }
  }
);

export const fetchAllBanners = createAsyncThunk(
  "cms/fetchAllBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/banners?all=true");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch all banners");
    }
  }
);

export const createBanner = createAsyncThunk(
  "cms/createBanner",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/banners", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to create banner");
    }
  }
);

export const updateBanner = createAsyncThunk(
  "cms/updateBanner",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/banners/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to update banner");
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "cms/deleteBanner",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/banners/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to delete banner");
    }
  }
);
