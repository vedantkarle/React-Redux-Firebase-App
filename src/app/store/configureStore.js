import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import testReducer from "../../features/sandbox/testReducer";
import eventReducer from "../../features/events/eventReducer";

const reducer = combineReducers({
  test: testReducer,
  event: eventReducer,
});

export function configureStore() {
  return createStore(reducer, composeWithDevTools());
}
