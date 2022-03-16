import http from '../Common/js/http';

class Comment {
   static async getAllComments() {
      try {
         let comment = await http.get('/comment');
         return comment;
      } catch (error) {
         console.log(error);
      }
      return new Error(`Can't get comment from server`);
   }
}

export default new Comment();
