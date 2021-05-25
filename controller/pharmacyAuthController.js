const Pharmacy = require("../model/Pharmacy");
const httpErrors = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  pharmacyRegisterValidator,
  pharmacyLoginValidator,
} = require("../utils/validation");

const signup = async (req, res) => {
  //   const {
  //     pharmacyName,
  //     email,
  //     password,
  //     registrationNumber,
  //     location,
  //   } = req.body;
  //   if (
  //     !pharmacyName ||
  //     !email ||
  //     !password ||
  //     !registrationNumber ||
  //     !location
  //   ) {
  //     res.status(400).send({ message: "Please enter all fields" });
  //     return;
  //  }

  //  check if all fields are avilable
  const result = await pharmacyRegisterValidator.validateAsync(req.body);
  const { pharmacyName, email, password, registrationNumber, location, role } =
    result;

  //  check if email already exist in database
  const existPharmacy = await Pharmacy.findOne({ registrationNumber });

  if (existPharmacy) {
    res.status(400).send({ message: "Pharmacy  already exist" });
    return;
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  const pharmacy = await Pharmacy.create({
    pharmacyName,
    email,
    password: hashedPassword,
    registrationNumber,
    location,
    role,
  });
  res.status(201).send({ pharmacy });
};

const signin = async (req, res) => {
  // const { pharmacyName, email, password, registrationNumber } = req.body;
  // if (!pharmacyName || !email || !password || registrationNumber) {
  //   res.status(400).send({ message: "Please enter all fields" });
  //   return;
  // }

  const result = await pharmacyLoginValidator.validateAsync(req.body);
  const { pharmacyName, password, registrationNumber } = result;

  const existPharmacy = await Pharmacy.findOne({ registrationNumber });
  if (!existPharmacy) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }

  const pharmacy = existPharmacy;
  // res.status(201).send({ pharmacy });

  // check for pasword
  const isMatch = await bcrypt.compare(password, pharmacy.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid Credentials" });
    return;
  }

  //  generate token
  const token = jwt.sign({ id: pharmacy._id }, "secrete", {
    expiresIn: "3hr",
  });
  res.status(200).json({ token, pharmacy });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, "secrete");
    req.Pharmacy = decodedToken.id;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = {
  signup,
  signin,
  verifyToken,
};
