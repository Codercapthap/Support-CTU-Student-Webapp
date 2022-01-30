const Document = require("../services/document");

class documentController {
  async getAllDocumentsOfDepartmentId(req, res, next) {
    try {
      const documents = await Document.findDocuments(
        "department_id",
        req.params.id
      );
      return res.status(200).json(documents);
    } catch (error) {
      next(error);
    }
  }
  async getAllDocumentsOfUserId(req, res, next) {
    try {
      const documents = await Document.findDocuments("user_id", req.params.id);
      return res.status(200).json(documents);
    } catch (error) {
      next(error);
    }
  }
  async updateDocumentById(req, res, next) {
    try {
      const { id } = req.params;
      const newDocument = req.body;
      const result = await Document.findOneAndUpdate(newDocument, id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async deleteDocumentById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Document.deleteOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async destroyDocumentById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Document.destroyOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async restoreDocumentById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Document.restoreOneById(id);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async createDocument(req, res, next) {
    try {
      const { departmentId, documentName, documentUrl } = req.body;
      const userId = req.user.id;
      //save document
      var newDocument = new Document({
        documentName,
        documentUrl,
      });
      newDocument = await newDocument.save(userId, departmentId);

      return res.status(200).json(newDocument);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new documentController();
