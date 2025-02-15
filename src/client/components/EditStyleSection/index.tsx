import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  CartoliciousFill,
  CartoliciousStroke,
  CartoliciousStyle,
} from "../../interfaces";
import SidebarSection from "../common/SidebarSection";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousButton, LiciousInput, LiciousSelect } from "@licious/react";
import useUser from "../../hooks/useUser";
import useMapSelections from "../../hooks/useMapSelections";
import palette from "../../lib/palette";

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

  const { userIsOwner } = useUser();
  const { mapSelections, setMapSelections } = useMapSelections();
  const { setCaroliciousStyles, currentStyles: cartolicious } =
    useCartoliciousStyles();

  const strokeWidthInputRef = useRef<any>(null);

  useEffect(() => {
    setCurrentStyle("");
    setCurrentAttribute("");
    setCurrentAttributeFill([]);
    setCurrentAttributeStroke([]);
  }, [mapSelections]);

  const options = useMemo(() => {
    const options = [
      { label: "Select an Attribute", value: "none", selected: false },
    ];

    if (cartolicious) {
      const keySort = [...cartolicious.keys()].sort();
      keySort.forEach((key: string) => {
        options.push({
          value: key,
          label: key.replace("_", " ").toUpperCase(),
          selected: key === currentAttribute,
        });
      });
    }

    return options;
  }, [cartolicious, currentAttribute]);

  const handleSelectLicious = (e: any) => {
    const value =
      e?.target?.shadowRoot?.querySelector("select").value ||
      e?.cartoliciousProperty ||
      "none";
    setCurrentAttribute(value);
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

    const updatedCartoliciousStyle = cartolicious?.get(currentAttribute);
    if (updatedCartoliciousStyle) {
      updatedCartoliciousStyle[0] = newFill;
    }

    newMap.set(currentAttribute, updatedCartoliciousStyle);

    setCaroliciousStyles({ styleMap: newMap });
  };

  const handleStrokeWidthChange = (e: any) => {
    const width = e?.target?.shadowRoot?.querySelector("input")?.value || "1";
    if (/^\d+$/.test(width)) {
      const strokeWidth = parseInt(width, 10);
      const newStroke = [...currentAttributeStroke] as CartoliciousStroke;
      if (newStroke[5]) {
        newStroke[5] = newStroke[5] = strokeWidth;
        if (newStroke[5] >= 0) {
          setCurrentAttributeStroke(newStroke);

          // Need to do this in a separate call as it delays the checkbox change.
          // or show some kind of change indicator, may need to use a webworker to do the map copy.
          const newMap = new Map();
          cartolicious?.forEach((value, key) => newMap.set(key, value));

          const updatedCartoliciousStyle = cartolicious?.get(currentAttribute);
          if (updatedCartoliciousStyle) {
            updatedCartoliciousStyle[1] = newStroke;
          }

          newMap.set(currentAttribute, updatedCartoliciousStyle);

          setCaroliciousStyles({ styleMap: newMap });
        }
      }
    }
  };

  const handleStrokeAttributeChange = ({ target: { checked } }) => {
    const newStroke = [...currentAttributeStroke] as CartoliciousStroke;
    newStroke[4] = checked ? 1 : 0;
    setCurrentAttributeStroke(newStroke);

    // Need to do this in a separate call as it delays the checkbox change.
    // or show some kind of change indicator, may need to use a webworker to do the map copy.
    const newMap = new Map();
    cartolicious?.forEach((value, key) => newMap.set(key, value));

    const updatedCartoliciousStyle = cartolicious?.get(currentAttribute);
    if (updatedCartoliciousStyle) {
      updatedCartoliciousStyle[1] = newStroke;
    }

    newMap.set(currentAttribute, updatedCartoliciousStyle);

    setCaroliciousStyles({ styleMap: newMap });
  };

  // useEffect(() => {
  //   if (currentStyle > -1) {
  //     loadStyle(`${currentStyle}`);
  //   }
  // }, [currentStyle]);

  const currentFillVisible = useMemo(() => {
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

  const handleClearMapSelections = () => {
    setMapSelections([]);
  };

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
        <div>
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
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: ".8rem",
              paddingLeft: "1.3rem",
              paddingTop: ".6rem",
            }}
          >
            <span
              style={{ color: palette.warm.secondary.hex, fontSize: ".8rem" }}
            >
              Width
            </span>
            <LiciousInput
              style={{ width: "1rem" }}
              ref={strokeWidthInputRef}
              value={`${currentAttributeStroke[5]}`}
              onInput={handleStrokeWidthChange}
            />
          </span>
        </div>
      )}
      {mapSelections.length > 0 && userIsOwner ? (
        <div>
          {mapSelections.map(
            ({
              type,
              cartoliciousProperty,
              propertyStyle,
            }: {
              type: string;
              cartoliciousProperty: string;
              propertyStyle: CartoliciousStyle;
            }) => {
              const isLineType = type.toLowerCase().includes("line");
              const [fill, stroke, visible] = propertyStyle;
              const [r1, g1, b1, a1] = fill;
              const [r2, g2, b2, a2] = stroke;
              const fillColor = isLineType
                ? "transparent"
                : `rgba(${r1}, ${g1}, ${b1}, ${a1})`;
              const strokeColor = `rgba(${r2}, ${g2}, ${b2}, ${a2})`;
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: ".5rem",
                  }}
                >
                  <LiciousButton
                    size="sm"
                    label={`${cartoliciousProperty} (${type})`}
                    onClick={() =>
                      handleSelectLicious({ cartoliciousProperty })
                    }
                    icon="custom"
                  >
                    <svg
                      /*
                      // @ts-ignore */
                      slot="custom-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle
                        r="10"
                        cx="12"
                        cy="12"
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth="3"
                      />
                    </svg>
                  </LiciousButton>
                </div>
              );
            }
          )}
          <LiciousButton
            size="sm"
            label="Clear Selections"
            icon="close"
            onClick={handleClearMapSelections}
          />
        </div>
      ) : null}
      {/* <SaveStyleButton /> */}
    </SidebarSection>
  );
};

export default EditStyleSection;
