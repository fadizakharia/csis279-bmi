import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/user";
import thunk from "redux-thunk";
import { loadingReducer } from "./reducers/loading";
const reducers = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
