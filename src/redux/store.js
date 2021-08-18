import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit"
import auth from "./reducers/auth.reducer"
import app from "./reducers/app.reducer"




const reducers = combineReducers({
  app, auth
})

export default configureStore({
  reducer: reducers
});


