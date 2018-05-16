import { client } from '../Client';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
function loginUserRequest () {
  return {type: LOGIN_USER_REQUEST};
}

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
function loginUserSuccess (user) {
  return {type: LOGIN_USER_SUCCESS, user};
}

export const SAVE_PROFILE_REQUEST = 'SAVE_PROFILE_REQUEST';
function saveProfileRequest () {
  return {type: SAVE_PROFILE_REQUEST};
}

export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
function saveProfileSuccess () {
  return {type: SAVE_PROFILE_SUCCESS};
}

export const SAVE_PROFILE_FAILURE = 'SAVE_PROFILE_FAILURE';
function saveProfileFailure () {
  return {type: SAVE_PROFILE_FAILURE};
}

export function login (user) {
  return function (dispatch) { 
      //console.log(user);
      const newUser = {
        id: 1,
        firstName: user._profile.name, 
        lastName: user._profile.lastName,
        username: user._profile.email.replace(/[^\w\s!?]/g,''),
        email: user._profile.email
        //timezone: '',
        //preferredLanguages: '',
        //token: user._token.accessToken,
      };
    
    dispatch(loginUserRequest())
      client.login(newUser)
      .then((resp) => {
        if (resp.redirect !== true){
          client.redirectCMS(resp)
          .then((resp) => { console.log(resp); })
          .catch((err) => { console.log(err); })
          //console.log(resp);
        }else{
          dispatch(loginUserSuccess(resp)) 
        }
      }) //
      //.catch((err) => { dispatch(savePeopleFailure(err)) })
    //})
  }
}

export function saveProfile (profile) {
  return function (dispatch) {    
      dispatch(saveProfileRequest())
      client.saveProfile(profile)
      .then((resp) => {
        /*client.uploadCV(cv)
        .then((resp) => { */
          dispatch(saveProfileSuccess(resp)) 
        /*});*/
      })
      .catch((err) => { dispatch(saveProfileFailure(err)) })
  }
}

export function redirectCMS (user) {
  console.log(user);
  return function (dispatch) {    
      
  }
}

const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);
