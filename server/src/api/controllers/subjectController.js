const Subject = require('../services/subject');

class subjectController {
   async getAllSubjectsOfDepartmentId(req, res, next) {
      try {
         const subjects = await Subject.findSubjects('department_id', req.params.id);
         return res.status(200).json(subjects);
      } catch (error) {
         next(error);
      }
   }

   async updateSubjectById(req, res, next) {
      try {
         const { id } = req.params;
         const newSubject = req.body;
         const result = await Subject.findOneAndUpdate(id, newSubject);
         return res.status(200).json(result.affectedRows);
      } catch (err) {
         next(err);
      }
   }

   async deleteSubjectById(req, res, next) {
      try {
         const id = req.params.id;
         const result = await Subject.destroyOneById(id);
         return res.status(200).json(result.affectedRows);
      } catch (err) {
         next(err);
      }
   }

   async getAllSubjects(req, res, next) {
      try {
         const subjects = await Subject.all();
         return res.status(200).json(subjects);
      } catch (error) {
         next(error);
      }
   }

   async createSubject(req, res, next) {
      try {
         const { departmentId, subjectName, subjectCode } = req.body;
         //save subject
         var newSubject = new Subject({
            subjectName,
            subjectCode
         });
         newSubject = await newSubject.save(departmentId);

         return res.status(200).json(newSubject);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new subjectController();
