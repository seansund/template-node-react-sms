export const name = "counter";

export const INCREMENT_COUNT = `${name}/INCREMENT_COUNT`;
export const DECREMENT_COUNT = `${name}/DECREMENT_COUNT`;
export const SET_COUNT = `${name}/SET_COUNT`;
export const FETCH_RANDOM_COUNT = `${name}/FETCH_RANDOM_COUNT`;
const SET_ERROR = `${name}/SET_ERROR`;

// Reducer

const initialState = {
  count: 0,
  error: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return Object.assign({}, state, { count: state.count + 1 });
    case DECREMENT_COUNT:
      return Object.assign({}, state, { count: state.count - 1 });
    case SET_COUNT:
      return Object.assign({}, state, { count: action.count });
    case SET_ERROR:
      return Object.assign({}, state, { error: action.error });
    default:
      return state;
  }
}

// Actions

export function incrementCount() {
  return { type: INCREMENT_COUNT };
}

export function decrementCount() {
  return { type: DECREMENT_COUNT };
}

export function setCount(count) {
  return { type: SET_COUNT, count };
}

export function fetchRandomCount() {
  return { type: FETCH_RANDOM_COUNT };
}

export function setError(error) {
  return { type: SET_ERROR, error };
}

// Selectors

export const getCount = state => state[name].count;
export const getError = state => state[name].error;
