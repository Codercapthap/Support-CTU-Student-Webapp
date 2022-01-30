const connection = require("../../config/db.config");
const { getTime } = require("../helpers/support");

class UserDepartment {
  save(userId, departmentId) {
    var values = [[userId, departmentId]];
    return new Promise(function (resolve, reject) {
      const sql =
        "INSERT INTO user_department (user_id, department_id) VALUES ?";
      connection.query(sql, [values], async function (err, result, fields) {
        if (err) resolve(err);
        else resolve();
      });
    });
  }

  static destroyUserDepartments(key, value) {
    return new Promise(function (resolve, reject) {
      const sql = "DELETE FROM user_department WHERE " + key + " = ?";
      connection.query(sql, value, function (err, result, fields) {
        if (err) resolve(err);
        else resolve(result);
      });
    });
  }
}

module.exports = UserDepartment;
