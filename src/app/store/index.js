import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from '../reducers';

export default function configureStore(initialState, history) {
  const middlewares = [
    promise(),
    thunk
  ];

  if (history) {
    middlewares.push(routerMiddleware(history));
  }

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const middleware = applyMiddleware(...middlewares);

  return createStore(reducers, initialState, middleware);
}
