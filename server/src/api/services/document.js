const connection = require('../../config/db.config');
const { getTimestamp } = require('../helpers/support');

class Document {
   constructor(document) {
      (this.documentName = document.documentName),
         (this.documentUrl = document.documentUrl),
         (this.createdAt = document.createdAt || null),
         (this.updatedAt = document.updatedAt || null),
         (this.isDeleted = document.isDeleted || false),
         (this.deletedAt = document.deletedAt || null);
   }

   static findDocuments(key, value) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM document where ' + key + ' = ?',
            value,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static findDocumentById(id) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM document where id = ?',
            id,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   static findOneAndUpdate(newDocument, id) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE document set document_name = ?, document_url = ? where id = ?';
         var values = [newDocument.documentName, newDocument.documentUrl, id];
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static deleteOneById(id) {
      return new Promise(function (resolve, reject) {
         const deletedAt = getTimestamp();
         var sql = 'UPDATE document set is_deleted = 1, deleted_at = ? WHERE id = ?';
         connection.query(sql, [deletedAt, id], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static destroyOneById(id) {
      return new Promise(function (resolve, reject) {
         var sql = 'DELETE FROM document WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static restoreOneById(id) {
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE document set is_deleted = 0, deleted_at = null WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   save(userId, departmentId) {
      var values = [[userId, departmentId, this.documentName, this.documentUrl]];
      return new Promise(function (resolve, reject) {
         var sql =
            'INSERT INTO document (user_id, department_id, document_name, document_url) VALUES ?';
         connection.query(sql, [values], async function (err, result, fields) {
            if (err) reject(err);
            else {
               const newDocument = await Document.findDocumentById(result.insertId);
               resolve(newDocument);
            }
         });
      });
   }

   static deleteDocuments(deletedAt, key, value) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE document set is_deleted = 1, deleted_at = ? WHERE ' + key + ' = ?';
         connection.query(sql, [deletedAt, value], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static destroyDocuments(key, value) {
      return new Promise(function (resolve, reject) {
         var sql = 'DELETE FROM document WHERE ' + key + ' = ?';
         connection.query(sql, value, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static restoreDocuments(key, value) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE document set is_deleted = 0, deleted_at = null WHERE ' + key + ' = ?';
         connection.query(sql, value, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }
}

module.exports = Document;
