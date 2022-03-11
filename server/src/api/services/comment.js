const connection = require('../../config/db.config');
const { getTime } = require('../helpers/support');

class Comment {
   constructor(comment) {
      (this.commentContent = comment.commentContent),
         (this.createdAt = comment.createdAt || null),
         (this.updatedAt = comment.updatedAt || null),
         (this.isDeleted = comment.isDeleted || false),
         (this.deletedAt = comment.deletedAt || null);
   }

   static findCommentsByIdList(idList) {
      return new Promise(function (resolve, reject) {
         if (idList.length != 0) {
            connection.query(
               'SELECT * FROM comment where id in ?',
               [[idList]],
               function (err, result, fields) {
                  if (err) reject(err);
                  else resolve(result);
               }
            );
         } else resolve([]);
      });
   }

   static findComments(key, value) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM comment where ' + key + ' = ?',
            value,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static findCommentById(id) {
      return new Promise(function (resolve, reject) {
         connection.query('SELECT * FROM comment where id = ?', id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result[0]);
         });
      });
   }

   save(userId) {
      var values = [[userId, this.commentContent]];
      return new Promise(function (resolve, reject) {
         var sql = 'INSERT INTO comment (user_id, comment_content) VALUES ?';
         connection.query(sql, [values], async function (err, result, fields) {
            if (err) reject(err);
            else {
               const newComment = await Comment.findCommentById(result.insertId);
               resolve(newComment);
            }
         });
      });
   }

   static findOneAndUpdate(id, newComment) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE comment set comment_content = ? where id = ?';
         var values = [newComment.commentContent, id];
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static deleteOneById(id) {
      return new Promise(function (resolve, reject) {
         const deletedAt = getTime();
         var sql = 'UPDATE comment set is_deleted = 1, deleted_at = ? WHERE id = ?';
         connection.query(sql, [deletedAt, id], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static deleteComments(deletedAt, idList) {
      return new Promise(function (resolve, reject) {
         if (idList.length !== 0) {
            connection.query(
               'UPDATE comment set is_deleted = 1, deleted_at = ? where id in ?',
               [deletedAt, [idList]],
               function (err, result, fields) {
                  if (err) reject(err);
                  else resolve(result);
               }
            );
         }
         resolve();
      });
   }

   static restoreOneById(id) {
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE comment set is_deleted = 0, deleted_at = null WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static restoreComments(idList) {
      return new Promise(function (resolve, reject) {
         if (idList.length != 0) {
            connection.query(
               'UPDATE comment set is_deleted = 0, deleted_at = null where id in ?',
               [[idList]],
               function (err, result, fields) {
                  if (err) reject(err);
                  else resolve(result);
               }
            );
         }
         resolve();
      });
   }

   static destroyOneById(id) {
      return new Promise(function (resolve, reject) {
         var sql = 'DELETE FROM comment WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static destroyComments(idList) {
      return new Promise(function (resolve, reject) {
         if (idList.length != 0) {
            connection.query(
               'DELETE FROM subject_comment where comment_id in ?',
               [[idList]],
               function (err, result, fields) {
                  if (err) reject(err);
               }
            );
            connection.query(
               'DELETE FROM comment where id in ?',
               [[idList]],
               function (err, result, fields) {
                  if (err) reject(err);
                  else resolve(result);
               }
            );
         } else resolve();
      });
   }
}

module.exports = Comment;
