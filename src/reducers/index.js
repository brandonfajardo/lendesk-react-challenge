import { combineReducers } from 'redux';
import stockReducer from './stock'

const rootReducer = combineReducers({
  stock: stockReducer
});

export default rootReducer;
