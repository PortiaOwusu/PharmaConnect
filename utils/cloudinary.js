require("dotenv").config();

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    format: async (req, file) => {
      "jpg", "png", "jpeg";
    }, // supports promises as well
    public_id: (req, file) => {
      // console.log(
      // 	new Date().toISOString().replace(/:/g, '-') + file.originalname
      // );
      return new Date().toISOString().replace(/:/g, "-") + file.originalname;
    },
  },
});

exports.upload = multer({ storage: storage });
