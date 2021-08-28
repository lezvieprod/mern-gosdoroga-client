import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI, usersAPI } from "../../api/api";
import { IUser } from "../../models/user.interface";
import { ILoginSubmit, IRegSubmit } from "../../types/auth.interface";
import { IRequestError } from "../../types/error.interface";
import { ISystemState } from "../../types/state.interface";
import { isApiError } from "../../utils/fetch";

export const sendRegistrationDataThunk = createAsyncThunk<any, IRegSubmit, { rejectValue: IRequestError }>(
  'auth/sendRegistrationData',
  async (data, { rejectWithValue }) => {
    try {
      return await authAPI.sendRegistrationData(data);
    } catch ({ data }) {
      if (isApiError(data)) {
        return rejectWithValue((data) as IRequestError)
      }
      throw data
    }
  }
)

export const sendLoginDataThunk = createAsyncThunk<any, ILoginSubmit, { rejectValue: IRequestError }>(
  'auth/sendLoginData',
  async (data, { rejectWithValue }) => {
    try {
      return await authAPI.sendLoginData(data);
    } catch ({ data }) {
      if (isApiError(data)) {
        return rejectWithValue((data) as IRequestError)
      }
      throw data
    }
  }
)

export const getUserByLoginThunk = createAsyncThunk<any, string, { rejectValue: IRequestError }>(
  'auth/getUserByLogin',
  async (data, { rejectWithValue }) => {
    try {
      return await usersAPI.getUserByLogin(data);
    } catch ({ data }) {
      if (isApiError(data)) {
        return rejectWithValue((data) as IRequestError)
      }
      throw data
    }
  }
)

interface ICurrentUser {
  token: string,
  userId: string,
  userLogin: string,
}

interface IState extends ISystemState {
  currentUser: IUser,
  isAuthenticated: boolean,
  token: string,
  userId: string,
  userLogin: string
}

const initialState = {
  currentUser: {},
  isAuthenticated: false,
  token: '',
  userId: '',
  userLogin: '',
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
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.userLogin = action.payload.userLogin
    },
  },
  extraReducers: (builder) => {

    /* 
      *=== Регистрация ===*
    */
    builder.addCase(sendRegistrationDataThunk.pending, (state) => {
      state.isFetching = true
      state.isFetched = false
    })
    builder.addCase(sendRegistrationDataThunk.fulfilled, (state) => {
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
    })
    builder.addCase(sendRegistrationDataThunk.rejected, (state, action) => {
      if (action.payload) state.rejectData = { title: action.payload.title, message: action.payload.message }
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    })

    /* 
      *=== Авторизация ===*
    */
    builder.addCase(sendLoginDataThunk.pending, (state) => {
      state.isFetching = true
      state.isFetched = false
    })
    builder.addCase(sendLoginDataThunk.fulfilled, (state) => {
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
    })
    builder.addCase(sendLoginDataThunk.rejected, (state, action) => {
      if (action.payload) state.rejectData = { title: action.payload.title, message: action.payload.message }
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    })

    /* 
      *=== Получение пользователя по логину===* 
      = возможно необходимо переместить в другой reducer
    */
    builder.addCase(getUserByLoginThunk.pending, (state) => {
      state.isFetching = true
      state.isFetched = false
    })
    builder.addCase(getUserByLoginThunk.fulfilled, (state, action) => {
      state.currentUser = { ...action.payload.data, status: action.payload.status }
      state.isReject = false
      state.isFetching = false
      state.isFetched = true
      state.isAuthenticated = true
    })
    builder.addCase(getUserByLoginThunk.rejected, (state, action) => {
      if (action.payload) state.rejectData = { title: action.payload.title, message: action.payload.message }
      state.isReject = true
      state.isFetching = false
      state.isFetched = false
    })
  }
})

export default auth.reducer
export const { clearStateAuth, setCurrentUser } = auth.actions
