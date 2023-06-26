import http from '../Common/js/http';

const User = {
   async getUserById(id, token) {
      try {
         return await http.get(`/user/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async deleteUserById(id, token) {
      try {
         return http.delete(`/user/${id}`, {
            headers: {
               Authorization: `Bearer ${token}` //moderator, admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async createUser(obj, token) {
      try {
         return await http.post(`/user/create`, obj, {
            headers: {
               Authorization: `Bearer ${token}` // admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateUser(obj, token) {
      try {
         return http.delete(`/user/create`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async getAllUsersOfDepartmentId(id, token) {
      try {
         return http.get(`/user/department/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async resetPassword(obj, token) {
      /**
       * email,
         password
       */
      try {
         return http.post(`/user/department/reset_password`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateRole(id, token) {
      try {
         return http.post(`/user/${id}/role`, id, {
            headers: {
               Authorization: `Bearer ${token}` // admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async restoreAccount(id, token) {
      try {
         return http.post(`/user/${id}/restore`, id, {
            headers: {
               Authorization: `Bearer ${token}` // moderator, admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateAvatar(id, obj, token) {
      try {
         console.log('obj: ', obj, token);
         return http.patch(`/user/${id}/update_avatar`, obj, {
            headers: {
               Authorization: `Bearer ${token}` //! admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};

export default User;
