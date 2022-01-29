const UserSubject = require("../services/userSubject");

class userSubjectController {
  async getAllUserSubjectsOfUserId(req, res, next) {
    try {
      const userSubjects = await UserSubject.findUserSubjects(
        "user_id",
        req.params.id
      );
      return res.status(200).json({ userSubjects });
    } catch (error) {
      next(error);
    }
  }

  async getAllUserSubjectsOfSubjectId(req, res, next) {
    try {
      const userSubjects = await UserSubject.findUserSubjects(
        "subject_id",
        req.params.id
      );
      return res.status(200).json({ userSubjects });
    } catch (error) {
      next(error);
    }
  }

  async updateUserSubjectById(req, res, next) {
    try {
      const userId = req.user.id;
      const subjectScore = req.body.subjectScore;
      const subjectId = req.params.id
      const result = await UserSubject.findOneAndUpdate(subjectScore, userId, subjectId);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async destroyUserSubject(req, res, next) {
    try {
      const userId = req.user.id;
      const subjectId = req.params.id;
      UserSubject.destroyOne(userId, subjectId);
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async createUserSubject(req, res, next) {
    try {
      const { subjectId, subjectScore } = req.body;
      const userId = req.user.id;
      //save userSubject
      var newUserSubject = new UserSubject({
        subjectScore,
      });
      newUserSubject = await newUserSubject.save(userId, subjectId);
      return res.status(200).json(newUserSubject);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new userSubjectController();
