import { useSelector, useDispatch } from "react-redux";
import { ReduxStateConfigProps, ReduxActionProps } from "../interfaces";
import { SET_USER_CONTENT, SET_USER_DATA } from "../constants";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxStateConfigProps) => state.user);

  const setUser = (payload: any): void => {
    dispatch({ type: SET_USER_DATA, payload });
  };

  return { user, setUser };
};

export default useUser;
