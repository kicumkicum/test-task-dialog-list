import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const configureStore = (initialState = {}) => {
  const isChromeDevExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  const composeEnhancers = isChromeDevExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  const middlewares = [
    thunk,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  return createStore(rootReducer, initialState, composeEnhancers(...enhancers));
};

export default configureStore;
