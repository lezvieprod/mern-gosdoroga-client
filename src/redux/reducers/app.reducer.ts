import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISystemState } from "../../types/state.interface"

interface IState extends ISystemState {
  currentData: any[]
  isAppReady: boolean,
}

const initialState = {
  currentData: {},
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
  },
  
})

export default app.reducer
export const { clearStateApp, setAppIsReady } = app.actions
