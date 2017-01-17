export const EXCHANGE = 'app/wallet/EXCHANGE';

export function exchange(payload) {
    return {
        type: EXCHANGE,
        payload
    };
}

const initialWallet = {
    GBP: 368,
    EUR: 564,
    USD: 798,
};

export default function wallet(state = initialWallet, action) {
    switch (action.type) {
        case EXCHANGE:
            const {from, to} = action.payload;
            return Object.assign({}, state, {
                [from.currency]: state[from.currency] - from.amount, 
                [to.currency]: state[to.currency] + to.amount, 
            });
        default:
            return state;
    }
}