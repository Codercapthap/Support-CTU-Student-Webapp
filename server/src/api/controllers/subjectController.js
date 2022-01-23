const Subject = require("../services/subject");

class subjectController {
  async getAllSubjectsOfDepartmentId (req, res, next) {
    try {
      const subjects = await Subject.findSubjects("department_id", req.params.id);
      return res.status(200).json({ subjects });
    } catch (error) {
      next(error);
    }
  }

  async updateSubjectById (req, res, next) {
    try {
      const { id } = req.params;
      const newSubject = req.body;
      const result = await Subject.findOneAndUpdate(id, newSubject);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async deleteSubjectById (req, res, next) {
    try {
      const id = req.params.id
      Subject.deleteOneById(id)
      // delete comment + delete detail_user
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async getAllSubjects (req, res, next) {
    try {
      const subjects = await Subject.all();
      return res.status(200).json({ subjects });
    } catch (error) {
      next(error);
    }
  }

  async createSubject (req, res, next) {
    try {
      const { departmentId, subjectName, subjectCode } = req.body;
      //save subject
      const newSubject = new Subject({
        departmentId,
        subjectName,
        subjectCode,
      });
      newSubject.id = (await newSubject.save()).insertId;

      return res.status(200).json({ subject: newSubject });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new subjectController();

