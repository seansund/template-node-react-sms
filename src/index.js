import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import counter from "./redux/counter";
import counterSagas from "./redux/counterSagas";
import App from "./components/App";

function* sagas() {
  yield all([counterSagas()]);
}

const reducer = combineReducers({ counter });
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(reducer, enhancer);
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
