import { MOVIE } from '../actions/types';
export default function movieAPI(state = { movieinfo: ['default'] }, action) {
  // console.log('reducer', action);
  switch (action.type) {
    case MOVIE:
      return { ...state, movieinfo: action.payload };
    default:
      return state;
  }
}
