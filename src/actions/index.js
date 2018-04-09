import { FIND_STOCK_SUCCESS, FIND_STOCK_FAILURE, STOCK_ALREADY_FOUND } from './types'
import axios from 'axios'
import config from '../config'

export const findStock = inputVal => (dispatch, getState) => {
    const stockExistsInCache = getState().stock.stocks[inputVal.toUpperCase()]

    if (!stockExistsInCache){
        const urls = [config.COMPANY_URL(inputVal), config.PRICE_URL(inputVal)]
        const promises = urls.map(url => fetch(url).then(data => data.json()))

        Promise.all(promises)
            .then(data => {            
                dispatch({ 
                    type: FIND_STOCK_SUCCESS,
                    payload: { data: data[0], price: data[1] 
                }})
            })
            .catch(function() {
                dispatch({ type: FIND_STOCK_FAILURE, payload: 'Stock does not exist'})
            })
    } else {
        dispatch({ type: STOCK_ALREADY_FOUND, payload: inputVal })
    }
}