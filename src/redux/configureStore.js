import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';

// Todo: 미들웨어, react-hot-loader 적용
const configureStore = (initialState) => {
  const store = createStore(modules, composeWithDevTools());
  return store;
}

export default configureStore;