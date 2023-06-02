import { useQuery } from "react-query";
import datasetApi from "../api/dataset";

const loadDataset = async ({ limit, stateID }) => {
  const { data } = await datasetApi.get("/", {
    params: {
      limit,
      state: stateID,
    },
  });

  return data;
};

const useDataset = ({ limit, stateID }) => {
  const query = useQuery(
    `hexagons-${stateID}`,
    () => loadDataset({ limit, stateID }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      cacheTime: 1000 * 60 * 60,
    }
  );
  return query;
};

export default useDataset;
