import { createSlice } from "@reduxjs/toolkit"

interface IState {
  currentData: any[],
  isFetched: boolean,
  isFetching: boolean
}

const initialState = {
  currentData: [],
  isFetched: false,
  isFetching: false,
} as IState

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearStateAdmin(state) {
      state.currentData = []
      state.isFetched = false
      state.isFetching = false
    },
    setIsFetching(state, { payload }) { state.isFetching = payload }
  }

})

export default admin.reducer
export const { clearStateAdmin, setIsFetching } = admin.actions
