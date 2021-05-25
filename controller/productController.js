const Pharmacy = require("../model/Pharmacy");
const Product = require("../model/Product");
const {
  updateProductValidator,
  createProductValidator,
} = require("../utils/validation");
// const { upload } = require("../utils/cloudinary");
const {} = require("../utils/file-uploads");
const multer = require("multer");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByPharmacy = async (req, res) => {
  try {
    const products = await Product.find({ pharmacyId: req.admin });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).send({ message: "This product could not be found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  // console.log(req.body);
  try {
    // validate the input
    // const result = await createProductValidator.validateAsync(req.body);
    // console.log(result);

    // get the pharmacy
    const pharmacy = await Pharmacy.findById(req.admin);

    // check if pharmacy exists
    if (!pharmacy) {
      throw new Error("Pharmacy does not exists.");
    }
    console.log(req.body);
    // create the product
    const product = await Product.create({
      pharmacyId: req.admin,
      ...req.body,
    });

    // add product to the pharmacy
    pharmacy.products.push(product._id);
    await pharmacy.save();

    res.status(201).send({ product });
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  console.log(req.body);
  try {
    const result = await updateProductValidator.validateAsync(req.body);
    let product = await Product.findById(req.params.id);
    const pharmacy = await Pharmacy.findById(req.admin);

    if (!product) {
      throw new Error("Product does not exists.");
    }

    // check if pharmacy exists
    if (!pharmacy) {
      throw new Error("Pharmacy does not exists.");
    }

    if (!product.pharmacyId.equals(pharmacy._id)) {
      throw new Error("You are not permitted to perform this operation.");
    }

    product = await Product.findByIdAndUpdate(id, result, {
      new: true,
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const pharmacy = await Pharmacy.findById(req.admin);

    // check if product exists
    if (!product) {
      throw new Error("Product does not exists.");
    }

    // check if pharmacy exists
    if (!pharmacy) {
      throw new Error("Pharmacy does not exists.");
    }

    if (!product.pharmacyId.equals(pharmacy._id)) {
      throw new Error("You are not permitted to perform this operation.");
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
