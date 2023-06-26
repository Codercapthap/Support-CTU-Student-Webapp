import http from '../Common/js/http';

const Department = {
   async getAlls(id) {
      try {
         return http.get(`/department`);
      } catch (error) {
         console.log(error);
      }
   },
   async getById(id) {
      try {
         return http.get(`/department/${id}`);
      } catch (error) {
         console.log(error);
      }
   }
};

export default Department;
