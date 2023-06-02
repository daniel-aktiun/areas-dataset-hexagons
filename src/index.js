import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import mapboxgl from "mapbox-gl";
import { QueryClient, QueryClientProvider } from "react-query";
import "mapbox-gl/dist/mapbox-gl.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

mapboxgl.accessToken =
  mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
