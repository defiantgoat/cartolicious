import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import FirebaseContext from "../Firebase/context";
import useUser from "../../hooks/useUser";
import { LiciousIconButton } from "@licious/react";

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

  return <LiciousIconButton size="sm" icon="logout" onClick={handleLogout} />;
};

export default LogoutButton;
