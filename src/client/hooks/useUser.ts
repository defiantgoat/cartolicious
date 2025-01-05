import { useSelector, useDispatch } from "react-redux";
import { ReduxStateConfigProps } from "../interfaces";
import {
  SET_USER_DATA,
  SET_LOGGED_OUT,
  SET_USER_ID,
  SET_USER_CONTENT,
} from "../constants";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxStateConfigProps) => state.user);

  const setUser = (payload: any): void => {
    dispatch({ type: SET_USER_DATA, payload });
  };

  const setUserId = (payload: any): void => {
    dispatch({ type: SET_USER_ID, payload });
  };

  const setUserLoggedOut = (): void => {
    dispatch({ type: SET_LOGGED_OUT });
  };

  const setAnonymousUser = (): void => {
    dispatch({ type: "SET_ANONYMOUS" });
  };

  const userIsOwner = user?.roles?.includes("owner");

  const setUserContent = (payload: {
    styles: any[];
    curations: any[];
  }): any => {
    dispatch({ type: SET_USER_CONTENT, payload });
  };

  return {
    setUser,
    setUserLoggedOut,
    setUserId,
    setUserContent,
    setAnonymousUser,
    userIsOwner,
    ...user,
  };
};

export default useUser;
