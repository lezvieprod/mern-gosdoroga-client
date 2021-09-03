import {createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../models/user.interface";
import { ISystemState } from "../../types/state.interface";
interface ICurrentUser {
  currentUser: Partial<IUser>,
  // token: string,
  // userId: string,
  // userLogin: string,
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
  },
  extraReducers: (builder) => {
    // for (const thunk of [getUserByLoginThunk]) {
    //   builder.addCase(thunk.pending, (state) => { state.isFetching = true; state.isFetched = false })
    //   builder.addCase(thunk.rejected, (state, action) => {
    //     if (action.payload) state.rejectData = { title: action.payload.title, message: action.payload.message }
    //     state.isReject = true
    //     state.isFetching = false
    //     state.isFetched = false
    //   })
    // }

    // builder.addCase(getUserByLoginThunk.fulfilled, (state, action) => {
    //   state.currentUser = { ...action.payload.data, status: action.payload.status }
    //   state.isReject = false
    //   state.isFetching = false
    //   state.isFetched = true
    //   state.isAuthenticated = true
    // })
  }
})

export default auth.reducer
export const { clearStateAuth, setCurrentUser } = auth.actions
