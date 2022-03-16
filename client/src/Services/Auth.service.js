import http from '../Common/js/http';

const Auth = {
   async register(obj) {
      /**
       *    username,
            gender,
            departmentId,
            birthday,
            email,
            password,
            phone,
            avatarUrl,
            address
       */
      try {
         await http.post('/register', obj);
      } catch (error) {
         console.log(error);
      }
   },
   async login(obj) {
      /**
       * email,
         password
       */
      try {
         return http.post('/login', obj);
      } catch (error) {
         console.log(error);
      }
   },
   async logout(token) {
      // sent token to terminal session in server
      try {
         return http.post('/logout', {
            headers: {
               Authorization: `${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};

export default Auth;
