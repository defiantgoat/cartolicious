import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FirebaseContext from "./context";
import firebaseConfig from "./config";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import useUser from "../../hooks/useUser";

const useTest = () => {
  return { cat: 1 };
};

const FirebaseProvider = ({ children }) => {
  const [app, setApp] = useState<any>(null);
  // const { user } = useUser();
  // const { setUser } = useUser();

  // const handleUserInfo = async (user: User) => {
  //   const accessToken = await user?.getIdToken();
  //   // setUser({
  //   //   uid: user?.uid,
  //   //   loggedIn: true,
  //   //   details: user,
  //   //   token: accessToken,
  //   //   email: user?.email,
  //   // });
  // };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setApp(app);
  }, []);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
