// import * as firebase from "firebase";
import { auth } from "../../utils/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
export const loginRequest = (auth, email, password) =>
signInWithEmailAndPassword(auth, email, password);