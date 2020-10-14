import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "components/home/Home";
import SpecificWeather from "components/specificweather/SpecificWeather";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/weather/:id" exact component={SpecificWeather} />
  </Switch>
);

export default Routes;
