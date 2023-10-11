import { combineReducers, createStore } from 'redux';
import cartReducer from './cart';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
