import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Error from "components/ui/error/Error";
import styled, { css } from "styled-components";

const Input = styled.input`
  padding: 0.4rem;
  font-size: 1.2rem;
  outline: none;
  margin-left: 1rem;
`;

const SearchWrapper = styled.div`
  display: flex;
`;

export const Loading = styled.div`
  background: #009933;
  color: white;
  padding: 0.5rem;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 1rem 0 1rem 0;
  background: #b58adb;
`;

const Button = styled.button`
  background: #52346e;
  color: white;
  outline: none;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      background: #0099ff;
    `}
`;

const Search = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const handleSearchChange = (e) => setCity(e.target.value);
  const { error, loading } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (city) {
      dispatch({
        type: "REQUEST_CITY_WEATHER",
        city: city,
      });
    }
  };

  return (
    <SearchContainer>
      {loading && <Loading>loading...</Loading>}
      {error && <Error text={error} />}
      <SearchWrapper>
        <Input
          type="text"
          onChange={handleSearchChange}
          placeholder="Enter the city"
          disabled={loading}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? `Searching ${city}...` : "Search for weather"}
        </Button>
      </SearchWrapper>
    </SearchContainer>
  );
};

export default Search;
