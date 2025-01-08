import { useSelector, useDispatch } from "react-redux";
import {
  set_user_id,
  set_logged_out,
  set_anonymous,
  set_user_content,
  set_user_data,
} from "../reducers/userSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.user.token);
  const logged_in = useSelector((state: any) => state.user.logged_in);
  const user_id = useSelector((state: any) => state.user.user_id);
  const details = useSelector((state: any) => state.user.details);
  const anonymous = useSelector((state: any) => state.user.anonymous);
  const uid = useSelector((state: any) => state.user.uid);

  const setUser = (payload: any): void => {
    dispatch(set_user_data(payload));
  };

  const setUserId = (payload: any): void => {
    dispatch(set_user_id(payload));
  };

  const setUserLoggedOut = (): void => {
    dispatch(set_logged_out());
  };

  const setAnonymousUser = (): void => {
    dispatch(set_anonymous());
  };

  const userIsOwner = user?.roles?.includes("owner");

  const setUserContent = (payload: {
    styles: any[];
    curations: any[];
  }): any => {
    dispatch(set_user_content(payload));
  };

  return {
    setUser,
    setUserLoggedOut,
    setUserId,
    setUserContent,
    setAnonymousUser,
    userIsOwner,
    token,
    logged_in,
    user_id,
    details,
    anonymous,
    uid,
  };
};

export default useUser;
