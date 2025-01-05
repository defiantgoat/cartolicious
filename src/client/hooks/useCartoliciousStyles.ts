import { useSelector, useDispatch } from "react-redux";
import { set_cartolicious_styles, set_background } from "../reducers/rootSlice";
import { add_style } from "../reducers/userSlice";

const useCartoliciousStyles = () => {
  const dispatch = useDispatch();
  const currentStyles = useSelector(
    (state: any) => state.root.cartolicious_styles
  );

  const styleId = useSelector((state: any) => state.root.style_id);
  const curationId = useSelector((state: any) => state.root.curation_id);

  const currentBackground = useSelector((state: any) => state.root.background);

  const setCaroliciousStyles = (payload: any): any => {
    dispatch(set_cartolicious_styles(payload));
  };

  const setBackground = (payload: number[]): any => {
    dispatch(set_background(payload));
  };

  const addStyle = (payload: { _id: string; name: string }) => {
    dispatch(add_style(payload));
  };

  // const addCuration = (payload: {
  //   _id: string;
  //   name: string;
  //   style_id: string;
  //   style_name: string;
  // }) => {
  //   dispatch({ type: ADD_CURATION, payload });
  // };

  return {
    currentBackground,
    currentStyles,
    styleId,
    curationId,
    setCaroliciousStyles,
    setBackground,
    addStyle,
    // addCuration,
  };
};

export default useCartoliciousStyles;
