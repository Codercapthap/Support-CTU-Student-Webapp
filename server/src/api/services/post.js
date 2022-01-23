const connection = require("../../config/db.config");
const { getTime } = require("../helpers/support");

class Post {
  constructor(post) {
    (this.id = post.id || null),
      (this.userId = post.userId),
      (this.topicId = post.topicId),
      (this.postTitle = post.postTitle),
      (this.postView = post.postView || 0),
      (this.postContent = post.postContent),
      (this.isAccepted = post.isAccepted || false),
      (this.isDeleted = post.isDeleted || false),
      (this.deletedAt = post.deletedAt || null);
  }

  static all() {
    return new Promise(function (resolve, reject) {
      connection.query("SELECT * FROM post", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static save() {
    var sql =
      "INSERT INTO post(user_id, topic_id, post_title, post_view, post_content, is_accepted) VALUES ?";
    var values = [[this.userId, this.topicId, this.postTitle, this.postView, this.postContent, this.isAccepted]];
    return new Promise(function (resolve, reject) {
      connection.query(sql, [values], function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static findOne(key, value) {
    var sql = "SELECT * FROM post where " + key + " = ? limit 1";
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

  static findOneAndUpdate(newPost) {
    var sql = "UPDATE post set post_title = ?, post_content = ? where id = ?";
    var values = [newPost.postTitle, newPost.postContent]
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
    var sql = "UPDATE post set is_deleted = 1, deleted_at = ? WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, id],
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static findPosts(key, value) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM post where " + key + " = ?",
        value,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static destroyOneById(id) {
    var sql = "DELETE FROM post WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static restoreOneById(id) {
    var sql = "UPDATE post set is_deleted = 0, deleted_at = null WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static acceptPostById(id) {
    var sql = "UPDATE post set is_accepted = 1 WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }
}

module.exports = Post;
