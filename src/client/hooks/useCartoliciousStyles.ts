import { useSelector, useDispatch } from "react-redux";
import { ReduxStateConfigProps } from "../interfaces";
import { SET_CARTOLICIOUS_STYLES, SET_BACKGROUND } from "../constants";

const useCartoliciousStyles = () => {
  const dispatch = useDispatch();
  const currentStyles = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );

  const styleId = useSelector((state: ReduxStateConfigProps) => state.style_id);

  const currentBackground = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  const setCaroliciousStyles = (payload: any): any => {
    dispatch({ type: SET_CARTOLICIOUS_STYLES, payload });
  };

  const setBackground = (payload: number[]): any => {
    dispatch({ type: SET_BACKGROUND, payload });
  };

  return {
    currentBackground,
    currentStyles,
    styleId,
    setCaroliciousStyles,
    setBackground,
  };
};

export default useCartoliciousStyles;
