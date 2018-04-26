import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS
  SAVE_USER_REQUEST, SAVE_USER_FAILURE, SAVE_USER_SUCCESS
} from './redux-actions.js';

const initialState = {
  isLoading: false,
  saveStatus: 'READY',
  user: {
    name: '',
    email: '',
    password: '',
    country: null
  },
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });
    default:
      return state;
  }
}