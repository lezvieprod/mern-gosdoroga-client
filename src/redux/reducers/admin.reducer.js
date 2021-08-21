import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { usersAPI } from "../../api/api";

export const getUsersThunk = createAsyncThunk(
  'sendRegistrationData',
  async (_, { rejectWithValue }) => {
    try {
      return await usersAPI.getUsers();
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
  }
)


const initialState = {
  currentData: {},

  /* == SYSTEM == */
  isFetching: false,
  isFetched: false,
  isReject: false,
  rejectData: {},
}

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearStateAdmin(state, action = {}) {
      state.authData = action.payload
      state.isFetched = false
      state.isReject = false
      state.isFetching = false
      state.rejectData = {}
    },
  },
  extraReducers: {
    [getUsersThunk.pending]: (state) => { state.isFetching = true; state.isFetched = false },
    [getUsersThunk.fulfilled]: (state, action) => { 
      state.currentData = { users: [...action.payload.data], status: action.payload.status}
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
    },
    [getUsersThunk.rejected]: (state, action) => {
      state.rejectData = action.payload
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    }
  }
})

export default admin.reducer
export const { clearStateApp } = admin.actions
