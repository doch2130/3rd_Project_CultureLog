import { MOVIE, BOOK } from '../actions/types';
export default function movieAPI(
  state = { movieinfo: ['default'], bookinfo: ['default'] },
  action
) {
  // console.log('reducer', action);
  switch (action.type) {
    case MOVIE:
      return { ...state, movieinfo: action.payload };
    case BOOK:
      return { ...state, bookinfo: action.payload };
    default:
      return state;
  }
}
