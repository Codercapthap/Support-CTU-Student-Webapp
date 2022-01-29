const Department = require("../services/department");
const Topic = require('../services/topic')
const UserDepartment = require('../services/userDepartment')
const Document = require('../services/document')

class departmentController {
  async getAllDepartments(req, res, next) {
    try {
      const departments = await Department.all();
      return res.status(200).json({ departments });
    } catch (error) {
      next(error);
    }
  }

  async createDepartment(req, res, next) {
    try {
      const { departmentCode, departmentName } = req.body;

      //save department
      var newDepartment = new Department({
        departmentCode,
        departmentName,
      });
      newDepartment = await newDepartment.save();
      res.status(200).json({department: newDepartment})
    } catch (error) {
      next(error);
    }
  }

  async updateDepartment (req, res, next) {
    try {
      const { id } = req.params;
      const newDepartment = req.body;
      const result = await Department.findOneAndUpdate(id, newDepartment);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async destroyDepartment (req, res, next) {
    try {
      const id = req.params.id
      Department.destroyOneById(id)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }
}

module.exports = new departmentController();
