import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// import slice module
import userSlice from "./Modules/userSlice";
import userPageSlice from "./Modules/userPageSlice";

export const history = createBrowserHistory();

// reducers
const reducer = combineReducers({
  router: connectRouter(history),
  user: userSlice.reducer,
  userPage: userPageSlice.reducer,
});

const middlewares = [];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== "production",
});

export default store;
