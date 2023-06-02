import { LAYERS_IDS, SOURCES_IDS } from "./constants";

export const loadExternalLayer = (map, shape) => {
  const { source, center } = shape;

  map.flyTo({
    center: center,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    zoom: 5.8,
  });

  const isLayerExist = map
    .getStyle()
    .layers.find((layer) => layer.id === LAYERS_IDS.County);

  if (isLayerExist) {
    map.getSource(LAYERS_IDS.County).setData(source);
  }

  if (!isLayerExist) {
    map.addSource(LAYERS_IDS.County, {
      type: "geojson",
      data: source,
    });

    map.addLayer({
      id: LAYERS_IDS.County,
      type: "line",
      source: LAYERS_IDS.County,
      layout: {},
      paint: {},
    });
  }
};

export const loadHexagons = async (map, data) => {
  if (!data) return;

  if (map.getLayer(LAYERS_IDS.HexagonLayer)) {
    map.getSource(SOURCES_IDS.HexagonSource).setData(data);
  } else {
    map.addSource(SOURCES_IDS.HexagonSource, {
      type: "geojson",
      data: data,
    });

    map.addLayer({
      id: LAYERS_IDS.HexagonLayer,
      type: "fill",
      source: SOURCES_IDS.HexagonSource,
      paint: {
        "fill-color": "#38bdf8",
        "fill-opacity": 0.4,
      },
    });
  }
};
