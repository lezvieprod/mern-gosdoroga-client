import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../../api/api";

export const sendRegistrationDataThunk = createAsyncThunk(
  'sendRegistrationData',
  async (data, { rejectWithValue }) => {
    try {
      return await authAPI.sendRegistrationData(data);
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const sendLoginDataThunk = createAsyncThunk(
  'sendLoginData',
  async (data, { rejectWithValue }) => {
    try {
      return await authAPI.sendLoginData(data);
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }

  }
)

const initialState = {
  authData: {},
  isFetching: false,
  isFetched: false,
  isReject: false,
  rejectData: {},
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStateAuth(state, action = {}) {
      state.authData = action.payload
      state.isFetched = false
      state.isReject = false
      state.isFetching = false
      state.rejectData = {}
    },
  },
  extraReducers: {
    [sendRegistrationDataThunk.pending]: (state) => { state.isFetching = true; state.isFetched = false },
    [sendRegistrationDataThunk.fulfilled]: (state, action) => {
      state.authData = { ...action.payload.data, status: action.payload.status }
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
    },
    [sendRegistrationDataThunk.rejected]: (state, action) => {
      state.rejectData = action.payload
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    },
    
    [sendLoginDataThunk.pending]: (state) => { state.isFetching = true; state.isFetched = false },
    [sendLoginDataThunk.fulfilled]: (state, action) => {
      state.authData = { ...action.payload.data, status: action.payload.status }
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
    },
    [sendLoginDataThunk.rejected]: (state, action) => {
      state.rejectData = action.payload
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    },
  }
})

export default auth.reducer
export const { clearStateAuth } = auth.actions
