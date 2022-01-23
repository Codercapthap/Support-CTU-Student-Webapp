const connection = require("../../config/db.config");
const { getTime } = require("../helpers/support");

class Document {
  constructor(document) {
    (this.id = document.id || null),
      (this.userId = document.userId),
      (this.departmentId = document.departmentId),
      (this.documentName = document.documentName),
      (this.documentUrl = document.documentUrl),
      (this.isDeleted = document.isDeleted || false),
      (this.deletedAt = document.deletedAt || null);
  }

  static findDocuments(key, value) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM document where " + key + " = ?",
        value,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static findOneAndUpdate(newDocument, id) {
    var sql =
      "UPDATE document set document_name = ?, document_url = ? where id = ?";
    var values = [newDocument.documentName, newDocument.documentUrl, id];
    return new Promise(function (resolve, reject) {
      connection.query(sql, values, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static deleteOneById(id) {
    const deletedAt = getTime();
    var sql = "UPDATE document set is_deleted = 1, deleted_at = ? WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, id], function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static destroyOneById(id) {
    var sql = "DELETE FROM comment WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static restoreOneById(id) {
    const sql =
      "UPDATE document set is_deleted = 0, deleted_at = null WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  save() {
    var sql = "INSERT INTO document (user_id, department_id, document_name, document_url) VALUES ?";
    var values = [
      [this.userId, this.departmentId, this.documentName, this.documentUrl]
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
}

module.exports = Document;
