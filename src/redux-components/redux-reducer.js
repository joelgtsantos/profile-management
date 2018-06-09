import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  SAVE_PROFILE_REQUEST, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAILURE
} from './redux-actions.js';

const initialState = {
  saveStatus: 'READY',
  loginInProgress: false,
  shouldRedirect: false,
  user: {},
  profile: {
    name: '',
    email: ''
  },
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        loginInProgress: true
      });
    case LOGIN_USER_SUCCESS:
      console.log(action);
      return Object.assign({}, state, {
        shouldRedirect: true,
        user: action.user
      });
    case SAVE_PROFILE_REQUEST:
      return Object.assign({}, state, {
        saveStatus: 'SAVING'
      });
    case SAVE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        saveStatus: 'SUCCESS'
      });
    default:
      return state;
  }
}