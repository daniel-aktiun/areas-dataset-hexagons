import axios from "axios";

const datasetApi = axios.create({
  baseURL: "http://localhost:3001/api/datasets/hexagons",
});

export default datasetApi;
