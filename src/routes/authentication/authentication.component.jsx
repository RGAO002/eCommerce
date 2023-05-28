import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";
function Authentication() {
  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign In with Google Popup</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;
