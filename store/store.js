import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import articles from "./articles/articleReducer";
import albumes from "./albumes/albumReducer";

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const initStore = () => {
  return createStore(
    combineReducers({
      articles,
      albumes
    }),
    bindMiddleware([thunkMiddleware])
  );
};
