import http from '../Common/js/http';

import storageKey from './localStorageKey';

const Comment = {
   async getAllByPostId(id) {
      try {
         const res = await http.get(`/comment/post/${id}`);
         return res;
      } catch (error) {
         console.log(error);
      }
   },
   async createInPostId(obj, token) {
      try {
         const res = await http.post(`/comment/post/`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         return res;
      } catch (error) {
         console.log(error);
      }
   },
   async createInSubjectId(obj, token) {
      try {
         const res = await http.post(`/comment/subject/`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         return res;
      } catch (error) {
         console.log(error);
      }
   },
   async getAllBySubjectId(id) {
      try {
         const res = await http.get(`/comment/subject/${id}`);
         return res;
      } catch (error) {
         console.log(error);
      }
   },
   async updateById(id, obj) {
      try {
         const res = await http.update(`/comment/${id}`, obj);
         return res;
      } catch (error) {
         console.log(error);
      }
   },
   async deletelById(id) {
      try {
         const res = await http.delete(`/comment/${id}`);
         return res;
      } catch (error) {
         console.log(error);
      }
   },

   async destroyByPostId(id) {
      try {
         const accessToken = localStorage.getItem(storageKey.user.accessToken);
         const res = await http.delete(`/comment/${id}/post/destroy`, {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
         });
         return res;
      } catch (error) {
         console.log(error);
      }
   },

   async destroyBySubjectId(id) {
      try {
         const res = await http.delete(`/comment/${id}/subject/destroy`);
         return res;
      } catch (error) {
         console.log(error);
      }
   }
};

export default Comment;
