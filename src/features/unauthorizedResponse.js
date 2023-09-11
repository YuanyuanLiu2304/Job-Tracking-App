import { clearStore } from "./userSlice";

const unauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized!");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default unauthorizedResponse;
