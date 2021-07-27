import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import base from './base';
import auth from './auth';

export default combineReducers({
  base,
  auth,
  pender: penderReducer
});