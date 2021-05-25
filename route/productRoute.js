const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { verifyProduct } = require("../controller/pharmacyAuthController");
const { verifyToken } = require("../controller/adminAuthController");
const { upload } = require("../utils/cloudinary");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(verifyToken, upload.single("image"), productController.createProduct);

router.route("/get-product-by-pharmacy").get(
  verifyToken,

  productController.getProductsByPharmacy,
);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(verifyToken, productController.updateProduct)
  .delete(verifyToken, productController.deleteProduct);

module.exports = router;
