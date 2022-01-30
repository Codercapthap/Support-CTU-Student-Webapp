const Comment = require("../services/comment");
const PostComment = require("../services/postComment");
const SubjectComment = require("../services/subjectComment");

class commentController {
  async getAllCommentsOfPostId(req, res, next) {
    try {
      const comments = await PostComment.findComments(req.params.id);
      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async getAllCommentsOfSubjectId(req, res, next) {
    try {
      const comments = await SubjectComment.findComments(req.params.id);
      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async createPostComment(req, res, next) {
    try {
      const { commentContent, postId } = req.body;
      const userId = req.user.id;
      //save comment
      var newPostComment = new PostComment({
        commentContent,
      });
      newPostComment = await newPostComment.save(userId, postId);

      return res.status(200).json(newPostComment);
    } catch (error) {
      next(error);
    }
  }

  async createSubjectComment(req, res, next) {
    try {
      const { commentContent, subjectId } = req.body;
      const userId = req.user.id;
      var newSubjectComment = new SubjectComment({
        commentContent,
      });
      newSubjectComment = await newSubjectComment.save(userId, subjectId);

      return res.status(200).json(newSubjectComment);
    } catch (error) {
      next(error);
    }
  }

  async updateCommentById(req, res, next) {
    try {
      const { id } = req.params;
      const newComment = req.body;
      const result = await Comment.findOneAndUpdate(id, newComment);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async deleteCommentById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Comment.deleteOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async destroyPostCommentById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await PostComment.destroyOneByCommentId(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async destroySubjectCommentById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await SubjectComment.destroyOneByCommentId(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async restoreCommentById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Comment.restoreOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new commentController();
