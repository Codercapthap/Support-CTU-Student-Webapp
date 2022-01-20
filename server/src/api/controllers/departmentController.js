const Department = require("../services/department");

class departmentController {
  async getAllDepartments(req, res, next) {
    try {
      const departments = await Department.findDepartments();
      return res.status(200).json({ departments });
    } catch (error) {
      next(error);
    }
  }

  async createDepartment(req, res, next) {
    try {
      const { departmentCode, departmentName } = req.body;

      //save comment
      const newDepartment = new Department({
        departmentCode,
        departmentName,
      });
      newDepartment.id = (await newDepartment.save()).insertId;
      res.status(200).json({department: newDepartment})
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new departmentController();
