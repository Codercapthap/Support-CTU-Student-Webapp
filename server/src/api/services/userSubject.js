const connection = require('../../config/db.config');
const { getTimestamp } = require('../helpers/support');

class UserSubject {
   constructor(userSubject = {}) {
      this.subjectScore = userSubject.subjectScore || null;
   }

   save(userId, subjectId) {
      var values = [[userId, subjectId, this.subjectScore]];
      return new Promise(function (resolve, reject) {
         const sql = 'INSERT INTO user_subject (user_id, subject_id, subject_score) VALUES ?';
         connection.query(sql, [values], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findOne(userId, subjectId) {
      var values = [userId, subjectId];
      return new Promise(function (resolve, reject) {
         const sql = 'select * from user_subject where user_id = ? and subject_id = ?';
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findOneAndUpdate(newScore, userId, subjectId) {
      var values = [newScore, userId, subjectId];
      return new Promise(function (resolve, reject) {
         const sql =
            'UPDATE user_subject set subject_score = ? where user_id = ? and subject_id = ?';
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static destroyUserSubjects(key, value) {
      return new Promise(function (resolve, reject) {
         const sql = 'DELETE FROM user_subject WHERE ' + key + ' = ?';
         connection.query(sql, value, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findUserSubjects(key, value) {
      return new Promise(function (resolve, reject) {
         const sql = 'SELECT * FROM user_subject WHERE ' + key + ' = ?';
         connection.query(sql, value, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static destroyOne(userId, subjectId) {
      return new Promise(function (resolve, reject) {
         const sql = 'DELETE FROM user_subject WHERE user_id = ? and subject_id = ?';
         connection.query(sql, [userId, subjectId], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }
}

module.exports = UserSubject;
