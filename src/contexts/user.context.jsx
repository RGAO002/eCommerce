import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
/* Creating the Context: createContext() creates a
new Context object. When React renders a component that
subscribes to this Context object, it will read the current
context value from the closest matching Provider above it in
the tree. The createContext function takes a default value as
a parameter, which is used when a component consumes the context
but is not wrapped in a corresponding Provider. */
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

/* Define a UserProvider component. An alias component that will 
use the UserContext.Provider to provide the current user 
and a function to set the current user to all components 
within it (i.e., its children). */

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser }; //values that we want to share

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      setCurrentUser(user);
      if (user) createUserDocumentFromAuth(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
