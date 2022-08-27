import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Map from "./Map";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/edit/:_id" component={Edit} />
      <Route exact path="/add" component={Add} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
}