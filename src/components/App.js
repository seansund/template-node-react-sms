import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CounterPage from "./counter/CounterPage";
import AboutPage from "./AboutPage";
import { GlobalStyle } from "./common";

export default function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route exact path="/" component={CounterPage} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Fragment>
  );
}
