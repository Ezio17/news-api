import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

let items = {
  news: []
}

const rootReducer = (state = items, action) => {
  switch (action.type) {

    case 'CHANGE_NEWS':
      return {
        news: action.payload,
      }

    default:
      return state
  }
};

const middleware = applyMiddleware(promise, thunk)
const configureStore = () => {
  const store = createStore(
    rootReducer,
    middleware,
  );

  return store;
};

export default configureStore;



