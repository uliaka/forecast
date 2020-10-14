import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailedWeatherComponent from "components/detailedweathercomponent/DetailedWeatherComponent";
import styled, { keyframes } from "styled-components";

const RecentlyRequestedCitiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 400px));
  grid-gap: 1rem;
  padding: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
export const scaleAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  10% { transform: scale(0.3); opacity: 0; }
  16% { opacity: 1; }
  80% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  animation-name: ${scaleAnimation};
  animation-duration: 1s;

  animation-fill-mode: forwards;
  transform-origin: center;
  animation-timing-function: cubic-bezier(0.57, 0, 0.2, 1);
`;

const RecentlyRequestedCities = () => {
  const { cities } = useSelector((state) => state.weather);
  return (
    <RecentlyRequestedCitiesContainer>
      {cities.slice(0, 5).map((c) => (
        <StyledLink to={`weather/${c.data.name}`} key={c.data.name}>
          <DetailedWeatherComponent data={c.data} />
        </StyledLink>
      ))}
    </RecentlyRequestedCitiesContainer>
  );
};

export default RecentlyRequestedCities;
