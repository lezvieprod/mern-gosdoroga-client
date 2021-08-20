import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI, usersAPI } from "../../api/api";

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

export const getUserByLoginThunk = createAsyncThunk(
  'getUserByLogin',
  async (data, { rejectWithValue }) => {
    try {
      return await usersAPI.getUserByLogin(data);
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
  currentUser: {},
  isAuthenticated: false,
  token: null,
  userId: null,
  userLogin: '',
  /* == SYSTEM == */
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
    setCurrentUser(state, action) {
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.userLogin = action.payload.userLogin
      // state.isAuthenticated = true.
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
    // time
    [getUserByLoginThunk.pending]: (state) => { state.isFetching = true; state.isFetched = false },
    [getUserByLoginThunk.fulfilled]: (state, action) => {
      state.currentUser = { ...action.payload.data, status: action.payload.status }
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
      state.isAuthenticated = true
    },
    [getUserByLoginThunk.rejected]: (state, action) => {
      state.rejectData = action.payload
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    },
  }
})

export default auth.reducer
export const { clearStateAuth, setCurrentUser} = auth.actions
