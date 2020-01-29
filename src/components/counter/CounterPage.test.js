import React from "react";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CounterPage from "./CounterPage.js";
import * as counter from "../../redux/counter";

const mockStore = configureStore();

function createStore(count = 0) {
  const state = { counter: { count } };
  return mockStore(state);
}

function renderWithStore(component, store) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
}

test("renders the count from the Redux store", () => {
  const { getByTestId } = renderWithStore(<CounterPage />, createStore(42));
  expect(getByTestId("count")).toHaveTextContent(/^42$/);
});

test("renders an increment button that dispatches an INCREMENT_COUNT action on click", () => {
  const store = createStore();
  const { getByTestId } = renderWithStore(<CounterPage />, store);

  fireEvent.click(getByTestId("increment"));
  expect(store.getActions()).toEqual([counter.incrementCount()]);
});

test("renders a decrement button that dispatches an DECREMENT_COUNT action on click", () => {
  const store = createStore();
  const { getByTestId } = renderWithStore(<CounterPage />, store);

  fireEvent.click(getByTestId("decrement"));
  expect(store.getActions()).toEqual([counter.decrementCount()]);
});

test("renders a reset button that dispatches a SET_COUNT action on click", () => {
  const store = createStore();
  const { getByTestId } = renderWithStore(<CounterPage />, store);

  fireEvent.click(getByTestId("reset"));
  expect(store.getActions()).toEqual([counter.setCount(0)]);
});

test("renders a radomize button that dispatches a FETCH_RANDOM_COUNT action on click", () => {
  const store = createStore();
  const { getByTestId } = renderWithStore(<CounterPage />, store);

  fireEvent.click(getByTestId("randomize"));
  expect(store.getActions()).toEqual([counter.fetchRandomCount()]);
});
