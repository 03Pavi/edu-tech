import { createSlice } from "@reduxjs/toolkit";
import { fetchTestSeriesList, createTestSeries } from "./test-series.actions";

interface TestSeriesState {
  list: any[];
  selectedItem: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TestSeriesState = {
  list: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

const testSeriesSlice = createSlice({
  name: "testSeries",
  initialState,
  reducers: {
    clearTestSeriesError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchTestSeriesList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTestSeriesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchTestSeriesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createTestSeries.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  }
});

export const { clearTestSeriesError } = testSeriesSlice.actions;
export default testSeriesSlice.reducer;
