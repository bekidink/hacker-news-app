import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});