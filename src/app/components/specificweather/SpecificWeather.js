import React from "react";
import DetailedWeather from "components/detailedweather/DetailedWeather";

const SpecificWeather = (props) => {
  const id = props.match.params.id;
  return <DetailedWeather id={id} />;
};

export default SpecificWeather;
