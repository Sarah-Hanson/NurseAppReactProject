import axios from 'axios';

export const axiosConfig = () => {
  // axios.defaults.baseURL = 'http://sarah-nurse-app.herokuapp.com';
  axios.defaults.baseURL = 'http://localhost';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};
