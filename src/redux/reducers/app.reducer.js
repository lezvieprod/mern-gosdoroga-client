import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../../api/api";

// export const sendRegistrationDataThunk = createAsyncThunk(
//   'sendRegistrationData',
//   async (data, { rejectWithValue }) => {
//     try {
//       return await authAPI.sendRegistrationData(data);
//     } catch (err) {
//       if (!err.response) {
//         throw err
//       }
//       return rejectWithValue(err.response.data)
//     }
//   }
// )

// export const sendLoginDataThunk = createAsyncThunk(
//   'sendLoginData',
//   async (data, { rejectWithValue }) => {
//     try {
//       return await authAPI.sendLoginData(data);
//     } catch (err) {
//       if (!err.response) {
//         throw err
//       }
//       return rejectWithValue(err.response.data)
//     }

//   }
// )

const initialState = {
  appData: {},
  isAppReady: false,
  isReject: false,
  rejectData: {},
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearStateApp(state, action = {}) {
      state.authData = action.payload
      state.isFetched = false
      state.isReject = false
      state.isFetching = false
      state.rejectData = {}
    },
    // setCurrentUser(state, action) {
    //   state.token = action.payload.token
    //   state.userId = action.payload.userId
    //   state.userLogin = action.payload.userLogin
    //   state.isAuthenticated = true
    // },
    setAppIsReady(state, action) {
      state.isAppReady = action.payload
    }
  },
  extraReducers: {
    // [sendRegistrationDataThunk.pending]: (state) => { state.isFetching = true; state.isFetched = false },
    // [sendRegistrationDataThunk.fulfilled]: (state, action) => {
    //   state.authData = { ...action.payload.data, status: action.payload.status }
    //   state.isReject = false
    //   state.isFetching = false
    //   state.isFetched = true
    // },
    // [sendRegistrationDataThunk.rejected]: (state, action) => {
    //   state.rejectData = action.payload
    //   state.isReject = true
    //   state.isFetching = false
    //   state.isFetched = false
    // },
  }
})

export default app.reducer
export const { clearStateApp, setCurrentUser, setAppIsReady } = app.actions
