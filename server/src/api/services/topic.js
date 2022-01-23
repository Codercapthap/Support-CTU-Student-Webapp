const connection = require("../../config/db.config");
const { getTime } = require("../helpers/support");

class Topic {
  constructor(topic) {
    (this.id = topic.id || null),
      (this.departmentId = topic.departmentId),
      (this.topicName = topic.topicName),
      (this.topicDescription = topic.topicDescription),
      (this.isDeleted = topic.isDeleted || false),
      (this.deletedAt = topic.deletedAt || null);
  }

  static findTopics () {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM topic where " + key + " = ?",
        value,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static findOneAndUpdate (newTopic) {
    var sql = "UPDATE topic set topic_name = ?, topic_description = ? where id = ?";
    var values = [newTopic.topicName, newTopic.topicDescription, id]
    return new Promise(function (resolve, reject) {
      connection.query(sql, values,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static deleteOneById () {
    const deletedAt = getTime();
    var sql = "UPDATE topic set is_deleted = 1, deleted_at = ? WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, id], function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  save () {
    var sql = "INSERT INTO topic (department_id, topic_name, topic_description) VALUES ?";
    var values = [
      [this.userId, this.departmentId, this.topicName, this.topicDescription]
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

  static destroyOneById () {
    var sql = "DELETE FROM topic WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static restoreOneById () {
    const deletedAt = getTime();
    var sql = "UPDATE topic set is_deleted = 0, deleted_at = null WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, id], function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

}

module.exports = Topic;