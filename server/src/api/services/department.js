const connection = require("../../config/db.config");
const { getTime } = require('../helpers/support')

class Department {
  constructor(department) {
    (this.id = department.id || null),
    (this.departmentCode = department.departmentCode),
    (this.departmentName = department.departmentName),
    (this.isDeleted = department.isDeleted || false),
    (this.deletedAt = department.deletedAt || null)
  }
  
  static all() {
    return new Promise(function (resolve, reject) {
      connection.query("SELECT * FROM department", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  save() {
    var sql = "INSERT INTO document(department_code, department_name) VALUES ?";
    var values = [
      [this.departmentCode, this.departmentName]
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

  static findOneAndUpdate(id, newDepartment){
    var sql = "UPDATE department set department_code = ?, department_name = ? where id = ?";
    var values = [newDepartment.departmentCode, newDepartment.departmentName, id]
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
    var sql = "UPDATE department set is_deleted = 1, deleted_at = ? WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, id],
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static restoreOneById(id){
    const sql = "UPDATE department set is_deleted = 0, deleted_at = null WHERE " + key + " = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static destroyOneById(id) {
    var sql = "DELETE FROM department WHERE id = ?";
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

module.exports = Department