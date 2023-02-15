import { MOVIE } from '../actions/types';
export default function movieAPI(state = { movieinfo: 'default' }, action) {
  // console.log('reducer', action);
  switch (action.type) {
    case MOVIE:
      return { ...state, movieinfo: action.payload };
    default:
      return state;
  }
}

// switch (action.type) {
//   case LOGIN_USER:
//     return { ...state, loginSuccess: action.payload };
//     break;
//   case REGISTER_USER:
//     return { ...state, register: action.payload };
//     break;
//   default:
//    return state;
// }
