const connection = require('../../config/db.config');
const bcrypt = require('bcryptjs');
const { getTimestamp } = require('../helpers/support');
const Post = require('./post');
const Comment = require('./comment');
const Document = require('./document');
const UserDepartment = require('./userDepartment');
const UserSubject = require('./userSubject');

class User {
   constructor(user) {
      (this.username = user.username),
         (this.gender = user.gender),
         (this.birthday = user.birthday),
         (this.email = user.email),
         (this.password = user.password),
         (this.phone = user.phone),
         (this.role = user.role || 'user'),
         (this.avatarUrl =
            user.avatarUrl ||
            'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'),
         (this.address = user.address),
         (this.createdAt = user.createdAt || null),
         (this.updatedAt = user.updatedAt || null),
         (this.isDeleted = user.isDeleted || false),
         (this.deletedAt = user.deletedAt || null);
   }

   static all() {
      return new Promise(function (resolve, reject) {
         connection.query('SELECT * FROM user', function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findOne(key, value) {
      return new Promise(function (resolve, reject) {
         const sql = 'SELECT * FROM user where ' + key + ' = ? limit 1';
         connection.query(sql, value, function (err, result, fields) {
            if (err) reject(err);
            else if (result.length !== 0) resolve(result[0]);
            else resolve(null);
         });
      });
   }

   static findUsersByDepartmentId(id) {
      return new Promise(function (resolve, reject) {
         const sql =
            'select * from user where id in (select user_id from user_department where department_id = ?)';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   async save(departmentIdList) {
      try {
         // generate a salt
         const salt = await bcrypt.genSalt(10);
         // generate a password hash
         const passwordHashed = await bcrypt.hash(this.password, salt);
         // re-asign password hash
         this.password = passwordHashed;
      } catch (error) {
         reject(error);
      }
      var values = [
         [
            this.username,
            this.gender,
            this.birthday,
            this.email,
            this.password,
            this.phone,
            this.role,
            this.avatarUrl,
            this.address
         ]
      ];
      return new Promise(async function (resolve, reject) {
         // setup data
         const sql =
            'INSERT INTO user (username, gender, birthday, email, password, phone, role, avatar_url, address) VALUES ?';

         connection.query(sql, [values], async function (err, result, fields) {
            if (err) reject(err);
            else {
               // save user department
               departmentIdList.forEach(async departmentId => {
                  const newUserDepartment = new UserDepartment();
                  await newUserDepartment.save(result.insertId, departmentId);
               });

               // get new user and return
               const newUser = await User.findOne('id', result.insertId);
               resolve(newUser);
            }
         });
      });
   }

   static async deleteOneById(id) {
      const deletedAt = getTimestamp();
      // delete posts
      await Post.deletePosts(deletedAt, 'user_id', id);
      // delete comments
      await Comment.deleteComments(
         deletedAt,
         (await Comment.findComments('user_id', id)).map(a => a.id)
      );
      // delete document
      await Document.deleteDocuments(deletedAt, 'user_id', id);
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE user set is_deleted = 1, deleted_at = ? WHERE id = ?';
         connection.query(sql, [deletedAt, id], function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async restoreOneById(id) {
      // restore posts
      await Post.restorePosts('user_id', id);
      // restore comments
      await Comment.restoreComments((await Comment.findComments('user_id', id)).map(a => a.id));
      // restore document
      await Document.restoreDocuments('user_id', id);
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE user set is_deleted = 0, deleted_at = null WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async destroyOneById(id) {
      // delete user department
      await UserDepartment.destroyUserDepartments('user_id', id);
      // delete user subject
      await UserSubject.destroyUserSubjects('user_id', id);
      // delete posts
      await Post.destroyPosts('user_id', id);
      // delete comments
      await Comment.destroyComments((await Comment.findComments('user_id', id)).map(a => a.id));
      // delete document
      await Document.destroyDocuments('user_id', id);
      return new Promise(function (resolve, reject) {
         const sql = 'DELETE FROM user WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findOneAndUpdate(id, newUser, departmentIdList) {
      var values = [
         newUser.username,
         newUser.gender,
         newUser.birthday,
         newUser.email,
         newUser.phone,
         newUser.address,
         id
      ];
      return new Promise(function (resolve, reject) {
         const sql =
            'UPDATE user set username = ?, gender = ?, birthday = ?, email = ?, phone = ?, address = ? where id = ?';
         connection.query(sql, values, async function (err, result, fields) {
            if (err) reject(err);
            else {
               await UserDepartment.destroyUserDepartments('user_id', id);
               // save user department
               departmentIdList.forEach(async departmentId => {
                  const newUserDepartment = new UserDepartment();
                  await newUserDepartment.save(id, departmentId);
               });

               resolve(result);
            }
         });
      });
   }

   static updateAvatar(avatarURl, id) {
      var values = [avatarURl, id];
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE user set avatar_url = ? where id = ?';
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findOneAndUpdateUserRole(id, role) {
      var values = [role, id];
      return new Promise(function (resolve, reject) {
         const sql = 'UPDATE user set role = ? where id = ?';
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findOneAndUpdatePassword(id, password, oldPassword) {
      return new Promise(async function (resolve, reject) {
         // create a user to check old password
         var user = await User.findOne('id', id);
         user = new User(user);

         if (await user.isValidPassword(oldPassword)) {
            try {
               // generate a salt
               const salt = await bcrypt.genSalt(10);
               // generate a password hash
               const passwordHashed = await bcrypt.hash(password, salt);
               // re-asign password hash
               password = passwordHashed;
            } catch (error) {
               reject(error);
            }
            const sql = 'UPDATE user set password = ? where id = ?';
            var values = [password, id];

            connection.query(sql, values, function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            });
         } else {
            reject(new Error('invalid password'));
         }
      });
   }

   async isValidPassword(newPassword) {
      try {
         return await bcrypt.compare(newPassword, this.password);
      } catch (error) {
         return new Error(error.message);
      }
   }
}

module.exports = User;
