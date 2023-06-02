import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Map } from "mapbox-gl";
import USAState from "../data/USA-States.json";
import { LAYERS_IDS, SOURCES_IDS } from "../constants";
import { loadExternalLayer, loadHexagons } from "../utils";
import { STATES } from "../data/states";
import { SHAPES } from "../data/shapes";

export const MapView = ({ data, isLoading, stateID, setStateID }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useLayoutEffect(() => {
    if (mapRef.current) return;
    mapRef.current = new Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96.7726792539197, 37.95786899032038], // starting position [lng, lat]
      zoom: 4,
    });
    setMap(mapRef.current);
  }, []);

  useLayoutEffect(() => {
    if (!map) return;

    map.on("load", () => {
      map.addSource(SOURCES_IDS.USState, {
        type: "geojson",
        data: USAState,
      });

      map.addLayer({
        id: LAYERS_IDS.USStateLines,
        type: "fill",
        source: SOURCES_IDS.USState,
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.0,
        },
      });

      map.addLayer({
        id: "outline",
        type: "line",
        source: SOURCES_IDS.USState,
        layout: {},
        paint: {
          "line-color": "#64748b",
          "line-width": 1,
        },
      });
    });
  });

  useLayoutEffect(() => {
    if (!map) return;

    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [LAYERS_IDS.USStateLines],
      });
      map.getCanvas().style.cursor = "grab";
      if (features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });
  });

  useLayoutEffect(() => {
    if (!map) return;

    map.on("click", async (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [LAYERS_IDS.USStateLines],
      });

      if (features.length) {
        const [feature] = features;
        const { properties } = feature;
        const { name } = properties;

        const state = STATES.find(
          (state) => state.label.toLowerCase() === name.toLowerCase()
        );

        const shape = SHAPES[state.value];
        const { id } = shape;
        setStateID(id);

        loadExternalLayer(map, SHAPES[state.value]);
      }
    });
  });

  useEffect(() => {
    if (stateID && !isLoading) {
      loadHexagons(map, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateID, isLoading]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};
