import React, { useEffect, useState } from "react";
import FirebaseContext from "./context";
import firebaseConfig from "./config";
import { initializeApp } from "firebase/app";

const FirebaseProvider = ({ children }) => {
  const [app, setApp] = useState<any>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setApp(app);
  }, []);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
