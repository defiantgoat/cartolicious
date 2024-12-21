import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { getAuth, signOut } from "firebase/auth";
import FirebaseContext from "../Firebase/context";
import useUser from "../../hooks/useUser";

const LogoutButton = () => {
  const firebaseApp = useContext(FirebaseContext);
  const { setUserLoggedOut } = useUser();

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    try {
      await signOut(auth);
      setUserLoggedOut();
    } catch (e) {
      console.log("error signing out", e);
    }
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
