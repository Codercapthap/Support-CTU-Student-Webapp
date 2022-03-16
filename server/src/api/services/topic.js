const connection = require('../../config/db.config');
const { getTimestamp } = require('../helpers/support');
const Post = require('./post');

class Topic {
   constructor(topic) {
      (this.topicName = topic.topicName),
         (this.topicDescription = topic.topicDescription),
         (this.createdAt = topic.createdAt || null),
         (this.updatedAt = topic.updatedAt || null),
         (this.isDeleted = topic.isDeleted || false),
         (this.deletedAt = topic.deletedAt || null);
   }

   static findTopics(key, value) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM topic where ' + key + ' = ?',
            value,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static findTopicsById(id) {
      return new Promise(function (resolve, reject) {
         connection.query('SELECT * FROM topic where id = ?', id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findOneAndUpdate(id, newTopic) {
      var values = [newTopic.topicName, newTopic.topicDescription, id];
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE topic set topic_name = ?, topic_description = ? where id = ?';
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async deleteOneById(id) {
      const deletedAt = getTimestamp();
      await Post.deletePosts(deletedAt, 'topic_id', id);
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE topic set is_deleted = 1, deleted_at = ? WHERE id = ?';
         connection.query(sql, [deletedAt, id], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   save(departmentId) {
      var values = [[departmentId, this.topicName, this.topicDescription]];
      return new Promise(function (resolve, reject) {
         const sql = 'INSERT INTO topic (department_id, topic_name, topic_description) VALUES ?';
         connection.query(sql, [values], async function (err, result, fields) {
            if (err) reject(err);
            else {
               const newTopic = await Topic.findTopicsById(result.insertId);
               resolve(newTopic);
            }
         });
      });
   }

   static async destroyOneById(id) {
      await Post.destroyPosts('topic_id', id);
      return new Promise(function (resolve, reject) {
         const sql = 'DELETE from topic where id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async restoreOneById(id) {
      await Post.restorePosts('topic_id', id);
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE topic set is_deleted = 0, deleted_at = null WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async destroyTopics(key, value) {
      const idList = (await Topic.findTopics(key, value)).map(a => a.id);
      return new Promise(async function (resolve, reject) {
         for (var i = 0; i < idList.length; ++i) {
            await Topic.destroyOneById(idList[i]);
         }
         resolve();
      });
   }
}

module.exports = Topic;
