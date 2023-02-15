import { combineReducers } from 'redux';
import user from './user_reducer';
import movie from './movie_reducer';
import socket from './socket_reducer';

const rootReducer = combineReducers({
  user,
  movie,
  socket,
});

export default rootReducer;
