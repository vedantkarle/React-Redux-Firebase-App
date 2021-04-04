import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { delay } from "../../app/common/utils/utils";

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export const increment = (amount) => async (dispatch) => {
  try {
    dispatch(asyncActionStart());
    await delay(1000);
    dispatch({ type: INCREMENT_COUNTER, payload: amount });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};
export const decrement = (amount) => async (dispatch) => {
  try {
    await delay(1000);
    dispatch(asyncActionStart());
    dispatch({ type: DECREMENT_COUNTER, payload: amount });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
    toast.error(error);
  }
};

const initialState = {
  data: 42,
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: action.payload };
    case DECREMENT_COUNTER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
