import { testSaga } from "redux-saga-test-plan";
import { fetchJson } from "../utils/fetch";
import * as sagas from "./counterSagas";
import * as counter from "./counter";

describe("fetchRandomCount()", () => {
  const url = "/api/random";

  test("retrieves a random count from the server and puts SET_COUNT to store count", () => {
    testSaga(sagas.fetchRandomCount)
      .next()
      .call(fetchJson, url)
      .next(123)
      .put(counter.setCount(123))
      .next()
      .isDone();
  });

  test("handles a fetch error by putting SET_ERROR", () => {
    const error = new TypeError("Failed to fetch");
    testSaga(sagas.fetchRandomCount)
      .next()
      .call(fetchJson, url)
      .throw(error)
      .put(counter.setError(error))
      .next()
      .isDone();
  });
});

describe("clearError()", () => {
  test("puts SET_ERROR to clear any error", () => {
    testSaga(sagas.clearError)
      .next()
      .put(counter.setError())
      .next()
      .isDone();
  });
});
