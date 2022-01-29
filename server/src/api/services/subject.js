const connection = require("../../config/db.config");
const SubjectComment = require("./subjectComment");
const UserSubject = require("./userSubject");

class Subject {
  constructor(subject) {
      (this.subjectName = subject.subjectName),
      (this.subjectCode = subject.subjectCode),
      (this.createdAt = subject.createdAt || null),
      (this.updatedAt = subject.updatedAt || null)
  }

  static findSubjects(key, value) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM subject where " + key + " = ?",
        value,
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result);
        }
      );
    });
  }

  static findSubjectById(id) {
    return new Promise(function (resolve, reject) {
      connection.query(
        "SELECT * FROM subject where id = ?",
        id,
        function (err, result, fields) {
          if (err) resolve(err);
          else resolve(result);
        }
      );
    });
  }

  static findOneAndUpdate(id, newSubject) {
    var sql =
      "UPDATE subject set subject_name = ?, subject_code = ? where id = ?";
    var values = [newSubject.subjectName, newSubject.subjectCode, id];
    return new Promise(function (resolve, reject) {
      connection.query(sql, values, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static async destroyOneById(id) {
    await SubjectComment.destroyComments(id)
    await UserSubject.destroyUserSubjects("subject_id", id)
    var sql = "DELETE FROM subject WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  static all() {
    return new Promise(function (resolve, reject) {
      connection.query("SELECT * FROM subject", function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }

  save(departmentId) {
    var sql = "INSERT INTO subject(department_id, subject_name, subject_code) VALUES ?";
    var values = [
      [departmentId, this.subjectName, this.subjectCode]
    ]
    return new Promise(function (resolve, reject) {
      connection.query(sql, [values],
        async function (err, result, fields) {
          if (err) resolve(err);
          else {
            const newSubject = await Subject.findSubjectById(result.insertId)
            resolve(newSubject);
          }
        }
      );
    });
  }

  static async destroySubjects(key, value) {
    const idList = (await Subject.findSubjects(key, value)).map((a) => a.id);
    return new Promise(async function (resolve, reject) {
      for (var i = 0; i < idList.length; ++i) {
        await Subject.destroyOneById(idList[i]);
      }
      resolve()
    });
  }
}

module.exports = Subject;
