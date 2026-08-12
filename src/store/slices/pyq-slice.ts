import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PyqExamCategory, PyqSection, PyqShiftPaper, PyqScrapedData } from '@/features/test-series/model/test-types';

export interface PyqState {
  exams: PyqExamCategory[];
  selectedExamSlug: string;
  sections: PyqSection[];
  papers: PyqShiftPaper[];
  cglTitle: string;
  cglPapers: PyqShiftPaper[];
  cglYears: number[];
  yearBreakdown: any;
  tierPapers: PyqShiftPaper[];
  loadingExams: boolean;
  loadingPapers: boolean;
  loadingCgl: boolean;
  error: string | null;
  expandedYear: string | null;
  selectedYearTag: string;
  searchTerm: string;
}

const initialState: PyqState = {
  exams: [],
  selectedExamSlug: 'ssc-cgl',
  sections: [],
  papers: [],
  cglTitle: 'SSC CGL Previous Year Question Papers',
  cglPapers: [],
  cglYears: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019],
  yearBreakdown: null,
  tierPapers: [],
  loadingExams: false,
  loadingPapers: false,
  loadingCgl: false,
  error: null,
  expandedYear: null,
  selectedYearTag: 'All',
  searchTerm: '',
};

// Async Thunk: Fetch SSC CGL PYQs
export const fetchSscCglPyqsThunk = createAsyncThunk(
  'pyq/fetchSscCglPyqs',
  async (_: void, { rejectWithValue }: any) => {
    try {
      const res = await fetch('/api/pyq', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Failed to fetch PYQ data: ${res.statusText}`);
      }
      const json = await res.json();
      const data: PyqScrapedData = json.data || json;

      const papers: PyqShiftPaper[] = [];

      if (data.sections && Array.isArray(data.sections)) {
        data.sections.forEach((section) => {
          if (section.tables && Array.isArray(section.tables)) {
            section.tables.forEach((table) => {
              if (table.rows && Array.isArray(table.rows)) {
                table.rows.forEach((row) => {
                  papers.push({
                    ...row,
                    sectionHeading: section.heading,
                  });
                });
              }
            });
          }
        });
      }

      return {
        title: data.title || 'SSC CGL Previous Year Question Papers',
        papers,
      };
    } catch (error: any) {
      console.error('Error fetching SSC CGL PYQ:', error);
      return rejectWithValue(error.message || 'Error fetching SSC CGL PYQ');
    }
  }
);

// Async Thunk: Fetch Exams List
export const fetchExamsThunk = createAsyncThunk(
  'pyq/fetchExams',
  async (_: void, { rejectWithValue }: any) => {
    try {
      const res = await fetch('/api/pyq/exams/years', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch exams list');
      const json = await res.json();
      return json.data?.exams || [];
    } catch (err: any) {
      console.error('Error fetching exams:', err);
      return rejectWithValue(err.message || 'Error fetching exams');
    }
  }
);
export const fetchSscExamsThunk = fetchExamsThunk;

// Async Thunk: Fetch SSC CGL Years
export const fetchSscCglYearsThunk = createAsyncThunk(
  'pyq/fetchSscCglYears',
  async (_: void, { rejectWithValue }: any) => {
    try {
      const res = await fetch('/api/pyq/years', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch years');
      const json = await res.json();
      return json.data?.years || [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];
    } catch (error: any) {
      console.error('Error fetching SSC CGL years:', error);
      return rejectWithValue(error.message || 'Error fetching SSC CGL years');
    }
  }
);

// Async Thunk: Fetch SSC CGL Year Breakdown
export const fetchSscCglYearBreakdownThunk = createAsyncThunk(
  'pyq/fetchSscCglYearBreakdown',
  async (year: number, { rejectWithValue }: any) => {
    try {
      const res = await fetch(`/api/pyq/${year}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch breakdown for year ${year}`);
      const json = await res.json();
      return json.data;
    } catch (error: any) {
      console.error(`Error fetching year ${year} breakdown:`, error);
      return rejectWithValue(error.message || `Error fetching breakdown for year ${year}`);
    }
  }
);

// Async Thunk: Fetch SSC CGL Tier Papers
export const fetchSscCglTierPapersThunk = createAsyncThunk(
  'pyq/fetchSscCglTierPapers',
  async ({ year, tier }: { year: number; tier: string }, { rejectWithValue }: any) => {
    try {
      const res = await fetch(`/api/pyq/${year}/${tier}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch ${tier} papers for ${year}`);
      const json = await res.json();
      return json.data?.papers || json.papers || [];
    } catch (error: any) {
      console.error(`Error fetching ${tier} papers for ${year}:`, error);
      return rejectWithValue(error.message || `Error fetching ${tier} papers for ${year}`);
    }
  }
);

// Async Thunk: Fetch Papers for Selected Exam
export const fetchPapersThunk = createAsyncThunk(
  'pyq/fetchPapers',
  async (examSlug: string, { rejectWithValue }: any) => {
    try {
      const res = await fetch(`/api/pyq/exams/${examSlug}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch question papers');
      const json = await res.json();
      const rawData = json.data || json;
      return {
        title: rawData.title || '',
        sections: rawData.sections || [],
        papers: rawData.papers || [],
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Error fetching papers');
    }
  }
);

const pyqSlice = createSlice({
  name: 'pyq',
  initialState,
  reducers: {
    setSelectedExamSlug: (state: PyqState, action: PayloadAction<string>) => {
      state.selectedExamSlug = action.payload;
      state.selectedYearTag = 'All';
      state.expandedYear = null;
    },
    setSelectedYearTag: (state: PyqState, action: PayloadAction<string>) => {
      state.selectedYearTag = action.payload;
      if (action.payload !== 'All') {
        state.expandedYear = action.payload;
      }
    },
    setExpandedYear: (state: PyqState, action: PayloadAction<string | null>) => {
      state.expandedYear = action.payload;
    },
    setSearchTerm: (state: PyqState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearError: (state: PyqState) => {
      state.error = null;
    },
  },
  extraReducers: (builder: any) => {
    // Fetch SSC CGL PYQs
    builder
      .addCase(fetchSscCglPyqsThunk.pending, (state: PyqState) => {
        state.loadingCgl = true;
        state.error = null;
      })
      .addCase(fetchSscCglPyqsThunk.fulfilled, (state: PyqState, action: any) => {
        state.loadingCgl = false;
        state.cglTitle = action.payload.title;
        state.cglPapers = action.payload.papers;
      })
      .addCase(fetchSscCglPyqsThunk.rejected, (state: PyqState, action: any) => {
        state.loadingCgl = false;
        state.error = action.payload as string;
      });

    // Fetch Exams
    builder
      .addCase(fetchExamsThunk.pending, (state: PyqState) => {
        state.loadingExams = true;
        state.error = null;
      })
      .addCase(fetchExamsThunk.fulfilled, (state: PyqState, action: any) => {
        state.loadingExams = false;
        state.exams = action.payload;
      })
      .addCase(fetchExamsThunk.rejected, (state: PyqState, action: any) => {
        state.loadingExams = false;
        state.error = action.payload as string;
      });

    // Fetch Years
    builder
      .addCase(fetchSscCglYearsThunk.fulfilled, (state: PyqState, action: any) => {
        state.cglYears = action.payload;
      });

    // Fetch Year Breakdown
    builder
      .addCase(fetchSscCglYearBreakdownThunk.fulfilled, (state: PyqState, action: any) => {
        state.yearBreakdown = action.payload;
      });

    // Fetch Tier Papers
    builder
      .addCase(fetchSscCglTierPapersThunk.fulfilled, (state: PyqState, action: any) => {
        state.tierPapers = action.payload;
      });

    // Fetch Papers
    builder
      .addCase(fetchPapersThunk.pending, (state: PyqState) => {
        state.loadingPapers = true;
        state.error = null;
      })
      .addCase(fetchPapersThunk.fulfilled, (state: PyqState, action: any) => {
        state.loadingPapers = false;
        state.sections = action.payload.sections;
        state.papers = action.payload.papers;
      })
      .addCase(fetchPapersThunk.rejected, (state: PyqState, action: any) => {
        state.loadingPapers = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedExamSlug,
  setSelectedYearTag,
  setExpandedYear,
  setSearchTerm,
  clearError,
} = pyqSlice.actions;

export default pyqSlice.reducer;
