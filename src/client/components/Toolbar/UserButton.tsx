import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../actions";
import Person from "@material-ui/icons/Person";
import ToolbarButton from "../ToolbarButton";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import FirebaseContext from "../Firebase/context";
import useUser from "../../hooks/useUser";

const UserButton: React.FC = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const firebaseApp = useContext(FirebaseContext);
  const { setUser } = useUser();

  //   const auth = getAuth();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

  const loginWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // setUser({
        //   uid: user?.uid,
        //   loggedIn: true,
        //   details: user,
        //   token,
        //   email: user?.email,
        // });
        // console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <ToolbarButton onClickHandler={loginWithGoogle}>
      <Person />
    </ToolbarButton>
  );
};

export default UserButton;
