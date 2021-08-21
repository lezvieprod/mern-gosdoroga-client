import { createSlice } from "@reduxjs/toolkit"

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
    setAppIsReady(state, action) {
      state.isAppReady = action.payload
    }
  }
})

export default app.reducer
export const { clearStateApp, setAppIsReady } = app.actions
