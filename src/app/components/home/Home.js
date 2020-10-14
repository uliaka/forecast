import React from "react";
import styled from "styled-components";
import Search from "components/search/Search";
import RecentlyRequestedCities from "components/recentlyrequested/RecentlyRequestedCities";

export const Header = styled.div`
  background: #6e3f98;
  font-size: 2rem;
  padding: 2rem;
  color: white;
`;

const Home = () => (
  <>
    <Header>The Forecast app</Header>
    <Search />
    <RecentlyRequestedCities />
  </>
);

export default Home;
