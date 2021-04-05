import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

const initialState = {
  authenticated: false,
  currentUser: null,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: payload,
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
}
