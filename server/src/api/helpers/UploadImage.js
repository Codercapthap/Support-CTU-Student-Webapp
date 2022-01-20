const multer = require('multer');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/uploads');
   },
   filename: (req, file, cb) => {
      console.log('file upload multer: ', file);
      cb(null, `${file.originalname}`);
   }
});
const upload = multer({ storage: storage });

module.exports = upload;
