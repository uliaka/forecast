import { takeLatest, put, select, call, all } from "redux-saga/effects";
import axios from "axios";
import { weather } from "types";

const appId = "74b2b48981f11ff6f8f767842920cff3";

function* requestWeatherSaga({ city }) {
  try {
    const requestedCities = yield select((state) => state.weather.cities);
    const requested = requestedCities.find((c) => c.city === city);
    if (requested) {
      yield put({
        type: weather.REQUESTED_CITY_ON_TOP,
        payload: {
          city,
        },
      });
      return;
    }

    yield put({
      type: weather.REQUEST_CITY_WEATHER_PENDING,
      payload: {
        city,
      },
    });
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`;
    const { data } = yield call(axios.get, url);

    yield put({
      type: weather.REQUEST_CITY_WEATHER_FULFILLED,
      payload: {
        data,
        city,
      },
    });
  } catch (error) {
    yield put({
      type: weather.REQUEST_CITY_WEATHER_REJECTED,
      payload: {
        message: error.message,
      },
    });
  }
}

function* requestDetailedWeatherSaga({ currentCity }) {
  try {
    yield put({
      type: weather.REQUEST_DETAILED_WEATHER_PENDING,
    });

    const {
      data: { name },
    } = currentCity;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=74b2b48981f11ff6f8f767842920cff3`;
    const { data } = yield call(axios.get, url);
    yield put({
      type: weather.REQUEST_DETAILED_WEATHER_FULFILLED,
      payload: { name, data },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: weather.REQUEST_DETAILED_WEATHER_REJECTED,
      message: error.message,
    });
  }
}

export function* weatherSaga() {
  yield takeLatest(weather.REQUEST_CITY_WEATHER, requestWeatherSaga);
  yield takeLatest(
    weather.REQUEST_DETAILED_WEATHER,
    requestDetailedWeatherSaga
  );
}
