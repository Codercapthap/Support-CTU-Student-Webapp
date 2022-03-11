const connection = require('../../config/db.config');
const Comment = require('./comment');

class PostComment extends Comment {
   constructor(postComment) {
      super(postComment);
   }

   async save(userId, postId) {
      var comment = await super.save(userId);
      var values = [[comment.id, postId]];
      return new Promise(function (resolve, reject) {
         const sql = 'INSERT INTO post_comment (comment_id, post_id) VALUES ?';
         connection.query(sql, [values], function (err, result, fields) {
            if (err) reject(err);
            else resolve(comment);
         });
      });
   }

   static async destroyOneByCommentId(id) {
      const sql = 'DELETE FROM post_comment WHERE comment_id = ?';
      connection.query(sql, id, function (err, result, fields) {
         if (err) reject(err);
      });
      return await super.destroyOneById(id);
   }

   static findCommentIds(id) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT comment_id FROM post_comment where post_id = ?',
            id,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result.map(a => a.comment_id));
            }
         );
      });
   }

   static async findComments(id) {
      var idList = await PostComment.findCommentIds(id);
      return await super.findCommentsByIdList(idList);
   }

   static async deleteComments(deletedAt, id) {
      var idList = await PostComment.findCommentIds(id);
      return await super.deleteComments(deletedAt, idList);
   }

   static async destroyComments(id) {
      var idList = await PostComment.findCommentIds(id);
      connection.query(
         'DELETE FROM post_comment where post_id = ?',
         id,
         function (err, result, fields) {
            if (err) reject(err);
         }
      );
      return await super.destroyComments(idList);
   }

   static async restoreComments(id) {
      var idList = await PostComment.findCommentIds(id);
      return await super.restoreComments(idList);
   }
}

module.exports = PostComment;
