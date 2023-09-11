import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import jobReducer from "./jobSlice";
import allJobsReducer from "./allJobsSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    jobs: allJobsReducer,
  },
});

export default store;
