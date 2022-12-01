import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { app } from "./app";

const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
  return new Promise<User>((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        const user = {} as User;
        reject(user);
      });
  });
};

export const signIn = async (email: string, password: string) => {
  return new Promise<User>((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        const user = {} as User;
        reject(user);
      });
  });
};

export const signOut = async () => {
  return new Promise<User>((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        const user = {} as User;
        resolve(user);
      })
      .catch((error) => {
        // An error happened.
        const user = {} as User;
        reject(user);
      });
  });
};
