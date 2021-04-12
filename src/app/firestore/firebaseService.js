import { toast } from "react-toastify";
import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
}

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);

    await res.user.updateProfile({ displayName: creds.displayName });

    return await setUserProfileData(res.user);
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;

  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const res = await firebase.auth().signInWithPopup(provider);

    if (res.additionalUserInfo.isNewUser) {
      await setUserProfileData(res.user);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;

  return user.updatePassword(creds.newPassword1);
}

export function uploadToFirebaseStorage(file, fileName) {
  const user = firebase.auth().currentUser;

  const storageRef = firebase.storage().ref();

  return storageRef.child(`${user.uid}/user_images/${fileName}`).put(file);
}

export function deleteFromFirebaseStorage(filename) {
  const userId = firebase.auth().currentUser.uid;

  const storageRef = firebase.storage().ref();

  const photoRef = storageRef.child(`${userId}/user_images/${filename}`);
  return photoRef.delete();
}

export function addEventChatComment(eventId, values) {
  const user = firebase.auth().currentUser;

  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL || null,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };

  return firebase.database().ref(`chat/${eventId}`).push(newComment);
}

export function getEventChatRef(eventId) {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
}
