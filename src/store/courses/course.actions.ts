import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/courses");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch courses");
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/courses/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch course details");
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (courseData: { title: string; description: string; price: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/courses", courseData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to create course");
    }
  }
);

export const addRecordedClass = createAsyncThunk(
  "courses/addRecorded",
  async ({ courseId, data }: { courseId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/recorded`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to add recorded class");
    }
  }
);

export const addLiveClass = createAsyncThunk(
  "courses/addLive",
  async ({ courseId, data }: { courseId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/live`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to add live class");
    }
  }
);

export const addNote = createAsyncThunk(
  "courses/addNote",
  async ({ courseId, data }: { courseId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/notes`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to add note");
    }
  }
);

export const enrollCourse = createAsyncThunk(
  "courses/enroll",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/enroll`);
      return { courseId, message: response.data.message };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to enroll in course");
    }
  }
);
