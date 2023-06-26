// import StorageKeys from '../constants/storage-keys';
import http from '../Common/js/http';

const Auth = {
   async register(obj) {
      try {
         const res = await http.post(`/auth/register`, obj);
         return res;
      } catch (error) {
         console.log(error);
      }
   },
   login(data) {
      const url = 'auth/login/';
      return http.post(url, data);
   },
   logout(token) {
      const url = '';
      return http.post(url, {
         headers: {
            Authorization: `${token}`
         }
      });
   }
};

export default Auth;

// async getUser(params) {
//    const newParams = { ...params };
//    const accessToken = localStorage.getItem(StorageKeys.access);
//    const url = `users/`;
//    const response = await axiosClient.get(url, {
//       params: { ...newParams },
//       headers: {
//          Authorization: `Bearer ${accessToken}`
//       }
//    });
//    return response;
// },
// async getProfile(params) {
//    const newParams = { ...params };
//    const accessToken = localStorage.getItem(StorageKeys.access);
//    const response = await axiosClient.get(`/detail/`, {
//       params: { ...newParams },
//       headers: {
//          Authorization: `Bearer ${accessToken}`
//       }
//    });
//    return response;
// }
