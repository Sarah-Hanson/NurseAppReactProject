import axios from 'axios';

export const axiosConfig = () => {
  axios.defaults.baseURL = 'http://sarah-nurse-app.herokuapp.com';
  //axios.defaults.baseURL = 'https://127.0.0.1:8000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};
