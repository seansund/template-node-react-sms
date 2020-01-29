import { call, put, takeEvery, all } from "redux-saga/effects";
import { fetchJson } from "../utils/fetch";
import * as counter from "./counter";

export function* fetchRandomCount() {
  try {
    const json = yield call(fetchJson, "/api/random");
    yield put(counter.setCount(Number(json)));
  } catch (err) {
    yield put(counter.setError(err));
  }
}

export function* clearError() {
  yield put(counter.setError());
}

export function* watchFetchRandomCount() {
  yield takeEvery(counter.FETCH_RANDOM_COUNT, fetchRandomCount);
}

export function* watchCount() {
  const pattern = [counter.INCREMENT_COUNT, counter.DECREMENT_COUNT, counter.SET_COUNT];
  yield takeEvery(pattern, clearError);
}

export default function* rootSaga() {
  yield all([watchFetchRandomCount(), watchCount()]);
}
