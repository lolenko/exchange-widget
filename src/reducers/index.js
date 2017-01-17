import { combineReducers } from 'redux'
import currencies from './currencies'
import wallet from './wallet'

export default combineReducers({
    currencies,
    wallet
});