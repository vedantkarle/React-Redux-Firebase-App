import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from "../../app/config/firebase";

export const signInUser = (user) => {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
};

export const verifyAuth = (creds) => async (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(signInUser(user));
    } else {
      dispatch(signOutUser());
    }
  });
};

export const signOutUser = () => async (dispatch) => {
  dispatch({ type: SIGN_OUT_USER });
};
