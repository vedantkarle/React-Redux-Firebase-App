import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import testReducer from "../../features/sandbox/testReducer";
import eventReducer from "../../features/events/eventReducer";
import modalReducer from "../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const reducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
});

export function configureStore() {
  return createStore(reducer, composeWithDevTools());
}
