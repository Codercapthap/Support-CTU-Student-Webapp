const Comment = require("../services/comment");

class commentController {
  async getAllCommentsOfPostId(req, res, next) {
    try {
      const comments = await Comment.findComments("post_id", req.params.id);
      return res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  }

  async getAllCommentsOfSubjectId(req, res, next) {
    try {
      const comments = await Comment.findComments("subject_id", req.params.id);
      return res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  }

  async createComment(req, res, next) {
    try {
      const { postId, subjectId, commentContent } = req.body;
      const userId = req.user.id;
      //save comment
      const newComment = new Comment({
        userId,
        postId,
        subjectId,
        commentContent,
      });
      newComment.id = (await newComment.save()).insertId;

      return res.status(200).json({ comment: newComment });
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

  deleteCommentById(req, res, next) {
    try {
      const id = req.params.id
      Comment.deleteOneById(id)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  destroyCommentById(req, res, next) {
    try {
      const id = req.params.id
      Comment.destroyOneById(id)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  restoreCommentById(req, res, next) {
    try {
      const id = req.params.id
      Comment.restoreOneById(id)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }
}

module.exports = new commentController();
