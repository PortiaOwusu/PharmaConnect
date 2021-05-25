const express = require("express");
const router = express.Router();
const buyerController = require("../controller/buyerController");
const buyerAuthController = require("../controller/buyerAuthController");

router.route("/").get(buyerController.getAllBuyers);

router
  .route("/:id")
  .get(buyerController.getBuyer)
  .delete(buyerController.deleteBuyer);

router.route("/registeruser").post(buyerAuthController.signup);

router.route("/login").post(buyerAuthController.signin);

module.exports = router;
