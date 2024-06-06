import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'http://31.129.63.84:8080' : 'http://localhost:8080';

console.log(`Running in ${process.env.NODE_ENV} mode. Using baseURL: ${baseURL}`);

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
