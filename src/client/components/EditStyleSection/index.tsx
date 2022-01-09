import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select, FormControl } from "@material-ui/core";
import { ENDPOINTS } from "../../config";
import { CartoliciousFill, CartoliciousStroke, ReduxStateConfigProps } from "../../interfaces";
import { setCaroliciousStyles, setBackground } from "../../actions";
import SidebarSection from "../SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";
import { CartoliciousInput } from "../../lib/theme";

const EditStyleSection: React.FC = () => {
  const dispatch = useDispatch();
  const [currentStyle, setCurrentStyle] = useState(-1);
  const [currentAttribute, setCurrentAttribute] = useState("");
  const [currentAttributeFill, setCurrentAttributeFill] = useState([] as CartoliciousFill);
  const [setAttributeStroke, setCurrentAttributeStroke] = useState([] as CartoliciousStroke);

  const cartolicious = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );

  const createOptions = (): JSX.Element[] => {
    const options = [
      <option value={-1}>Select an Attribute</option>,
    ] as JSX.Element[];

    if (cartolicious) {
      cartolicious.forEach((value, key) => {
        options.push(
        <option key={`attribute-${key}`} value={key}>
          {key}
        </option>
      )
    });    }


    return options;
  };



  const handleStyleSelect = ({ target: { value } }) => {

    setCurrentStyle(value);
    if (cartolicious) {
      const [fill, stroke, opacity] = cartolicious.get(value);
      console.log(fill, stroke, opacity)
    }
  };

  // useEffect(() => {
  //   if (currentStyle > -1) {
  //     loadStyle(`${currentStyle}`);
  //   }
  // }, [currentStyle]);

  return (
    <SidebarSection header="Edit Style">
      {cartolicious && (
        <FormControl variant="outlined">
          <Select
            native
            value={currentStyle}
            onChange={handleStyleSelect}
            input={<CartoliciousInput />}
          >
            {createOptions()}
          </Select>
        </FormControl>
      )}
      {/* <SaveStyleButton /> */}
    </SidebarSection>
  );
};

export default EditStyleSection;
