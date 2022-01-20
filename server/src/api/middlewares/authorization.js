const Comment = require('../services/comment')

const authRole = (permissions) => {
  return (req, res, next) => {
    if (!req.user) throw new Error("No user found");
    const userRole = req.user.role;
    if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

const authAccount = (permissions) => {
  return (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!req.user) throw new Error("No user found");
    const currentUserID = req.user.id;
    const userRole = req.user.role;
    if (id == currentUserID) {
      next();
    } else if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

const authComment = (permissions) => {
  return (req, res, next) => {
    const commentId = parseInt(req.params.id);
    if (!req.user) throw new Error("No user found");
    const currentUserID = req.user.id;
    const userRole = req.user.role;
    const comment = Comment.findOne("id", commentId);
    if (comment.userId == currentUserID) {
      next();
    } else if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

module.exports = {
  authRole,
  authAccount,
  authComment,
};
