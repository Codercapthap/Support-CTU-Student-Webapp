const connection = require("../database");
const bcrypt = require('bcryptjs')
const { getTime } = require('../helper/support')

class User {
  constructor(user) {
    (this.userID = user.userID || null),
    (this.fullName = user.fullName),
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
    var sql = "INSERT INTO user (fullName, gender, birthday, email, password, phone, role, address, isDeleted) VALUES ?";
    var values = [
      [this.fullName, this.gender, this.birthday, this.email, this.password, this.phone, this.role, this.address, this.isDeleted]
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

  static deleteOneById(userID) {
    const deletedAt = getTime()
    var sql = "UPDATE user set isDeleted = 1, deletedAt = ? WHERE userID = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, [deletedAt, userID],
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static restoreOneById(userID){
    const sql = "UPDATE user set isDeleted = 0, deletedAt = null WHERE userID = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, userID,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static destroyOneById(userID) {
    var sql = "DELETE FROM user WHERE userID = ?";
    return new Promise(function (resolve, reject) {
      connection.query(sql, userID,
        function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        }
      );
    });
  }

  static findOneAndUpdate(value, newUser){
    var sql = "UPDATE user set fullName = ?, gender = ?, birthday = ?, email = ?, password = ?, phone = ?, role = ?, address = ?, isDeleted = ?, deletedAt = ? where userID = ?";
    var values = [newUser.fullName, newUser.gender, newUser.birthday, newUser.email, newUser.password, newUser.phone, newUser.role, newUser.address, newUser.isDeleted, newUser.deletedAt, value]
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
