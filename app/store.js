import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducers/mainReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  mainReducer,
  applyMiddleware(
    createLogger(),
    thunkMiddleware
  )
);

export default store;