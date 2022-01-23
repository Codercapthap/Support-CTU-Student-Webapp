const Post = require("../services/post");

class postController {
  async getAllPosts(req, res, next) {
    try {
      const posts = await Post.all()
      return res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const { topicId, postTitle, postContent } = req.body;
      const userId = req.user.id;
      //save post
      const newPost = new Post({
        userId,
        topicId,
        postTitle,
        postContent
      });
      newPost.id = (await newPost.save()).insertId;

      return res.status(200).json({ post: newPost });
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      const posts = await Post.findOne("id", req.params.id);
      // + view for post
      return res.status(200).json({ posts });
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
      const id = req.params.id
      Post.deleteOneById(id)
      // delete comment of post
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async getAllPostsOfUserId(req, res, next) {
    try {
      const posts = await Post.findPosts(
        "user_id",
        req.params.id
      );
      return res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  async getAllPostsOfTopicId(req, res, next) {
    try {
      const posts = await Post.findPosts(
        "topic_id",
        req.params.id
      );
      return res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  async getAllPostsOfDepartmentId(req, res, next) {
    try {
      const posts = await Post.findPosts(
        "department_id",
        req.params.id
      );
      return res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  async destroyPostById(req, res, next) {
    try {
      const id = req.params.id
      Post.destroyOneById(id)
      // delete comment of post
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async restorePostById(req, res, next) {
    try {
      const id = req.params.id
      Post.restoreOneById(id)
      // restore comment of post
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async acceptPostById (req, res, next) {
    try {
      const id = req.params.id
      Post.acceptPostById(id)
      return res.status(200).json({ success: true })
    } catch(err) { next(err) }
  }
}

module.exports = new postController();
