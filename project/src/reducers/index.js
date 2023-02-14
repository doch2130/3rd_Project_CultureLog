import { combineReducers } from 'redux';
import user from './user_reducer';
import movie from './movie_reducer';

const rootReducer = combineReducers({
  user,
  movie,
});

export default rootReducer;
