const connection = require("../../config/db.config");
const { getTime } = require('../helpers/support')

class Comment {
  constructor(comment) {
    (this.id = comment.id || null),
    (this.userId = comment.userId || null),
    (this.postId = comment.postId || null),
    (this.subjectId = comment.subjectId || null),
    (this.commentContent = comment.commentContent),
    (this.isDeleted = comment.isDeleted || false),
    (this.deletedAt = comment.deletedAt || null)
  }
  
  static findComments(key, value) {
    return new Promise(function (resolve, reject) {
      connection.query("SELECT * FROM comment where " + key + " = ?", value, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static findOne(key, value) {
    var sql = "SELECT * FROM user where " + key + " = ? limit 1";
    return new Promise(function (resolve, reject) {
      connection.query(sql, value,
        function (err, result, fields) {
          if (err) throw err;
          if (result.length !== 0)
            resolve(result);
          else resolve(null)
        }
      );
    });
  }

  async save() {
    var sql = "INSERT INTO comment (user_id, post_id, subject_id, comment_content) VALUES ?";
    var values = [
      [this.userId, this.postId, this.subjectId, this.commentContent]
    ]
    return new Promise(function (resolve, reject) {
      connection.query(sql, [values],
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static findOneAndUpdate(id, newComment){
    var sql = "UPDATE comment set comment_content = ? where id = ?";
    var values = [newComment.commentContent, id]
    return new Promise(function (resolve, reject) {
      connection.query(sql, values,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static deleteOneById(id) {
    const deletedAt = getTime()
    var sql = "UPDATE comment set is_deleted = 1, deleted_at = ? WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, id],
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static deleteComments(key, value) {
    const deletedAt = getTime()
    var sql = "UPDATE comment set is_deleted = 1, deleted_at = ? WHERE " + key + " = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, value],
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static restoreComments(key, value){
    const sql = "UPDATE comment set is_deleted = 0, deleted_at = null WHERE " + key + " = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, value,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static destroyOneById(id) {
    var sql = "DELETE FROM comment WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static destroyComments(key, value) {
    const deletedAt = getTime()
    var sql = "DELETE FROM comment where " + key + " = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, value,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }
}

module.exports = Comment;
