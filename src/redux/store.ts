import { combineReducers, configureStore } from "@reduxjs/toolkit"
import auth from "./reducers/auth.reducer"
import app from "./reducers/app.reducer"
import { queryApi } from "./api/api"

const reducers = combineReducers({
  app, 
  auth, 
  [queryApi.reducerPath]: queryApi.reducer,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(queryApi.middleware),
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
