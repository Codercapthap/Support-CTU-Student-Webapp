import http from '../Common/js/http';

const TopicService = {
   async getById(id) {
      try {
         return http.get(`/topic/${id}`);
      } catch (error) {
         console.log(error);
      }
   },
   async getAllbyDepartmentId(id) {
      try {
         return http.get(`/topic/department/${id}`);
      } catch (error) {
         console.log(error);
      }
   },
   async create(obj, token) {
      try {
         return http.post(`/topic`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async deteteById(id, token) {
      try {
         return http.delete(`/topic/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateById(obj, token) {
      try {
         return http.update(`/topic`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};

export default TopicService;
