import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../models/user.interface";
import { ISystemState } from "../../types/state.interface";
interface ICurrentUser {
  currentUser: Partial<IUser>,
}

interface IState extends ISystemState {
  currentUser: Partial<IUser>,
  isAuthenticated: boolean,

}

const initialState = {
  currentUser: {},
  isAuthenticated: false,
  
  /* == SYSTEM == */
  isFetching: false,
  isFetched: false,
  isReject: false,
  rejectData: {
    title: '',
    message: ''
  },
} as IState

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStateAuth(state) {
      state.isFetched = false
      state.isReject = false
      state.isFetching = false
      state.rejectData = { title: '', message: '' }
    },
    setCurrentUser(state, action: PayloadAction<ICurrentUser>) {
      state.currentUser = action.payload.currentUser
      state.isAuthenticated = true
    },
  }
})

export default auth.reducer
export const { clearStateAuth, setCurrentUser } = auth.actions
