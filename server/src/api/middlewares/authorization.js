const Comment = require("../services/comment");
const Post = require("../services/post");

// phân quyền theo role
const authRole = (permissions) => {
  return (req, res, next) => {
    if (!req.user) return next(new Error("No user found"));
    const userRole = req.user.role;
    if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

// phân quyền theo sở hữu tài khoản và role
const authAccount = (permissions) => {
  return (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!req.user) return next(new Error("No user found"));
    const currentUserId = req.user.id;
    const userRole = req.user.role;
    if (id == currentUserId) {
      next();
    } else if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

// phân quyền theo sở hữu comment và role
const authComment = (permissions) => {
  return async (req, res, next) => {
    const commentId = parseInt(req.params.id);
    if (!req.user) return next(new Error("No user found"));
    const currentUserId = req.user.id;
    const userRole = req.user.role;
    const comment = await Comment.findCommentById(commentId);
    if (!comment) return next(new Error("No comment found"));
    if (comment.user_id == currentUserId) {
      next();
    } else if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

// phân quyền theo sở hữu post và role
const authPost = (permissions) => {
  return (req, res, next) => {
    const postId = parseInt(req.params.id);
    if (!req.user) throw new Error("No user found");
    const currentUserId = req.user.id;
    const userRole = req.user.role;
    const post = Post.findPostById(postId);
    if (post.userId == currentUserId) {
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
  authPost,
};
