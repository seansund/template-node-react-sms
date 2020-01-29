import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore();

function createStore() {
  const state = { counter: { count: 0 } };
  return mockStore(state);
}

function renderWithRouter(path) {
  const history = createMemoryHistory({ initialEntries: [path] });
  const result = render(
    <Provider store={createStore()}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  return { ...result, history };
}

test("renders an About page for path /about", () => {
  const { getByTestId } = renderWithRouter("/about");
  getByTestId("about-page");
});

test("renders a Counter page for path /", () => {
  const { getByTestId } = renderWithRouter("/");
  getByTestId("counter-page");
});

test("redirects an unrecognized path to / and renders a Counter page", () => {
  const { getByTestId, history } = renderWithRouter("/invalid");
  expect(history.location.pathname).toBe("/");
  getByTestId("counter-page");
});
