import { client } from '../Client';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
function loginUserRequest () {
  return {type: LOGIN_USER_REQUEST};
}

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
function loginUserSuccess (user) {
  return {type: LOGIN_USER_SUCCESS, user};
}

export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST';


export const SAVE_USER_FAILURE = 'SAVE_USER_FAILURE';


export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';


export function login (user) {
  return function (dispatch) { 
      //console.log(user);
      const newUser = {
        firstName: user._profile.name, 
        lastName: user._profile.lastName,
        username: user._profile.email.replace(/[^\w\s!?]/g,''),
        email: user._profile.email,
        timezone: '',
        preferredLanguages: '',
        token: user._token.accessToken,
      };
    
    dispatch(loginUserRequest())
      client.login(newUser)
      .then((resp) => { dispatch(loginUserSuccess(resp)) }) //
      //.catch((err) => { dispatch(savePeopleFailure(err)) })
    //})
  }
}


const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);
