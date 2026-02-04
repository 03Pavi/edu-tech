import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses, fetchCourseById, createCourse, addRecordedClass, addLiveClass, addNote, enrollCourse } from "./course.actions";

interface CourseState {
  courses: any[];
  selectedCourse: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourseError: (state) => {
      state.error = null;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch All
    builder.addCase(fetchCourses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch By Id
    builder.addCase(fetchCourseById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedCourse = action.payload;
    });
    builder.addCase(fetchCourseById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.courses.push(action.payload);
    });

    // Add items (we might want to update selectedCourse if it's the same course)
    builder.addCase(addRecordedClass.fulfilled, (state, action) => {
      if (state.selectedCourse && state.selectedCourse.id === action.payload.course?.id) {
        state.selectedCourse.recordedClasses = [...(state.selectedCourse.recordedClasses || []), action.payload];
      }
    });

    builder.addCase(addLiveClass.fulfilled, (state, action) => {
      if (state.selectedCourse && state.selectedCourse.id === action.payload.course?.id) {
        state.selectedCourse.liveClasses = [...(state.selectedCourse.liveClasses || []), action.payload];
      }
    });

    builder.addCase(addNote.fulfilled, (state, action) => {
      if (state.selectedCourse && state.selectedCourse.id === action.payload.course?.id) {
        state.selectedCourse.notes = [...(state.selectedCourse.notes || []), action.payload];
      }
    });

    builder.addCase(enrollCourse.fulfilled, (state, action) => {
      const { courseId } = action.payload;
      const course = state.courses.find(c => c.id.toString() === courseId);
      if (course) {
        course.isJoined = true;
        course.studentsCount = (course.studentsCount || 0) + 1;
      }
      if (state.selectedCourse && state.selectedCourse.id.toString() === courseId) {
        state.selectedCourse.isJoined = true;
      }
    });
  },
});

export const { clearCourseError, clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
