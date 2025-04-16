import { USER_LOGOUT, SET_USER, SET_TOKEN } from '../actions/userActions';

const initialState = {
  currentUser: null,
  token: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
} 