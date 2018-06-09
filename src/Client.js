/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch';

const SESSION_STORAGE_KEY = 'fsr-cms-auth';
const CMS_BASE_URI = 'http://localhost:8080/app/api'//'https://api.spotify.com/v1';

// There are risks with using localStorage for API tokens in a production
// application. You open yourself up to XSS attacks. If malicious
// JavaScript makes it into your app, that JavaScript will have access
// to localStorage and therefore any sensitive tokens.

// For more info on token management, see this article:
// https://auth0.com/blog/cookies-vs-tokens-definitive-guide/

class Client {

  constructor() {
    this.useSessionlStorage = (typeof sessionStorage !== 'undefined');
    this.subscribers = [];

    if (this.useSessionlStorage) {
      this.token = sessionStorage.getItem(SESSION_STORAGE_KEY);
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  setToken(token) {
    this.token = token;

    if (this.useSessionlStorage) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useSessionlStorage) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }

  _get(url, body) {
    const bodyParams = Object.keys(body).map( key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
    }).join('&');

    return fetch(url +'?' + bodyParams, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        //  body: JSON.stringify(body),
      }).then(this.checkStatus)
  }

  _post(url, body) {
    return fetch(url, {
        method: 'post',
        headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(body),
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  _put(url, body) {
    return fetch(url, {
        method: 'put',
        headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(body),
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  login(user) {
    const url = CMS_BASE_URI + '/register';
    return this._get(url, user)
            .then(this.parseJson)
            .then((json) => {
              this.setToken("token"); 
              return json
            });
  }

  redirectCMS(user) {
    console.log(user);
    const url = CMS_BASE_URI + '/redirect';
    return this._get(url, user)
            .then((json) => {
              window.location = json.url;
              console.log(json);
            });
  }

  uploadCV(cv) {
    console.log(cv);
    const url = CMS_BASE_URI + '/user/extra/file';
    return this._put(url, cv).then((data) => data);
  }

  saveProfile(profile) {
    const url = CMS_BASE_URI + '/user/extra';
    //const body = {...profile, token: this.token};
    return this._post(url, profile).then((data) => data);
  }

  logout() {
    this.removeToken();
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      console.log(response.statusText);
      const error = {};
      //const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  parseJson(response) {
    return response.json();
  }
}

export const client = new Client();