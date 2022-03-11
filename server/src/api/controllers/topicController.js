const Topic = require('../services/topic');

class topicController {
   async getAllTopicsOfDepartmentId(req, res, next) {
      try {
         const topics = await Topic.findTopics('department_id', req.params.id);
         return res.status(200).json(topics);
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
         const result = await Topic.deleteOneById(id);
         return res.status(200).json(result.affectedRows);
      } catch (err) {
         next(err);
      }
   }

   async createTopic(req, res, next) {
      try {
         const { departmentId, topicName, topicDescription } = req.body;
         //save topic
         var newTopic = new Topic({
            topicName,
            topicDescription
         });
         newTopic = await newTopic.save(departmentId);

         return res.status(200).json(newTopic);
      } catch (error) {
         next(error);
      }
   }

   async destroyTopicById(req, res, next) {
      try {
         const id = req.params.id;
         const result = await Topic.destroyOneById(id);
         return res.status(200).json(result.affectedRows);
      } catch (err) {
         next(err);
      }
   }

   async restoreTopicById(req, res, next) {
      try {
         const id = req.params.id;
         const result = await Topic.restoreOneById(id);
         return res.status(200).json(result.affectedRows);
      } catch (err) {
         next(err);
      }
   }
}

module.exports = new topicController();
