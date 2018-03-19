import fetch from 'isomorphic-fetch';
import 'whatwg-fetch'

const API_URL = `http://localhost:${process.env.PORT}/api`;

export default function callApi(endpoint, method = 'get', body) {
    return fetch(`http://localhost:3000/api/${endpoint}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(body)
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
  
      return json;
    })
    .then(
      response => response,
      error => error
    );
}

