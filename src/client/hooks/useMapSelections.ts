import { useSelector, useDispatch } from "react-redux";
import { set_map_selections } from "../reducers/rootSlice";
import { useMemo } from "react";
import RenderFeature from "ol/render/Feature";

const useMapSelections = () => {
  const dispatch = useDispatch();
  const map_selections = useSelector((state: any) => state.root.map_selections);
  const cartolicious = useSelector(
    (state: any) => state.root.cartolicious_styles
  );

  const setMapSelections = (selections = []) => {
    dispatch(set_map_selections(selections));
  };

  const mapSelections = useMemo(() => {
    const props = [] as any[];
    const propSet = new Set();

    map_selections.forEach((rf: RenderFeature) => {
      const type = rf.getType() || "unknown";
      const properties = rf.getProperties() || {};
      const {
        class: selectionClass = "",
        type: selectionType = "",
        layer: selectionLayer = "",
      } = properties;

      let cartoliciousProperty = "";
      let propertyStyle = null;

      if (cartolicious.get(selectionClass)) {
        propertyStyle = cartolicious.get(selectionClass);
        cartoliciousProperty = selectionClass;
      } else if (cartolicious.get(selectionType)) {
        propertyStyle = cartolicious.get(selectionType);
        cartoliciousProperty = selectionType;
      } else if (cartolicious.get(selectionLayer)) {
        propertyStyle = cartolicious.get(selectionLayer);
        cartoliciousProperty = selectionLayer;
      }

      if (!propSet.has(cartoliciousProperty)) {
        propSet.add(cartoliciousProperty);
        props.push({ type, cartoliciousProperty, propertyStyle });
      }
    });

    return props;
  }, [map_selections]);

  return {
    setMapSelections,
    map_selections,
    mapSelections,
  };
};

export default useMapSelections;
