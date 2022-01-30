const Post = require("../services/post");

class postController {
  async getAllPosts(req, res, next) {
    try {
      const posts = await Post.all();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const { topicId, postTitle, postContent } = req.body;
      const userId = req.user.id;
      //save post
      var newPost = new Post({
        postTitle,
        postContent,
      });
      newPost = await newPost.save(userId, topicId);

      return res.status(200).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      // + view for post
      await Post.upPostViewById(req.params.id);
      const posts = await Post.findPostById(req.params.id);
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async updatePostById(req, res, next) {
    try {
      const { id } = req.params;
      const newPost = req.body;
      const result = await Post.findOneAndUpdate(id, newPost);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async deletePostById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Post.deleteOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async getAllPostsOfUserId(req, res, next) {
    try {
      const posts = await Post.findPosts("user_id", req.params.id);
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getAllPostsOfTopicId(req, res, next) {
    try {
      const posts = await Post.findPosts("topic_id", req.params.id);
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getAllPostsOfDepartmentId(req, res, next) {
    try {
      const posts = await Post.findPostsByDepartmentId(req.params.id);
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async destroyPostById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Post.destroyOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async restorePostById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Post.restoreOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async acceptPostById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Post.acceptPostById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async getAllAcceptedPosts(req, res, next) {
    try {
      const posts = await Post.getAcceptedPosts();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getAllUnAcceptedPosts(req, res, next) {
    try {
      const posts = await Post.getUnAcceptedPosts();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new postController();
