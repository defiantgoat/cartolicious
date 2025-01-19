import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import MapContext from "../components/MapContext";
import { ENDPOINTS } from "../config";
import { mapFromObject } from "../lib/utils";
import useUser from "./useUser";
import useCartoliciousStyles from "./useCartoliciousStyles";
import { set_busy } from "../reducers/rootSlice";
import VectorTileLayer from "ol/layer/VectorTile";

const useCartoliciousApi = () => {
  const map = useContext(MapContext);
  const dispatch = useDispatch();
  const { styleId, setCaroliciousStyles, setBackground } =
    useCartoliciousStyles();

  const { token, user_id } = useUser();

  const getTileGridForView = useCallback(async () => {
    if (map) {
      const tileCoordPromise = () =>
        new Promise((resolve, reject) => {
          const tileGrid = [] as any[];

          let count = 0;
          vectorLayer
            ?.getSource()
            ?.tileGrid?.forEachTileCoord(exent, zoom, (a) => {
              count++;
            });

          vectorLayer
            ?.getSource()
            ?.tileGrid?.forEachTileCoord(exent, zoom, (a) => {
              tileGrid.push(a);

              if (tileGrid.length === count) {
                resolve(tileGrid);
              }
            });
        });

      const [vectorLayer] = map.getLayers().getArray() as VectorTileLayer[];
      const view = map.getView();
      const size = map.getSize();
      const exent = view.calculateExtent(size);
      const zoom = view.getZoom() || 0;
      const grid = await tileCoordPromise();
      return grid;
    }
    return null;
  }, [map]);

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

  const saveCuration = async ({
    styles,
    background,
    long,
    lat,
    zoom,
    tile_grid,
  }) => {
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
        tile_grid,
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
    getTileGridForView,
  };
};

export default useCartoliciousApi;
