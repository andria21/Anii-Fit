import React, { useState, createContext } from "react";
// import firebase from "firebase";

import { loginRequest } from "./authentication.service";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";
import { auth } from "../../utils/firebase.utils";

import { createUserDocumentFromAuth } from "../../utils/firebase.utils";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const resetError = () => {
    setError('');
  };

  auth.onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        resetError();
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = async (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email,password);
      await createUserDocumentFromAuth(user);
      setUser(user);
      setIsLoading(false);
      resetError();
    } catch (error) {
      setIsLoading(false);
      setError(error.toString());
    }
    // createUserWithEmailAndPassword(auth,email, password)
    // .then(async(u) => {
    //   setUser(u);
    //   setIsLoading(false);
    //   await createUserDocumentFromAuth(u);
    // })
    // .catch((e) => {
    //   setIsLoading(false);
    //   setError(e.toString());
    // });
  };

  const onLogout = () => {
    setUser(null);
    auth.signOut();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        resetError,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};