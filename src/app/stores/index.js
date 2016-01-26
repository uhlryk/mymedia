import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default (reducer, initialState) => applyMiddleware(thunk)(createStore)(reducer, initialState);

