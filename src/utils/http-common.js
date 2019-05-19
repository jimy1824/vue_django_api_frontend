// import dotenv from 'dotenv'
//
// dotenv.config();

import axios from 'axios'

export const BASE_URL = 'http://127.0.0.1:8000/';


var headers = {'Content-Type': 'application/json'};
let user_token = localStorage.getItem('user-token');

if (user_token) {
  headers['Authorization'] = 'JWT ' + user_token;
}

export const http = axios.create({
  baseURL: BASE_URL,
  headers: headers
});

export default http
