import reducer, * as counter from "./counter";

function createState(moduleState = {}) {
  return { counter: moduleState };
}

describe("reducer", () => {
  const initialState = {
    count: 0,
    error: undefined
  };

  test("returns an initial state with a count of 0", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe("for no action", () => {
    test("returns the state unchanged", () => {
      const state = { count: 5 };
      expect(reducer(state, {})).toEqual(state);
    });
  });

  describe("for INCREMENT_COUNT", () => {
    test("returns the state with count incremented by 1", () => {
      const initial = { count: 5 };
      const expected = { count: 6 };
      expect(reducer(initial, counter.incrementCount())).toEqual(expected);
    });
  });

  describe("for DECREMENT_COUNT", () => {
    test("returns the state with count decremented by 1", () => {
      const initial = { count: 5 };
      const expected = { count: 4 };
      expect(reducer(initial, counter.decrementCount())).toEqual(expected);
    });
  });

  describe("for SET_COUNT", () => {
    test("returns the state with count set to the specified value", () => {
      const initial = { count: 5 };
      const expected = { count: 10 };
      expect(reducer(initial, counter.setCount(10))).toEqual(expected);
    });
  });

  describe("for SET_ERROR", () => {
    test("returns the state with the specified request error", () => {
      const error = new Error("Something went wrong");
      const expected = { error };
      expect(reducer({}, counter.setError(error))).toEqual(expected);
    });
  });
});

describe("actions", () => {
  describe("incrementCount()", () => {
    test("creates an INCREMENT_COUNT action", () => {
      const expected = { type: "counter/INCREMENT_COUNT" };
      expect(counter.incrementCount()).toEqual(expected);
    });
  });

  describe("decrementCount()", () => {
    test("creates a DECREMENT_COUNT action", () => {
      const expected = { type: "counter/DECREMENT_COUNT" };
      expect(counter.decrementCount()).toEqual(expected);
    });
  });

  describe("setCount()", () => {
    test("creates a SET_COUNT action with the specified value", () => {
      const expected = { type: "counter/SET_COUNT", count: 42 };
      expect(counter.setCount(42)).toEqual(expected);
    });
  });

  describe("fetchRandomCount()", () => {
    test("creates a FETCH_RANDOM_COUNT action", () => {
      const expected = { type: "counter/FETCH_RANDOM_COUNT" };
      expect(counter.fetchRandomCount()).toEqual(expected);
    });
  });

  describe("setError()", () => {
    test("creates a SET_ERROR action", () => {
      const error = new Error("Something went wrong");
      const expected = { type: "counter/SET_ERROR", error };
      expect(counter.setError(error)).toEqual(expected);
    });
  });
});

describe("selectors", () => {
  const error = new Error("Oops! Something went wrong");
  const state = createState({
    count: 5,
    error: error
  });

  describe("getCount()", () => {
    test("returns the count", () => {
      expect(counter.getCount(state)).toBe(5);
    });
  });

  describe("getRequestError()", () => {
    test("returns the request error", () => {
      expect(counter.getError(state)).toBe(error);
    });
  });
});
