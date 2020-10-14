import React from "react";
import styled from "styled-components";
import { format, fromUnixTime } from "date-fns";
import { Card } from "semantic-ui-react";

const StyledCard = styled(Card)`
  background-color: ${(props) => props.bgcolor || "#f5a742"};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  border-radius: 10px;
  max-width: 600px;
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  font-size: 30px;
  color: #ffffff;
  font-weight: 700;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;
const DayWeatherItemContainer = styled.div`
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #ffffff;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 300px));
  @media (max-width: 512px) {
    grid-template-columns: 1fr;
  }
`;

const DayWeatherItem = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const StyledText = styled.div`
  font-size: ${(props) => props.size || "16"}px;
  color: ${(props) => props.color || "#ffffff"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  text-transform: ${(props) => props.transform || "inherit"};
  @media (max-width: 512px) {
    font-size: 12px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const ConditionItem = styled.div`
  padding-left: 10px;
  font-size: 15px;
  color: #ffffff;
`;

const CenteredBox = styled.div``;

const DailyForecast = ({ data }) => {
  const getTempCelsius = (tempKelvin) => `${Math.round(tempKelvin - 273.15)}°`;
  return (
    <Container>
      <CenteredBox>
        <StyledCard bgcolor="#FFC700">
          <StyledText size={22} fontWeight="bold">
            5 Day/3 Hour Forecast
          </StyledText>
          <Box>
            <div>
              <DateContainer>{format(new Date(), "dd MMM")}</DateContainer>
              <StyledText transform="capitalize" size={20}>
                {data.city?.name}
              </StyledText>
            </div>
            <div>
              {" "}
              <StyledText transform="capitalize" size={18}>
                sunrise: {format(fromUnixTime(data.city.sunrise), "HH:mm")}
              </StyledText>
              <StyledText transform="capitalize" size={18}>
                sunset: {format(fromUnixTime(data.city.sunset), "HH:mm")}
              </StyledText>
            </div>
          </Box>
        </StyledCard>
        <StyledCard bgcolor="rgb(87, 63, 152, 0.5)">
          <DaysContainer>
            {data.list.map((item, index) => (
              <WeatherItem
                key={index}
                day={`${format(new Date(item.dt_txt), "MMM do HH:mm")}`}
                maxMin={`${getTempCelsius(
                  item.main.temp_max
                )} / ${getTempCelsius(item.main.temp_min)}`}
                weather={item.weather}
                humidity={item.main.humidity}
                wind={item.wind.speed}
              />
            ))}
          </DaysContainer>
        </StyledCard>
      </CenteredBox>
    </Container>
  );
};

const WeatherItem = ({ day, maxMin, weather, humidity, wind }) => (
  <DayWeatherItemContainer>
    <DayWeatherItem>
      <ConditionItem>
        <StyledText fontWeight={700}>{day}</StyledText>
      </ConditionItem>
      <ConditionItem>{maxMin}</ConditionItem>
    </DayWeatherItem>
    <DayWeatherItem>
      <ConditionItem>
        <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} />
        <StyledText fontWeight={700}>{weather[0].description}</StyledText>
      </ConditionItem>
    </DayWeatherItem>
    <DayWeatherItem>
      <ConditionItem>Humidity:{humidity} %</ConditionItem>
      <ConditionItem>Wind: {wind}</ConditionItem>
    </DayWeatherItem>
  </DayWeatherItemContainer>
);

export default DailyForecast;
