import { createSlice } from "@reduxjs/toolkit";
import { fetchActiveBanners, fetchAllBanners, createBanner, updateBanner, deleteBanner } from "./banner.actions";

interface BannerState {
  activeBanners: any[];
  allBanners: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  activeBanners: [],
  allBanners: [],
  isLoading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    clearBannerError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch Active
    builder.addCase(fetchActiveBanners.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchActiveBanners.fulfilled, (state, action) => {
      state.isLoading = false;
      state.activeBanners = action.payload;
    });
    builder.addCase(fetchActiveBanners.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch All
    builder.addCase(fetchAllBanners.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllBanners.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allBanners = action.payload;
    });
    builder.addCase(fetchAllBanners.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createBanner.fulfilled, (state, action) => {
      state.activeBanners.unshift(action.payload);
      state.allBanners.unshift(action.payload);
    });

    // Update
    builder.addCase(updateBanner.fulfilled, (state, action) => {
      const index = state.allBanners.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.allBanners[index] = action.payload;
      }
      const activeIndex = state.activeBanners.findIndex(b => b.id === action.payload.id);
      if (activeIndex !== -1) {
        if (action.payload.isActive) {
          state.activeBanners[activeIndex] = action.payload;
        } else {
          state.activeBanners.splice(activeIndex, 1);
        }
      } else if (action.payload.isActive) {
        state.activeBanners.unshift(action.payload);
      }
    });

    // Delete
    builder.addCase(deleteBanner.fulfilled, (state, action) => {
      state.allBanners = state.allBanners.filter(b => b.id !== action.payload);
      state.activeBanners = state.activeBanners.filter(b => b.id !== action.payload);
    });
  }
});

export const { clearBannerError } = bannerSlice.actions;
export default bannerSlice.reducer;
