import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapContext from "../components/MapContext";
import { ENDPOINTS } from "../config";
import { ReduxStateConfigProps } from "../interfaces";
import { mapFromObject, objectFromMap } from "../lib/utils";
import {
  setCaroliciousStyles,
  setBackground,
  toggleCurationsDialog,
  setBusy,
} from "../actions";

const useCartoliciousApi = () => {
  const map = useContext(MapContext);
  const dispatch = useDispatch();

  const { token, id } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const currentStyles = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );

  // const currentBackground = useSelector(
  //   (state: ReduxStateConfigProps) => state.background
  // );

  const loadNewStyle = async () => {
    dispatch(setBusy(true));
    try {
      const res = await fetch(ENDPOINTS.STYLES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data, errors } = await res.json();
      if (data.length > 0) {
        const [newStyles, background] = data;
        const newStyleMap = new Map();
        Object.entries(newStyles).forEach(([key, value]) =>
          newStyleMap.set(key, value)
        );
        dispatch(setCaroliciousStyles(newStyleMap));
        dispatch(setBackground(background));
      }
      if (errors.length > 0) {
        console.log(errors);
      }
    } catch (e) {
    } finally {
      dispatch(setBusy(false));
    }
  };

  const loadStyleById = async ({ id: styleId }: { id: string }) => {
    dispatch(setBusy(true));
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.STYLES}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      const [style] = data;
      const { background } = style;
      const styleMap = mapFromObject(style);
      dispatch(setCaroliciousStyles(styleMap));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
      dispatch(setBusy(false));
    }
  };

  const deleteCuration = async ({ id: curationId }) => {
    const response = await fetch(`${ENDPOINTS.CURATIONS}/${curationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        user_id: id,
      }),
    });

    const { status, data, errors } = await response.json();
    return { status, data, errors };
  };

  const updateCuration = async ({ id: curationId, name }) => {
    const response = await fetch(`${ENDPOINTS.CURATIONS}/${curationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        user_id: id,
        name,
      }),
    });

    const { status, data, errors } = await response.json();
    return { status, data, errors };
  };

  const saveCuration = async ({ styles, background, long, lat, zoom }) => {
    const saveCuration = await fetch(ENDPOINTS.CURATIONS, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user_id: id,
        style_id: null,
        lat,
        long,
        zoom,
        name: null,
        shared: true,
        styles: {
          ...styles,
          background,
        },
      }),
    });

    const { status, data, errors } = await saveCuration.json();

    return { status, data, errors };
  };

  const loadCurationByHash = async (hash: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.CURATIONS}/hash/${hash}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, errors } = await loadedStyle.json();
      const [curation] = data;

      if (curation) {
        const {
          lat,
          long,
          style: { json },
          zoom,
        } = curation;
        const { background } = json;
        console.log(json);
        const styleMap = mapFromObject(json);
        map?.getView().setCenter([long, lat]);
        map?.getView().setZoom(zoom);
        dispatch(setCaroliciousStyles(styleMap));
        dispatch(setBackground(background || [0, 0, 0, 1]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadCuration = async (id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.CURATIONS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, errors } = await loadedStyle.json();
      const [curation] = data;

      if (curation) {
        const {
          lat,
          long,
          style: { json },
          zoom,
        } = curation;
        const { background } = json;

        const styleMap = mapFromObject(json);
        map?.getView().setCenter([long, lat]);
        map?.getView().setZoom(zoom);
        dispatch(setCaroliciousStyles(styleMap));
        dispatch(setBackground(background || [0, 0, 0, 1]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTemporaryAccess = async (tempKey: string) => {
    try {
      dispatch(setBusy(true));
      const tempAccess = await fetch(`${ENDPOINTS.USER}/temporary/${tempKey}`);
      const { data } = await tempAccess.json();
      const [ok] = data;
      if (ok === true) {
        dispatch({ type: "TEMP_ACCESS", payload: true });
      }
    } catch (e) {
      console.log("getTemporaryAccess error", e);
    } finally {
      dispatch({ type: "TEMP_ACCESS", payload: true });
      dispatch(setBusy(false));
    }
  };

  return {
    loadCuration,
    saveCuration,
    updateCuration,
    deleteCuration,
    loadCurationByHash,
    loadStyleById,
    loadNewStyle,
    getTemporaryAccess,
  };
};

export default useCartoliciousApi;
