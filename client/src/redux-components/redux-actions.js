import { client } from '../Client';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
function loginUserRequest () {
  return {type: LOGIN_USER_REQUEST};
}

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
function loginUserSuccess (people) {
  return {type: LOGIN_USER_SUCCESS, people};
}

export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST';


export const SAVE_USER_FAILURE = 'SAVE_USER_FAILURE';


export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';



export function login () {
  return function (dispatch) {
    dispatch(loginUserRequest())
    return delay(2000).then(() => {
      client.login().then((user) => {
      //dispatch(loginUserRequest(people))
      console.log(user);
    })
    });
  }
}


const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);


/*export function savePeople (people) {
  return function (dispatch) {
    dispatch(savePeopleRequest())
    apiClient.savePeople(people)
      .then((resp) => { dispatch(savePeopleSuccess(people)) })
      .catch((err) => { dispatch(savePeopleFailure(err)) })
  }
}

const apiClient = {
  loadPeople: function () {
    return {
      then: function (cb) {
        setTimeout( () => {
          cb(JSON.parse(localStorage.people || '[]'))
        }, 1000);
      }
    }
  },

  savePeople: function (people) {
    const success = !!(this.count++ % 2);

    return new Promise(function (resolve, reject) {
      setTimeout( () => {
        if (!success) return reject({success});

        localStorage.people = JSON.stringify(people);
        resolve({success});
      }, 1000);
    })
  },

  count: 1
}*/