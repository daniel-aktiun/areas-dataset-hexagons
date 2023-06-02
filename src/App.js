import { useEffect, useState } from "react";
import AppLoader from "./components/Loader";
import { MapView } from "./components/MapView";
import useDataset from "./hooks/useDataset";
import "./styles.css";
import "tiny-ui/dist/styles/index.css";

const App = () => {
  const [stateID, setStateID] = useState(null);
  const { data, refetch, isLoading } = useDataset({
    limit: "SMALL",
    stateID,
  });

  useEffect(() => {
    if (stateID) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateID]);

  return (
    <>
      {isLoading && <AppLoader />}
      <MapView
        data={data}
        isLoading={isLoading}
        stateID={stateID}
        setStateID={setStateID}
      />
    </>
  );
};

export default App;
