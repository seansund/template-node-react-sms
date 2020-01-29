import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import BackLink, { backState, canGoBack, goBack } from "./BackLink";

describe("backState()", () => {
  it("returns a state object with a true back property", () => {
    expect(backState()).toEqual({ back: true });
  });
});

describe("canGoBack()", () => {
  function createHistory(state) {
    return {
      location: { state }
    };
  }

  test("returns false if the current location has no state", () => {
    expect(canGoBack(createHistory())).toBe(false);
  });

  test("returns false if the current location state has no back property", () => {
    expect(canGoBack(createHistory({}))).toBe(false);
  });

  test("returns false if the current location state has a back property with value false", () => {
    expect(canGoBack(createHistory({ back: false }))).toBe(false);
  });

  test("returns false if the current location state has a back property with a falsey value", () => {
    expect(canGoBack(createHistory({ back: "" }))).toBe(false);
  });

  test("returns true if the current location state has a back property with value true", () => {
    expect(canGoBack(createHistory({ back: true }))).toBe(true);
  });

  test("returns false if the current location state has a back property with a truthy value", () => {
    expect(canGoBack(createHistory({ back: "yes" }))).toBe(false);
  });
});

describe("goBack()", () => {
  function createHistory(location) {
    return {
      location,
      push: jest.fn().mockName("push"),
      goBack: jest.fn().mockName("goBack")
    };
  }

  context("when location has back state to allow going back", () => {
    test("returns true", () => {
      const history = createHistory({ state: backState() });
      expect(goBack(history)).toBe(true);
    });

    test("calls history.goBack() and not push()", () => {
      const history = createHistory({ state: backState() });
      goBack(history);
      expect(history.goBack).toHaveBeenCalled();
      expect(history.push).not.toHaveBeenCalled();
    });
  });

  context("when location has no back state and a path is specified", () => {
    test("returns true", () => {
      const history = createHistory({});
      expect(goBack(history, "/")).toBe(true);
    });

    test("calls history.push() with the path and not goBack()", () => {
      const history = createHistory({});
      goBack(history, "/");
      expect(history.push).toHaveBeenCalledWith("/", undefined);
      expect(history.goBack).not.toHaveBeenCalled();
    });

    test("passes a state to push() if one is specified", () => {
      const history = createHistory({});
      const state = { p1: 1 };
      goBack(history, "/", state);
      expect(history.push).toHaveBeenCalledWith("/", state);
      expect(history.goBack).not.toHaveBeenCalled();
    });
  });

  describe("when location has no back state and no path is specified", () => {
    test("returns false", () => {
      const history = createHistory({});
      expect(goBack(history)).toBe(false);
    });

    test("does not call history.goBack() or push()", () => {
      const history = createHistory({});
      goBack(history);
      expect(history.push).not.toHaveBeenCalled();
      expect(history.goBack).not.toHaveBeenCalled();
    });
  });
});

describe("BackLink", () => {
  function MainPage() {
    return (
      <div data-testid="main-page">
        This is the main page."
        <Link to={{ pathname: "/detail", state: backState() }}>Detail</Link>
      </div>
    );
  }

  function DetailPage() {
    return (
      <div data-testid="detail-page">
        This is the detail page.
        <BackLink to="/">Back</BackLink>
      </div>
    );
  }

  function App(props) {
    return (
      <Router {...props}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/detail" component={DetailPage} />
        </Switch>
      </Router>
    );
  }

  function renderApp(path) {
    const history = createMemoryHistory({ initialEntries: [path] });
    return { ...render(<App history={history} />), history };
  }

  test("navigates forward to / after landing directly on /detail", async () => {
    const { getByTestId, getByText, history } = renderApp("/detail");
    getByTestId("detail-page");

    fireEvent.click(getByText("Back"));
    await waitForElement(() => getByTestId("main-page"));
    expect(history.length).toBe(2);
    expect(history.action).toBe("PUSH");
  });

  test("navigates back to / after in-app forward navigation to /detail", async () => {
    const { getByTestId, getByText, history } = renderApp("/");
    getByTestId("main-page");

    fireEvent.click(getByText("Detail"));
    await waitForElement(() => getByTestId("detail-page"));

    fireEvent.click(getByText("Back"));
    await waitForElement(() => getByTestId("main-page"));
    expect(history.length).toBe(2);
    expect(history.action).toBe("POP");
  });
});
