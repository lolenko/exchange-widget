import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from 'reducers/currencies';
import { CURRENCIES } from 'constants/money';

function* fetchRatesFor(base, symbols = Object.keys(CURRENCIES)) {
  const response = yield call(fetch, `http://api.fixer.io/latest?base=${base}&symbols=${symbols.join()}`, {mode: 'cors'});
  const {rates, date} = yield call([response, response.json]);
  return {[base]: {rates, date}}

/*  return fetch(`http://api.fixer.io/latest?base=${base}&symbols=${symbols.join()}`, {mode: 'cors'})
  .then(response => response.json())
  .then(({rates, date}) => ({[base]: {rates, date}}));
*/}

const SYNC_INTERVAL = 30000;

function* bgSync() {
  try {
    while (true) {
      const result = yield Object.keys(CURRENCIES).map(curr => call(fetchRatesFor, curr));
      const currencies = result.reduce((currency, prev) => Object.assign(prev, currency), {});
      yield put(actions.updateCurrencies(currencies));
      yield call(delay, SYNC_INTERVAL);
    }
  } finally {
    if (yield cancelled()) { /* just cancel sync */ }
  }
}

export default function* main() {
  while (yield take(actions.START_SYNC)) {
    const bgSyncTask = yield fork(bgSync);
    yield take(actions.STOP_SYNC);
    yield cancel(bgSyncTask);
  }
}