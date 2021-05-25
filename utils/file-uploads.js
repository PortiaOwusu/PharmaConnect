const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const acceptableFiles = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const name = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    const fileName = `${name}${ext}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!acceptableFiles.includes(file.mimetype)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    // Max Size 1MB
    fileSize: 1 * 1024 * 1024,
  },
});

module.exports = upload;
