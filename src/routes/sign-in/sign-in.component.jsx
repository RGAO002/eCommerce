import React from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
function SignIn() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <div>
      SignIn
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
    </div>
  );
}

export default SignIn;
