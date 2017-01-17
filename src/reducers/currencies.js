export const START_SYNC = 'app/currencies/START_SYNC';
export const STOP_SYNC = 'app/currencies/STOP_SYNC';
export const UPDATE = 'app/currencies/UPDATE';

export function startCurrenciesSync() {
    return {
        type: START_SYNC
    };
}

export function stopCurrenciesSync() {
    return {
        type: STOP_SYNC
    };
}

export function updateCurrencies(currencies) {
    return {
        type: UPDATE,
        payload: currencies
    };
}


const initialCurrencies = {
    GBP: {
        rates: {
            EUR: 1.12,
            USD: 1.54
        }
    },
    EUR: {
        rates: {
            GBP: 1.3,
            USD: 1.5
        }
    },
    USD: {
        rates: {
            EUR: 1.35,
            GBP: 1.54
        }
    },
};

export default function currencies(state = initialCurrencies, action) {
    switch (action.type) {
        case UPDATE:
            return action.payload;
        default:
            return state;
    }
}