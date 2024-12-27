import { createContext } from "react";

const FirebaseContext: React.Context<any> = createContext(null);
FirebaseContext.displayName = "FirebaseContext";

export default FirebaseContext;
