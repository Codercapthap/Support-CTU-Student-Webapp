import axios from 'axios';

const http = axios.create({
   baseURL: 'http://localhost:3000/api/',
   headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

// // Add a response interceptor
// http.interceptors.response.use(
//    response => {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       return response.data;
//    },
//    error => {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       const { config, status, data } = error.response;
//       const urls = ['/auth/local/register', '/auth/local'];
//       if (urls.includes(config.url) && status === 401) {
//          const errorList = data.data || [];
//          const firstError = errorList.length > 0 ? errorList[0] : {};
//          const messageList = firstError.messages || [];
//          const firstMessage = messageList.length > 0 ? messageList[0] : {};
//          throw new Error(firstMessage.message);
//       }
//       return Promise.reject(error);
//    }
// );

export default http;
