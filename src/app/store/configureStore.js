import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import testReducer from "../../features/sandbox/testReducer";
import eventReducer from "../../features/events/eventReducer";
import modalReducer from "../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import thunk from "redux-thunk";
import asyncReducer from "../async/asyncReducer";

const reducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
});

export function configureStore() {
  return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}
