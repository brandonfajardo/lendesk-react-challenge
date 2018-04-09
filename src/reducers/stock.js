import { 
    FIND_STOCK_SUCCESS, 
    FIND_STOCK_FAILURE, 
    STOCK_ALREADY_FOUND 
} from '../actions/types'

const initialState = {
    mostRecentStockFound: '',
    stocks: {},
    error: null,
}

const stock = (state = initialState, action) => {
    switch(action.type){
        case FIND_STOCK_SUCCESS:
            const { data: { description, symbol }, price } = action.payload
            return {
                mostRecentStockFound: symbol,
                stocks: {
                    ...state.stocks,
                    [symbol]: {
                        price,
                        description,
                        symbol
                    }
                },
                error: null
            }
        case FIND_STOCK_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case STOCK_ALREADY_FOUND: 
            return {
                ...state,
                mostRecentStockFound: action.payload,
                error: null
            }
        default:
            return state
    }
}

export default stock