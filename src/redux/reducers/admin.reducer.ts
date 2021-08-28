import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { usersAPI } from "../../api/api";
import { IRequestError } from "../../types/error.interface";
import { ISystemState } from "../../types/state.interface";
import { isApiError } from "../../utils/fetch";

export const getUsersThunk = createAsyncThunk<any, string, { rejectValue: IRequestError }>(
  'admin/getUsers',
  async (token, { rejectWithValue }) => {
    try {
      return await usersAPI.getUsers(token);
    } catch ({ data }) {
      if (isApiError(data)) {
        return rejectWithValue((data) as IRequestError)
      }
      throw data
    }
  }
)

interface IState extends ISystemState {
  currentData: any[] // ?
}

const initialState = {
  currentData: [],

  /* == SYSTEM == */
  isFetching: false,
  isFetched: false,
  isReject: false,
  rejectData: {
    title: '',
    message: ''
  },
} as IState

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearStateAdmin(state) {
      state.currentData = []
      state.isFetched = false
      state.isReject = false
      state.isFetching = false
      state.rejectData = { title: '', message: '' }
    },
  },
  extraReducers: (builder) => {

    builder.addCase(getUsersThunk.pending, (state) => {
      state.isFetching = true
      state.isFetched = false
    })
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.currentData = action.payload.data
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
    })
    builder.addCase(getUsersThunk.rejected, (state, action) => {
      if (action.payload) state.rejectData = { title: action.payload.title, message: action.payload.message }
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    })

  }
})

export default admin.reducer
export const { clearStateAdmin } = admin.actions
