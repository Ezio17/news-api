import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

let items = {
  news: [],
  title: '',
  body: '',
  author: '',
}

const rootReducer = (state = items, action) => {
  switch (action.type) {

    case 'CHANGE_NEWS':
      return {
        ...state,
        news: action.payload,
      }

    case 'SET_INPUT': {
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        userId: action.payload.userId
      }
    }

    default:
      return state
  }
};

const middleware = applyMiddleware(promise, thunk, logger)
const configureStore = () => {
  const store = createStore(
    rootReducer,
    middleware,
  );

  return store;
};

export default configureStore;



