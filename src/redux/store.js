import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit"
import auth from "./reducers/auth.reducer"
import app from "./reducers/app.reducer"
import admin from "./reducers/admin.reducer"





const reducers = combineReducers({
  app, auth, admin
})

export default configureStore({
  reducer: reducers
});


