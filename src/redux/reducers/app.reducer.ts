import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRequestError } from "../../types/error.interface"

interface IState {
  isAppReady: boolean,
  isFetching: boolean,
  isFetched: boolean,
  isReject: boolean,
  rejectData: IRequestError,
}

const initialState = {
  isAppReady: false,
  /* == SYSTEM == */
  isFetching: false,
  isFetched: false,
  isReject: false,
  rejectData: {
    title: '',
    message: ''
  },
} as IState

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearStateApp(state) {
      state.isFetched = false
      state.isReject = false
      state.isFetching = false
      state.rejectData = { title: '', message: '' }
    },
    setAppIsReady(state, action: PayloadAction<boolean>) {
      state.isAppReady = action.payload
    }
  }
})

export default app.reducer
export const { clearStateApp, setAppIsReady } = app.actions
