const connection = require("../../config/db.config");
const { getTime } = require("../helpers/support");

class UserSubject {
  constructor(userSubject = {}) {
      (this.subjectScore = userSubject.subjectScore || null)
  }

  save(userId, subjectId) {
    var sql = "INSERT INTO user_subject (user_id, subject_id, subject_score) VALUES ?";
    var values = [
      [userId, subjectId, this.subjectScore]
    ]
    return new Promise(function (resolve, reject) {
      connection.query(sql, [values],
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result.affectedRows)
        }
      );
    });
  }

  static findOne(userId, subjectId){
    var sql = "select * from user_subject where user_id = ? and subject_id = ?";
    var values = [userId, subjectId]
    return new Promise(function (resolve, reject) {
      connection.query(sql, values,
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result);
        }
      );
    });
  }

  static findOneAndUpdate(newScore, userId, subjectId){
    var sql = "UPDATE user_subject set subject_score = ? where user_id = ? and subject_id = ?";
    var values = [newScore, userId, subjectId]
    return new Promise(function (resolve, reject) {
      connection.query(sql, values,
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result);
        }
      );
    });
  }

  static destroyUserSubjects (key, value) {
    var sql = "DELETE FROM user_subject WHERE " + key + " = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, value, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static findUserSubjects (key, value) {
    var sql = "SELECT * FROM user_subject WHERE " + key + " = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, value, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static destroyOne(userId, subjectId) {
    var sql = "DELETE FROM user_subject WHERE user_id = ? and subject_id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [userId, subjectId], function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }
}

module.exports = UserSubject;