import { weather } from "types";

export const INITIAL_STATE = {
  cities: [],
  loading: false,
  error: null,
  currentCity: null,
  detailedForecast: {
    loading: false,
    error: false,
  },
};

const makeReducer = (initialState, fns) => (state, action) => {
  if (typeof state === "undefined" && typeof initialState !== "undefined") {
    return initialState;
  } else if (fns[action.type]) {
    return fns[action.type](state, action);
  }
  return state;
};

export default makeReducer(INITIAL_STATE, {
  [weather.REQUEST_CITY_WEATHER_PENDING]: (state, { payload: { city } }) => ({
    ...state,
    loading: true,
  }),
  [weather.REQUEST_CITY_WEATHER_FULFILLED]: (
    state,
    { payload: { data, city } }
  ) => ({
    ...state,
    cities: [{ city, data }].concat(state.cities),
    currentCity: city,
    error: null,
    loading: false,
  }),
  [weather.REQUEST_CITY_WEATHER_REJECTED]: (
    state,
    { payload: { message } }
  ) => ({
    ...state,
    error: message,
    loading: false,
  }),

  [weather.REQUEST_DETAILED_WEATHER_PENDING]: (state) => ({
    ...state,
    detailedForecast: {
      loading: true,
      error: null,
    },
  }),
  [weather.REQUEST_DETAILED_WEATHER_FULFILLED]: (
    state,
    { payload: { name, data } }
  ) => ({
    ...state,
    cities: state.cities.map((c) =>
      c.data.name === name
        ? {
            ...c,
            detailedForecast: data,
          }
        : c
    ),
    detailedForecast: {
      loading: false,
      error: null,
    },
  }),
  [weather.REQUEST_DETAILED_WEATHER_REJECTED]: (
    state,
    { payload: { message } }
  ) => ({
    ...state,
    detailedForecast: {
      loading: false,
      error: message,
    },
  }),
  [weather.REQUESTED_CITY_ON_TOP]: (state, { payload: { city } }) => ({
    ...state,
    cities: [state.cities.find((c) => c.city === city)].concat(
      state.cities.filter((c) => c.city !== city)
    ),
  }),
});
