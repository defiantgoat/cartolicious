import { useSelector, useDispatch } from "react-redux";
import { ReduxStateConfigProps } from "../interfaces";
import { SET_USER_DATA, SET_LOGGED_OUT } from "../constants";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxStateConfigProps) => state.user);

  const setUser = (payload: any): void => {
    dispatch({ type: SET_USER_DATA, payload });
  };

  const setUserLoggedOut = (): void => {
    dispatch({ type: SET_LOGGED_OUT });
  };

  return {
    setUser,
    setUserLoggedOut,
    ...user,
  };
};

export default useUser;
