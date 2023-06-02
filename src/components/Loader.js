import React from "react";
import { Loader } from "tiny-ui";
import { Typography } from "tiny-ui";
const { Text } = Typography;

const AppLoader = () => {
  return (
    <div className="loader">
      <div className="loader__container">
        <Loader size="lg" />
        <Text
          style={{
            marginTop: 8,
            fontSize: 20,
          }}
        >
          Loading
        </Text>
      </div>
    </div>
  );
};

export default AppLoader;
