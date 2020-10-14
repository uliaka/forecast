import React from "react";
import styled from "styled-components";
import { format, fromUnixTime } from "date-fns";
import { Card } from "semantic-ui-react";

const StyledCard = styled(Card)`
  background-color: ${(props) => props.bgcolor || "#f5a742"};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-size: 20px;
  color: #ffffff;
  font-weight: ${(props) => props.fontWeight || "normal"};
`;
const DateContainer = styled.div`
  font-size: 30px;
  color: #ffffff;
  font-weight: 700;
`;

const Temperature = styled.div`
  font-size: 80px;
  color: #ffffff;
  font-weight: 700;
  @media (max-width: 512px) {
    font-size: 40px;
  }
`;
const Conditions = styled.div`
  font-size: 20px;
  color: #ffffff;
  text-transform: capitalize;
  @media (max-width: 512px) {
    font-size: 15px;
  }
`;

const DetailsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DetilsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ffffff;
`;

const StyledText = styled.div`
  font-size: ${(props) => props.size || "16"}px;
  color: ${(props) => props.color || "#ffffff"};
  text-transform: capitalize;
  @media (max-width: 512px) {
    font-size: 12px;
  }
`;

const DetailedWeather = ({ data }) => {
  const getTempCelsius = (tempKelvin) => `${Math.round(tempKelvin - 273.15)}°`;

  const renderedDetails = {
    humidity: `${data.main.humidity} %`,
    pressure: `${data.main.pressure} hPa`,
    visibility: `${
      Math.round((data.visibility / 100 + Number.EPSILON) * 10) / 10
    } km`,
    maxMin: `${getTempCelsius(data.main.temp_max)} / ${getTempCelsius(
      data.main.temp_min
    )}`,
    wind: `${data.wind.speed} m/s`,
    cloudiness: `${data.clouds.all} %`,
  };

  const detailsMap = {
    humidity: "Humidity",
    pressure: "Pressure",
    visibility: "Visibility",
    maxMin: "Max/Min",
    wind: "Wind",
    cloudiness: "Cloudiness",
  };

  return (
    <>
      <StyledCard bgcolor="rgb(87, 63, 152, 0.5)">
        <DateContainer>{format(new Date(), "dd MMM")}</DateContainer>
        <Text>{data.name}</Text>
        <DetailsBox>
          <div>
            <Temperature>{getTempCelsius(data.main.temp)}</Temperature>
            <Conditions>{data.weather[0].description}</Conditions>
          </div>
          <ImageContainer>
            <Image
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            />
          </ImageContainer>
        </DetailsBox>
      </StyledCard>
      <StyledCard bgcolor="#FFC300">
        <Text fontWeight={600}>Fells like </Text>
        <DetailsBox>
          {" "}
          <Temperature>{getTempCelsius(data.main.feels_like)}</Temperature>
          <div>
            <StyledText size="18">
              sunrise: {format(fromUnixTime(data.sys.sunrise), "HH:mm")}
            </StyledText>
            <StyledText size="18">
              sunset: {format(fromUnixTime(data.sys.sunset), "HH:mm")}
            </StyledText>
          </div>
        </DetailsBox>
        <DetailsContainer>
          {Object.keys(renderedDetails).map((item, index) => (
            <DetilsItem key={index}>
              <StyledText color="#6e3f98">{detailsMap[item]}</StyledText>
              <StyledText>{renderedDetails[item]}</StyledText>
            </DetilsItem>
          ))}
        </DetailsContainer>
      </StyledCard>
    </>
  );
};

export default DetailedWeather;
