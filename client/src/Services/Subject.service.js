import http from '../Common/js/http';

const Subject = {
   async getById(id) {
      try {
         return http.get(`/subject/${id}`);
      } catch (error) {
         console.log(error);
      }
   },
   async getAllSubjectsOfUserId(id, token) {
      try {
         return http.get(`/user_subject/user/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async getAllsSubjectOfDepartmentId(id, token) {
      try {
         return http.get(`/subject/department/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async createSubjectDepartment(obj, token) {
      try {
         return http.post(`/subject/`, obj, {
            headers: {
               Authorization: `Bearer ${token}` //! admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async createSubjectUser(obj, token) {
      try {
         return http.post(`/user_subject/`, obj, {
            headers: {
               Authorization: `Bearer ${token}` //! admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateScoreById(id, obj, token) {
      try {
         return http.put(`/user_subject/subject/${id}`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateSubjectById(id, obj, token) {
      try {
         return http.put(`/subject/${id}`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async deleteUserSubjectById(id, token) {
      try {
         return http.delete(`/user_subject/subject/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async deleteSubjectById(id, token) {
      try {
         return http.delete(`/subject/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};

export default Subject;
