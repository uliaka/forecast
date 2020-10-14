import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reduxReset from "redux-reset";

import reducer from "reducers";
import rootSaga from "sagas/index.js";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
//let composeEnhancers = compose
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const storeWithMiddlewares = composeEnhancers(
  applyMiddleware(...middlewares),
  reduxReset()
)(createStore);

const store = storeWithMiddlewares(reducer);

sagaMiddleware.run(rootSaga);

export default store;
