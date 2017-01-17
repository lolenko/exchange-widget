import React from 'react';
import ReactDOM from 'react-dom';
import ExchangeWidget from 'containers/exchange-widget';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import app from 'reducers';
import createSagaMiddleware from 'redux-saga';
import currenciesSyncSaga from 'sagas/currencies-sync';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  app,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(currenciesSyncSaga);

ReactDOM.render(
  <Provider store={store}>
    <ExchangeWidget />
  </Provider>,
  document.getElementById('root')
);
