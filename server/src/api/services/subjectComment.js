const connection = require("../../config/db.config");
const Comment = require("./comment");

class SubjectComment extends Comment {
  constructor(subjectComment) {
    super(subjectComment);
  }

  async save(userId, subjectId) {
    var comment = await super.save(userId);
    var values = [[comment.id, subjectId]];
    return new Promise(function (resolve, reject) {
      const sql =
        "INSERT INTO subject_comment (comment_id, subject_id) VALUES ?";
      connection.query(sql, [values], function (err, result, fields) {
        if (err) reject(err);
        else resolve(comment);
      });
    });
  }

  static async destroyOneByCommentId(id) {
    const sql = "DELETE FROM subject_comment WHERE comment_id = ?";
    connection.query(sql, id, function (err, result, fields) {
      if (err) reject(err);
    });
    return await super.destroyOneById(id);
  }

  static findCommentIds(id) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT comment_id FROM subject_comment where subject_id = ?",
        id,
        function (err, result, fields) {
          if (err) reject(err);
          else resolve(result.map((a) => a.comment_id));
        }
      );
    });
  }

  static async findComments(id) {
    var idList = await this.findCommentIds(id);
    return await super.findCommentsByIdList(idList);
  }

  static async destroyComments(id) {
    var idList = await SubjectComment.findCommentIds(id);
    connection.query(
      "DELETE FROM subject_comment where subject_id = ?",
      id,
      function (err, result, fields) {
        if (err) reject(err);
      }
    );
    return await super.destroyComments(idList);
  }
}

module.exports = SubjectComment;
