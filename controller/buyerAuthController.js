const Buyer = require("../model/Buyer");
const httpErrors = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidator, loginValidator } = require("../utils/validation");

const signup = async (req, res) => {
  // const { fullName, email, password } = req.body;

  // if (!fullName || !email || !password) {
  //   res.status(400).send({ message: "Please enter all fields" });
  //   return;
  // }

  // check if all fields are available
  const result = await registerValidator.validateAsync(req.body);
  const { fullName, email, password } = result;

  // check if email already exist
  const existBuyer = await Buyer.findOne({ email });
  if (existBuyer) {
    res.status(400).send({ message: "User already exist" });
    return;
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  const buyer = await Buyer.create({
    fullName,
    email,
    password: hashedPassword,
  });
  res.status(201).send({ buyer });
};

const signin = async (req, res) => {
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   res.status(400).send({ message: "Please enter all fields" });
  //   return;
  // }

  const result = await loginValidator.validateAsync(req.body);
  const { fullName, password } = result;

  const existBuyer = await Buyer.findOne({ fullName });
  if (!existBuyer) {
    return res.status(400).send({ message: "Invalid Credentials" });
  }

  const buyer = existBuyer;
  // res.status(201).send({ buyer });

  const isMatch = await bcrypt.compare(password, buyer.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  //  generate token
  const token = jwt.sign({ id: buyer._id }, "secrete", {
    expiresIn: "3hr",
  });
  res.status(200).json({ token });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, "secrete");
    req.Buyer = decodedToken.id;
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
