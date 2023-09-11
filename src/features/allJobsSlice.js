import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import unauthorizedResponse from "./unauthorizedResponse";

const initFilterState = {
  search: "",
  jobSearchStatus: "all",
  jobSearchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initFilterState,
};

const allJobsSlice = createSlice({
  name: "alljobs",
  initialState,
  reducers: {
    handleSearch: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initFilterState };
    },
    changePage: (state, { payload }) => {
      return { ...state, page: payload };
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      }),
});

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const { page, search, jobSearchStatus, jobSearchType, sort } =
      thunkAPI.getState().jobs;
    let url = `/jobs?status=${jobSearchStatus}&jobType=${jobSearchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `u&search=${search}`;
    }
    try {
      const response = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get("/jobs/stats", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const { handleSearch, changePage, clearFilters, clearAllJobsState } =
  allJobsSlice.actions;
export default allJobsSlice.reducer;
