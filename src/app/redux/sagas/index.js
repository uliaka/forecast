import { all, fork } from "redux-saga/effects";
import { weatherSaga } from "sagas/weathersaga/weatherSaga";

export default function* rootSaga() {
  try {
    yield all([weatherSaga()]);
  } catch (err) {
    console.error(err);
  }
}
