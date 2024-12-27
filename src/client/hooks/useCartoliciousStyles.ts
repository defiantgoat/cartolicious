import { useSelector } from "react-redux";
import { ReduxStateConfigProps } from "../interfaces";

const useCartoliciousStyles = () => {
  const currentStyles = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );

  const styleId = useSelector((state: ReduxStateConfigProps) => state.style_id);

  const currentBackground = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  return {
    currentBackground,
    currentStyles,
    styleId,
  };
};

export default useCartoliciousStyles;
