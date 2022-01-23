const Topic = require("../services/topic");

class topicController {
  async getAllTopicsOfDepartmentId(req, res, next) {
    try {
      const topics = await Topic.findTopics("department_id", req.params.id);
      return res.status(200).json({ topics });
    } catch (error) {
      next(error);
    }
  }

  async updateTopicById(req, res, next) {
    try {
      const { id } = req.params;
      const newTopic = req.body;
      const result = await Topic.findOneAndUpdate(id, newTopic);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async deleteTopicById(req, res, next) {
    try {
      const id = req.params.id;
      Topic.deleteOneById(id);
      // delete post on topic
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async createTopic(req, res, next) {
    try {
      const { departmentId, topicName, topicDescription } = req.body;
      //save topic
      const newTopic = new Topic({
        departmentId,
        topicName,
        topicDescription,
      });
      newTopic.id = (await newTopic.save()).insertId;

      return res.status(200).json({ topic: newTopic });
    } catch (error) {
      next(error);
    }
  }

  async destroyTopicById(req, res, next) {
    try {
      const id = req.params.id;
      Topic.destroyOneById(id);
      // delete post on topic
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async restoreTopicById(req, res, next) {
    try {
      const id = req.params.id;
      Topic.restoreOneById(id);
      // restore post on topic
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new topicController();
