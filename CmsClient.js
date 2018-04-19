/* eslint-disable prefer-template, new-cap */
import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import path from 'path';

// Credentials for 
const SPOTIFY_CLIENT_ID = '6518e61ac2a54a968ad5db5fc9d4806f';
const SPOTIFY_CLIENT_SECRET = '24492f0774a0437181877887cb68ac9e';
const BASE_64_ENCODED_CLIENT_CREDENTIALS = '';//btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log('Error communicating with CMS:');
    console.log(error);
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

const CMS_BASE_URI = 'http://localhost:8080/app/api/'//'https://api.spotify.com/v1';

const CmsClient = {

  _getWithToken(url, token) {
    return fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(checkStatus)
      .then(parseJson)
      .then((data) => data);//camelcaseKeys(data, { deep: true }));
  },

  _get(url) {
    if (this.token) {
      return this._getWithToken(url, this.token)
    } else {
      return this._getApiToken().then((token) => (
        this._getWithToken(url, token)
      ));
    }
  },

  _getApiToken() {
    return fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${BASE_64_ENCODED_CLIENT_CREDENTIALS}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(checkStatus)
      .then(parseJson)
      .then((json) => json.access_token)
      .then((token) => this.token = token)
  },

  getAlbum(albumId) {
    return this._get(
      CMS_BASE_URI + '/albums/' + albumId
    ).then((data) => data);
  },
}

export default CmsClient;
