import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTH_USER,
  /* COOKIE_USER, */
} from '../actions/types';
const initState = {
  loginSuccess: {
    loginSuccess: false,
    userId: '',
    userEmail: '',
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
        loginSuccess: {
          loginSuccess: false,
          userId: '',
          userEmail: '',
          permission: 'default',
        },
      };
    /* case COOKIE_USER:
      return { ...state, cookieData: action.payload }; */
    case AUTH_USER:
      return { ...state, userData: action.payload };
    /*  break;/ */
    default:
      return state;
  }
}
