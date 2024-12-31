import { useSelector, useDispatch } from "react-redux";
import { ReduxStateConfigProps } from "../interfaces";
import {
  SET_CARTOLICIOUS_STYLES,
  SET_BACKGROUND,
  ADD_CURATION,
  ADD_STYLE,
} from "../constants";

const useCartoliciousStyles = () => {
  const dispatch = useDispatch();
  const currentStyles = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );

  const styleId = useSelector((state: ReduxStateConfigProps) => state.style_id);
  const curationId = useSelector(
    (state: ReduxStateConfigProps) => state.curation_id
  );

  const currentBackground = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  const setCaroliciousStyles = (payload: any): any => {
    dispatch({ type: SET_CARTOLICIOUS_STYLES, payload });
  };

  const setBackground = (payload: number[]): any => {
    dispatch({ type: SET_BACKGROUND, payload });
  };

  const addStyle = (payload: { _id: string; name: string }) => {
    dispatch({ type: ADD_STYLE, payload });
  };

  const addCuration = (payload: {
    _id: string;
    name: string;
    style_id: string;
    style_name: string;
  }) => {
    dispatch({ type: ADD_CURATION, payload });
  };

  return {
    currentBackground,
    currentStyles,
    styleId,
    curationId,
    setCaroliciousStyles,
    setBackground,
    addStyle,
    addCuration,
  };
};

export default useCartoliciousStyles;
