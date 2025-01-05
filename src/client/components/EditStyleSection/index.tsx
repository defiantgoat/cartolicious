import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { CartoliciousFill, CartoliciousStroke } from "../../interfaces";
import SidebarSection from "../common/SidebarSection";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousSelect } from "@licious/react";

const StyleDisplay: React.FC<{
  style: CartoliciousFill | CartoliciousStroke;
}> = ({ style }) => {
  const [r, g, b, alpha] = style;
  return (
    <div
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`,
        width: "1rem",
        height: "1rem",
      }}
    ></div>
  );
};

const EditStyleSection: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState("");
  const [currentAttribute, setCurrentAttribute] = useState("");
  const [currentAttributeFill, setCurrentAttributeFill] = useState(
    [] as CartoliciousFill // [r, g, b, alpha, visible]
  );
  const [currentAttributeStroke, setCurrentAttributeStroke] = useState(
    [] as CartoliciousStroke // [r, g, b, alpha, visible, width]
  );
  const [currentAttributeVisible, setCurrentAttributeVisible] = useState(0);

  const cartolicious = useSelector(
    (state: any) => state.root.cartolicious_styles
  );

  const { setCaroliciousStyles } = useCartoliciousStyles();

  const options = useMemo(() => {
    const options = [{ label: "Select an Attribute", value: "none" }];

    if (cartolicious) {
      cartolicious.forEach((value, key) => {
        console.log(key);
        options.push({
          value: key,
          label: key.replace("_", " ").toUpperCase(),
        });
      });
    }

    return options;
  }, [cartolicious]);

  const handleSelectLicious = (e: any) => {
    const value =
      e?.target?.shadowRoot?.querySelector("select").value || "none";
    console.log(value);
    setCurrentStyle(value);
    if (cartolicious) {
      const [fill, stroke, visible] = cartolicious.get(value) || [[], [], 0];
      setCurrentAttributeFill(fill);
      setCurrentAttributeStroke(stroke);
      setCurrentAttributeVisible(visible);
    }
  };

  const handleFillAttributeChange = ({ target: { checked } }) => {
    const newFill = [...currentAttributeFill] as CartoliciousFill;
    newFill[4] = checked ? 1 : 0;
    setCurrentAttributeFill(newFill);

    // Need to do this in a separate call as it delays the checkbox change.
    // or show some kind of change indicator, may need to use a webworker to do the map copy.
    const newMap = new Map();
    cartolicious?.forEach((value, key) => newMap.set(key, value));

    const updatedCartoliciousStyle = cartolicious?.get(currentStyle);
    if (updatedCartoliciousStyle) {
      updatedCartoliciousStyle[0] = newFill;
    }

    newMap.set(currentStyle, updatedCartoliciousStyle);

    setCaroliciousStyles({ styleMap: newMap });
  };

  const handleStrokeAttributeChange = ({ target: { checked } }) => {
    const newStroke = [...currentAttributeStroke] as CartoliciousStroke;
    newStroke[4] = checked ? 1 : 0;
    setCurrentAttributeStroke(newStroke);

    // Need to do this in a separate call as it delays the checkbox change.
    // or show some kind of change indicator, may need to use a webworker to do the map copy.
    const newMap = new Map();
    cartolicious?.forEach((value, key) => newMap.set(key, value));

    const updatedCartoliciousStyle = cartolicious?.get(currentStyle);
    if (updatedCartoliciousStyle) {
      updatedCartoliciousStyle[1] = newStroke;
    }

    newMap.set(currentStyle, updatedCartoliciousStyle);

    setCaroliciousStyles({ styleMap: newMap });
  };

  // useEffect(() => {
  //   if (currentStyle > -1) {
  //     loadStyle(`${currentStyle}`);
  //   }
  // }, [currentStyle]);

  const currentFillVisible = useMemo(() => {
    console.log("fill changed", currentAttributeFill[4]);
    if (!currentAttributeFill || currentAttributeFill[4] === undefined) {
      return false;
    }
    return currentAttributeFill[4] > 0;
  }, [currentAttributeFill]);

  const currentStrokeVisible = useMemo(() => {
    if (!currentAttributeStroke || currentAttributeStroke[4] === undefined) {
      return false;
    }
    return currentAttributeStroke[4] > 0;
  }, [currentAttributeStroke]);

  return (
    <SidebarSection header="Edit Style">
      {cartolicious && (
        <LiciousSelect options={options} onInput={handleSelectLicious} />
      )}
      {currentAttributeFill.length > 0 && (
        <div
          style={{
            color: "honeydew",
            display: "flex",
            flexDirection: "row",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          <span>
            <input
              type="checkbox"
              checked={!!currentFillVisible}
              onChange={handleFillAttributeChange}
            />
          </span>
          <span>
            <StyleDisplay style={currentAttributeFill} />
          </span>
          <span>Fill</span>
          <span>{JSON.stringify(currentAttributeFill)}</span>
        </div>
      )}
      {currentAttributeStroke.length > 0 && (
        <div
          style={{
            color: "honeydew",
            display: "flex",
            flexDirection: "row",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          <span>
            <input
              type="checkbox"
              checked={!!currentStrokeVisible}
              onChange={handleStrokeAttributeChange}
            />
          </span>
          <span>
            <StyleDisplay style={currentAttributeStroke} />
          </span>
          <span>Stroke</span>
          <span>{JSON.stringify(currentAttributeStroke)}</span>
        </div>
      )}
      {/* <SaveStyleButton /> */}
    </SidebarSection>
  );
};

export default EditStyleSection;
