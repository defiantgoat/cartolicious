import { useContext } from "react";
import { useDispatch } from "react-redux";
import MapContext from "../components/MapContext";
import { ENDPOINTS } from "../config";
import { mapFromObject } from "../lib/utils";
import useUser from "./useUser";
import useCartoliciousStyles from "./useCartoliciousStyles";
import { set_busy } from "../reducers/rootSlice";

const useCartoliciousApi = () => {
  const map = useContext(MapContext);
  const dispatch = useDispatch();
  const { styleId, setCaroliciousStyles, setBackground } =
    useCartoliciousStyles();

  const { token, user_id } = useUser();

  const testTransform = async (url?: string) => {
    const u =
      url ||
      "https://d.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8/15/9220/12887.mvt?access_token=pk.eyJ1IjoiZGVmaWFudGdvYXQiLCJhIjoiY200cHM2ampqMHk1YTJrb3N2MnlzOHJ1dyJ9.iU8b-PtlueSQuP3oq31O5A";
    try {
      const res = await fetch(`${ENDPOINTS.TRANSFORM}?url=${u}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data?.svg || null;
      console.log(data);
    } catch (e) {}
  };

  const onTileRequested = (url: string) => {
    console.log(url);
  };

  const loadNewStyle = async () => {
    dispatch(set_busy(true));
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
        setCaroliciousStyles({ styleMap: newStyleMap });
        setBackground(background);
      }
      if (errors.length > 0) {
        console.log(errors);
      }
    } catch (e) {
    } finally {
      dispatch(set_busy(false));
    }
  };

  const loadStyleById = async ({ _id: styleId }: { _id: string }) => {
    if (!styleId || styleId === "none") {
      return;
    }
    dispatch(set_busy(true));
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.STYLES}/${styleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      const [style] = data;
      const { background } = style;
      const styleMap = mapFromObject(style);
      setCaroliciousStyles({ styleMap, style_id: styleId });
      setBackground(background || [0, 0, 0, 1]);
    } catch (e) {
    } finally {
      dispatch(set_busy(false));
    }
  };

  const deleteCuration = async ({ _id: curationId }) => {
    const response = await fetch(`${ENDPOINTS.CURATIONS}/${curationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        user_id,
      }),
    });

    const { status, data, errors } = await response.json();
    return { status, data, errors };
  };

  const updateCuration = async ({ _id: curationId, name }) => {
    const response = await fetch(`${ENDPOINTS.CURATIONS}/${curationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        user_id,
        name,
      }),
    });

    const { status, data, errors } = await response.json();
    return { status, data, errors };
  };

  const saveDailyCuration = async ({ _id }) => {
    const saveDaily = await fetch(`${ENDPOINTS.CURATIONS}/daily/curation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user_id,
        curation_id: _id,
      }),
    });

    const { status, data, errors } = await saveDaily.json();

    return { status, data, errors };
  };

  const getDailyCuration = async () => {
    dispatch(set_busy(true));
    try {
      const loadedCuration = await fetch(
        `${ENDPOINTS.CURATIONS}/daily/curation`
      );

      const { data, errors } = await loadedCuration.json();
      const [curation] = data;

      if (curation) {
        const {
          lat,
          long,
          style: { json },
          zoom,
          name,
          user,
        } = curation;
        const { background } = json;

        const styleMap = mapFromObject(json);
        console.log(map);
        map?.getView().setCenter([long, lat]);
        map?.getView().setZoom(zoom);
        setCaroliciousStyles({
          styleMap,
          style_id: curation?.style?._id,
          curation_id: curation?._id,
          curation_info: {
            name,
            user: user?.name || "Anonymous",
          },
        });
        setBackground(background || [0, 0, 0, 1]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(set_busy(false));
    }
  };

  const saveCuration = async ({ styles, background, long, lat, zoom }) => {
    const saveCuration = await fetch(ENDPOINTS.CURATIONS, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user_id,
        style_id: styleId || null,
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
        setCaroliciousStyles({ styleMap, style_id: curation?.style?._id });
        setBackground(background || [0, 0, 0, 1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadCuration = async (_id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.CURATIONS}/${_id}`, {
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
        setCaroliciousStyles({
          styleMap,
          style_id: curation?.style?._id,
          curation_id: curation?._id,
        });
        setBackground(background || [0, 0, 0, 1]);
      }
    } catch (e) {
      console.log(e);
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
    saveDailyCuration,
    getDailyCuration,
    testTransform,
    onTileRequested,
  };
};

export default useCartoliciousApi;
