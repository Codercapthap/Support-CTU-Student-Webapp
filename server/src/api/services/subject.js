const connection = require("../../config/db.config");

class Subject {
  constructor(subject) {
    (this.id = subject.id || null),
      (this.departmentId = subject.departmentId),
      (this.subjectName = subject.subjectName),
      (this.subjectCode = subject.subjectCode)
  }

  static findSubjects(key, value) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM subject where " + key + " = ?",
        value,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static findOneAndUpdate(newSubject) {
    var sql =
      "UPDATE subject set department_id = ?, subject_name = ?, subject_code = ? where id = ?";
    var values = [newSubject.departmentId, newSubject.subjectName, newSubject.subjectCode, id];
    return new Promise(function (resolve, reject) {
      connection.query(sql, values, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static deleteOneById(id) {
    var sql = "DELETE FROM subject WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static all() {
    return new Promise(function (resolve, reject) {
      connection.query("SELECT * FROM subject", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  save() {
    var sql = "INSERT INTO subject(department_id, subject_name, subject_code) VALUES ?";
    var values = [
      [this.departmentId, this.subjectName, this.subjectCode]
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

module.exports = Subject;
