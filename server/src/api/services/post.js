const connection = require('../../config/db.config');
const { getTimestamp } = require('../helpers/support');
const PostComment = require('./postComment');

class Post {
   constructor(post) {
      (this.postTitle = post.postTitle),
         (this.postView = post.postView || 0),
         (this.postContent = post.postContent),
         (this.isAccepted = post.isAccepted || false),
         (this.createdAt = post.createdAt || null),
         (this.updatedAt = post.updatedAt || null),
         (this.isDeleted = post.isDeleted || false),
         (this.deletedAt = post.deletedAt || null);
   }

   static all() {
      return new Promise(function (resolve, reject) {
         connection.query('SELECT * FROM post', function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findPostById(id) {
      return new Promise(function (resolve, reject) {
         var sql = 'SELECT * FROM post where id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   save(userId, topicId) {
      var sql =
         'INSERT INTO post(user_id, topic_id, post_title, post_view, post_content, is_accepted) VALUES ?';
      var values = [
         [userId, topicId, this.postTitle, this.postView, this.postContent, this.isAccepted]
      ];
      return new Promise(function (resolve, reject) {
         connection.query(sql, [values], async function (err, result, fields) {
            if (err) reject(err);
            else {
               const newPost = await Post.findPostById(result.insertId);
               resolve(newPost);
            }
         });
      });
   }

   static findOneAndUpdate(id, newPost) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE post set post_title = ?, post_content = ? where id = ?';
         var values = [newPost.postTitle, newPost.postContent, id];
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async deleteOneById(id, deletedAt = getTimestamp()) {
      // delete comment
      await PostComment.deleteComments(deletedAt, id);
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE post set is_deleted = 1, deleted_at = ? WHERE id = ?';
         connection.query(sql, [deletedAt, id], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findPosts(key, value) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM post where ' + key + ' = ?',
            value,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static findPostsByDepartmentId(departmentId) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'select * from post where topic_id in (select id from topic where department_id = ?)',
            departmentId,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static async destroyOneById(id) {
      await PostComment.destroyComments(id);
      return new Promise(function (resolve, reject) {
         var sql = 'DELETE FROM post WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async restoreOneById(id) {
      await PostComment.restoreComments(id);
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE post set is_deleted = 0, deleted_at = null WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static acceptPostById(id) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE post set is_accepted = 1 WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static upPostViewById(id) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE post set post_view = post_view + 1 where id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static getAcceptedPosts() {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM post where is_accepted = 1',
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static getUnAcceptedPosts() {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM post where is_accepted = 0',
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static async deletePosts(deletedAt, key, value) {
      const idList = (await Post.findPosts(key, value)).map(a => a.id);
      return new Promise(async function (resolve, reject) {
         for (var i = 0; i < idList.length; ++i) {
            await Post.deleteOneById(idList[i], deletedAt);
         }
         resolve();
      });
   }

   static async destroyPosts(key, value) {
      const idList = (await Post.findPosts(key, value)).map(a => a.id);
      return new Promise(async function (resolve, reject) {
         for (var i = 0; i < idList.length; ++i) {
            await Post.destroyOneById(idList[i]);
         }
         resolve();
      });
   }

   static async restorePosts(key, value) {
      const idList = (await this.findPosts(key, value)).map(a => a.id);
      return new Promise(async function (resolve, reject) {
         for (var i = 0; i < idList.length; ++i) {
            await Post.restoreOneById(idList[i]);
         }
         resolve();
      });
   }
}

module.exports = Post;
