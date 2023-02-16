import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from '../actions/types';
const initState = {
  loginSuccess: {
    loginSuccess: false,
    userId: '',
    permission: 'default',
  },
};
// export default function user_reducer(state = {}, action) {
export default function user_reducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGOUT_USER:
      return {
        ...state,
        loginSuccess: false,
        userId: '',
        permission: 'default',
      };
    default:
      return state;
  }
}
