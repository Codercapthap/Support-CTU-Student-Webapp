const connection = require("../../config/db.config");
const bcrypt = require('bcryptjs')
const { getTime } = require('../helpers/support')

class User {
  constructor(user) {
    (this.id = user.id || null),
    (this.username = user.username),
    (this.gender = user.gender),
    (this.birthday = user.birthday),
    (this.email = user.email),
    (this.password = user.password),
    (this.phone = user.phone),
    (this.role = user.role || "user"),
    (this.address = user.address),
    (this.isDeleted = user.isDeleted || false),
    (this.deletedAt = user.deletedAt || null)
  }

  static all() {
    return new Promise(function (resolve, reject) {
      connection.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  static findOne(key, value) {
    var sql = "SELECT * FROM user where " + key + " = ? limit 1";
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

  static findUsersByDepartmentId(id){
    var sql = "select * from user where id in (select user_id from user_department where department_id = ?)"
    return new Promise(function (resolve, reject) {
      connection.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        if (result.length !== 0) resolve(result)
        else resolve(null)
      })
    })
  }

  async save() {
    try {
      // generate a salt
      const salt = await bcrypt.genSalt(10)
      // generate a password hash
      const passwordHashed = await bcrypt.hash(this.password, salt)
      // re-asign password hash
      this.password = passwordHashed
    } catch (error) {
      throw new Error(error.message)
    }
    var sql = "INSERT INTO user (username, gender, birthday, email, password, phone, role, address) VALUES ?";
    var values = [
      [this.username, this.gender, this.birthday, this.email, this.password, this.phone, this.role, this.address]
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

  static deleteOneById(id) {
    const deletedAt = getTime()
    var sql = "UPDATE user set is_deleted = 1, deleted_at = ? WHERE id = ?";
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
    const sql = "UPDATE user set is_deleted = 0, deleted_at = null WHERE id = ?";
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
    var sql = "DELETE FROM user WHERE id = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, id,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }
  // check xem isDeleted, deletedAt nhu nay co dung k
  static findOneAndUpdate(id, newUser){
    var sql = "UPDATE user set username = ?, gender = ?, birthday = ?, email = ?, password = ?, phone = ?, role = ?, address = ? where id = ?";
    var values = [newUser.username, newUser.gender, newUser.birthday, newUser.email, newUser.password, newUser.phone, newUser.role, newUser.address, id]
    return new Promise(function (resolve, reject) {
      connection.query(sql, values,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  async isValidPassword(newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password)
    } catch(error) {
      throw new Error(error)
    }
  }
}

module.exports = User;
