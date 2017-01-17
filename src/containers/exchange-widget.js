import { connect } from 'react-redux';
import ExchangeWidget from 'exchange-widget';
import * as currenciesActions from 'reducers/currencies'
import * as walletActions from 'reducers/wallet'

export default connect(
    ({currencies, wallet}) => ({currencies, wallet}),
    dispatch => ({
        onFullfiled: () => dispatch(currenciesActions.startCurrenciesSync()),    
        onEmpty: () => dispatch(currenciesActions.stopCurrenciesSync()),    
        onExchange: (payload) => dispatch(walletActions.exchange(payload)),    
    })
)(ExchangeWidget);