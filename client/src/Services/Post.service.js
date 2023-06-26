import http from '../Common/js/http';

import storageKey from './localStorageKey';

const Post = {
   async getById(id) {
      ///post/unaccepted
      try {
         return http.get(`/post/${id}`);
      } catch (error) {
         console.log(error);
      }
   },
   async getAllByTopicId(id) {
      try {
         return http.get(`/post/topic/${id}`);
      } catch (error) {
         console.log(error);
      }
   },
   async getAllUnacceptPosts(token) {
      try {
         return http.get(`/post/unaccepted`, {
            headers: {
               Authorization: `Bearer ${token}` //! admin
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async create(obj, token) {
      try {
         return http.post(`/post`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async updateById(id, obj, token) {
      try {
         return http.put(`/post/${id}`, obj, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async acceptPostById(id, token) {
      try {
         return await http.get(`/post/${id}/accept`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async deleteById(id, token) {
      try {
         return http.delete(`/post/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   },
   async destroyById(id, token) {
      try {
         return http.delete(`/post/${id}/destroy`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};

export default Post;
