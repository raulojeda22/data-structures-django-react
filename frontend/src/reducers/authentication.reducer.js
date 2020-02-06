import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case userConstants.REGISTER_SUCCESS:
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.user
      };
    case userConstants.REGISTER_FAILURE:
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: undefined
      };
    default:
      return state
  }
}