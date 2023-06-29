import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userErrorReducer } from "../../store/user/user.selector";
import FormInput from "../form/form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import {
//   signInWithGooglePopup,
//   createUserDocumentFromAuth,
//   signInAuthUserWithEmailAndPassword,
// } from "../../utils/firebase/firebase.utils";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const error = useSelector(userErrorReducer);
  // console.log(error);

  useEffect(() => {
    if (error && "code" in error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("Incorrect password for this email");
          break;
        case AuthErrorCodes.USER_DELETED:
          alert("No user found with this email");
          break;
        default:
          console.log(error);
      }
    }
  }, [error]);

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart());
    // setCurrentUser(user);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      // setCurrentUser(user);
      resetFormFields();

      // if (!user) return;
    } catch (error: any) {
      console.log(error);
      // if ("code" in error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("Incorrect password for this email");
          break;
        case AuthErrorCodes.USER_DELETED:
          alert("No user found with this email");
          break;
        default:
          console.log(error);
      }
      // }
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2 className="title">Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
