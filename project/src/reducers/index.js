import { combineReducers } from 'redux';
import user from './user_reducer';
import logdata from './logdata_reducer';
import socket from './socket_reducer';
import date from './date_reducer';

const rootReducer = combineReducers({
  user,
  logdata,
  socket,
  date,
});

export default rootReducer;
