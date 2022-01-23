const Document = require("../services/document");

class documentController {
  async getAllDocumentsOfDepartmentId(req, res, next) {
    try {
      const documents = await Document.findDocuments("department_id", req.params.id);
      return res.status(200).json({ documents });
    } catch (error) {
      next(error);
    }
  }
  async getAllDocumentsOfUserId(req, res, next) {
    try {
      const documents = await Document.findDocuments("user_id", req.params.id);
      return res.status(200).json({ documents });
    } catch (error) {
      next(error);
    }
  }
  async updateDocumentById(req, res, next) {
    try {
      const { id } = req.params;
      const newDocument = req.body;
      const result = await Document.findOneAndUpdate(id, newDocument);
      return res.status(200).json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async deleteDocumentById(req, res, next) {
    try {
      const id = req.params.id
      Document.deleteOneById(id)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async destroyDocumentById(req, res, next) {
    try {
      const id = req.params.id
      Document.destroyOneById(id)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async restoreDocumentById(req, res, next) {
    try {
      const id = req.params.id
      Document.restoreOneById(id)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async createDocument(req, res, next) {
    try {
      const { departmentId, documentName, documentUrl } = req.body;
      const userId = req.user.id;
      //save document
      const newDocument = new Document({
        userId,
        departmentId,
        documentName,
        documentUrl,
      });
      newDocument.id = (await newDocument.save()).insertId;

      return res.status(200).json({ document: newDocument });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new documentController();
