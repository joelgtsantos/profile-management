/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch';

const LOCAL_STORAGE_KEY = 'fsr-cms-auth';
const CMS_BASE_URI = 'http://localhost:8080/app/api/'//'https://api.spotify.com/v1';

// There are risks with using localStorage for API tokens in a production
// application. You open yourself up to XSS attacks. If malicious
// JavaScript makes it into your app, that JavaScript will have access
// to localStorage and therefore any sensitive tokens.

// For more info on token management, see this article:
// https://auth0.com/blog/cookies-vs-tokens-definitive-guide/

class Client {

  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    this.subscribers = [];

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
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


  login(user) {
    const url = CMS_BASE_URI + '/register';
    return this._post(url, user).then((data) => data);
  }

  saveProfile(profile) {
    const url = CMS_BASE_URI + '/register';
    const body = {...profile, token: this.token};
    return this._post(url, body).then((data) => data);
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