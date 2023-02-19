const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.path);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
