const connection = require("../../config/db.config");
const { getTime } = require("../helpers/support");

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
          "SELECT * FROM comment where id in ?",
          [[idList]],
          function (err, result, fields) {
            if (err) resolve(err);
            else resolve(result);
          }
        );
      }
      else resolve([])
    });
  }

  static findComments(key, value) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM comment where " + key + " = ?",
        value,
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result);
        }
      );
    });
  }

  static findCommentById(id) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM comment where id = ?",
        id,
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result[0]);
        }
      );
    });
  }

  save(userId) {
    var sql = "INSERT INTO comment (user_id, comment_content) VALUES ?";
    var values = [[userId, this.commentContent]];
    return new Promise(function (resolve, reject) {
      connection.query(sql, [values], async function (err, result, fields) {
        if (err) resolve(err);
        else {
          const newComment = await Comment.findCommentById(result.insertId)
          resolve(newComment)
        }
      });
    });
  }

  static findOneAndUpdate(id, newComment) {
    var sql = "UPDATE comment set comment_content = ? where id = ?";
    var values = [newComment.commentContent, id];
    return new Promise(function (resolve, reject) {
      connection.query(sql, values, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static deleteOneById(id) {
    const deletedAt = getTime();
    var sql = "UPDATE comment set is_deleted = 1, deleted_at = ? WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, id], function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static deleteComments(deletedAt, idList) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "UPDATE comment set is_deleted = 1, deleted_at = ? where id in ?",
        [deletedAt, [idList]], 
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result);
        }
      );
    });
  }

  static restoreOneById(id) {
    const sql =
      "UPDATE comment set is_deleted = 0, deleted_at = null WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static restoreComments(idList) {
    return new Promise(function (resolve, reject) {
      if (idList.length != 0) {
        connection.query(
          "UPDATE comment set is_deleted = 0, deleted_at = null where id in ?",
          [[idList]], 
          function (err, result, fields) {
            if (err) resolve(err);
            else resolve(result);
          }
        );
      }
      resolve([])
    });
  }

  static destroyOneById(id) {
    var sql = "DELETE FROM comment WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static destroyComments(idList) {
    return new Promise(function (resolve, reject) {
      if (idList.length != 0) {
        connection.query(
          "DELETE FROM subject_comment where comment_id in ?",
          [[idList]], 
          function (err, result, fields) {
            if (err) resolve(err);
          }
        );
        connection.query(
          "DELETE FROM comment where id in ?",
          [[idList]], 
          function (err, result, fields) {
            if (err) resolve(err);
            else resolve(result);
          }
        );
      }
      resolve([])
    });
  }
}

module.exports = Comment;
