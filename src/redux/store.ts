import { combineReducers, configureStore } from "@reduxjs/toolkit"
import auth from "./reducers/auth.reducer"
import app from "./reducers/app.reducer"
import admin from "./reducers/admin.reducer"

const reducers = combineReducers({
  app, auth, admin
})

const store = configureStore({
  reducer: reducers
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
