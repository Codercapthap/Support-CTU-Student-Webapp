const connection = require('../../config/db.config');
const { getTime } = require('../helpers/support');
const Subject = require('./subject');
const Topic = require('./topic');
const UserSubject = require('./userSubject');
const Document = require('./document');
const UserDepartment = require('./userDepartment');

class Department {
   constructor(department) {
      (this.departmentCode = department.departmentCode),
         (this.departmentName = department.departmentName),
         (this.createdAt = department.createdAt || null),
         (this.updatedAt = department.updatedAt || null);
   }

   static all() {
      return new Promise(function (resolve, reject) {
         connection.query('SELECT * FROM department', function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static findDepartmentById(id) {
      return new Promise(function (resolve, reject) {
         connection.query(
            'SELECT * FROM department where id = ?',
            id,
            function (err, result, fields) {
               if (err) reject(err);
               else resolve(result);
            }
         );
      });
   }

   save() {
      var values = [[this.departmentCode, this.departmentName]];
      return new Promise(function (resolve, reject) {
         var sql = 'INSERT INTO department(department_code, department_name) VALUES ?';
         connection.query(sql, [values], async function (err, result, fields) {
            if (err) reject(err);
            else {
               const newDepartment = await Department.findDepartmentById(result.insertId);
               resolve(newDepartment);
            }
         });
      });
   }

   static findOneAndUpdate(id, newDepartment) {
      return new Promise(function (resolve, reject) {
         var sql = 'UPDATE department set department_code = ?, department_name = ? where id = ?';
         var values = [newDepartment.departmentCode, newDepartment.departmentName, id];
         connection.query(sql, values, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }

   static async destroyOneById(id) {
      // delete document
      await Document.destroyDocuments('department_id', id);
      // delete topic
      await Topic.destroyTopics('department_id', id);
      // delete user department
      await UserDepartment.destroyUserDepartments('department_id', id);
      // delete subject
      await Subject.destroySubjects('department_id', id);
      return new Promise(function (resolve, reject) {
         var sql = 'DELETE FROM department WHERE id = ?';
         connection.query(sql, id, function (err, result, fields) {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }
}

module.exports = Department;
