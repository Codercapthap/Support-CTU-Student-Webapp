import http from '../Common/js/http';

const User = {
   async getUserById(id, token) {
      try {
         return http.get(`/user/${id}`, {
            headers: {
               Authorization: `${token}`
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
               Authorization: `${token}` //moderator, admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async createUser(obj, token) {
      try {
         return http.delete(`/user/create`, obj, {
            headers: {
               Authorization: `${token}` // admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateUser(obj, token) {
      /**
       * username, gender, birthday, email, phone, address,
       * id = req.user.id
       */
      try {
         return http.delete(`/user/create`, obj, {
            headers: {
               Authorization: `${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async getAllUsersOfDepartmentId(id, token) {
      try {
         return http.post(`/user/department/${id}`, {
            headers: {
               Authorization: `${token}`
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
               Authorization: `${token}`
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
               Authorization: `${token}` // admin
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
               Authorization: `${token}` // moderator, admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateAvatar(id, avatarUrl, token) {
      try {
         return http.post(`/user/${id}/update_avatar`, avatarUrl, {
            headers: {
               Authorization: `${token}` //! admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};

export default User;
