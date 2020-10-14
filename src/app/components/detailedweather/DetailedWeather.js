import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DailyForecast from "components/dailyforecast/DailyForecast";
import { Loading } from "components/search/Search";
import Error from "components/ui/error/Error";
import { Header } from "components/home/Home";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { scaleAnimation } from "components/recentlyrequested/RecentlyRequestedCities";

const DetailedContainer = styled.div``;

const ForcastContainer = styled.div`
  padding: 1rem;
`;
const Navigation = styled.div`
  width: 100%;
  padding: 1rem 0 1rem 0;
  background: #b58adb;
`;

const Button = styled.button`
  background: #52346e;
  color: white;
  outline: none;
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const DailyWrapper = styled.div`
  animation-name: ${scaleAnimation};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  transform-origin: center;
  animation-timing-function: cubic-bezier(0.57, 0, 0.2, 1);
`;

const NoForecast = styled.div`
  font-size: 2rem;
`;

const DetailedWeather = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    cities,
    detailedForecast: { loading, error },
  } = useSelector((state) => state.weather);

  const currentCity = cities.find((c) => c.data.name === id);

  useEffect(() => {
    if (currentCity && !currentCity.detailedForecast) {
      dispatch({
        type: "REQUEST_DETAILED_WEATHER",
        currentCity,
      });
    }
  }, [currentCity]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <DetailedContainer>
      <Header>Detailed weather</Header>
      <Navigation>
        <Button onClick={goBack}>Go Back</Button>
      </Navigation>
      <ForcastContainer>
        {currentCity && currentCity.detailedForecast && (
          <DailyWrapper>
            <DailyForecast data={currentCity.detailedForecast} />
          </DailyWrapper>
        )}

        {!currentCity && !loading && (
          <DailyWrapper>
            <NoForecast>
              No forecast for {id}. Visit <Link to="/"> home page </Link> and
              hit search.
            </NoForecast>
          </DailyWrapper>
        )}
      </ForcastContainer>
      {loading && <Loading>Getting detailed forecast...</Loading>}
      {error && <Error text={error} />}
    </DetailedContainer>
  );
};

export default DetailedWeather;
