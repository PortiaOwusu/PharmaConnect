const Admin = require("../model/Admin");
const httpErrors = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidator,
  loginvalidator,
  loginValidator,
} = require("../utils/validation");

const signup = async (req, res) => {
  // const { fullName, email, password } = req.body;
  // if (!fullName || !email || !password) {
  //   res.status(400).send({ message: "Please enter all fields" });
  //   return;
  // }
  // check if all fields are available
  const result = await registerValidator.validateAsync(req.body);
  const { fullName, email, password } = result;

  //  check if email already exist
  const existAdmin = await Admin.findOne({ email });

  if (!email) {
    res.status(400).send({ message: "Admin already exist" });
    return;
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await Admin.create({
    fullName,
    email,
    password,
  });
  res.status(201).send({ admin });
};

const signin = async (req, res) => {
  // const { fullName, email, password } = req.body;
  // if (!fullName || !email || !password) {
  //   res.status(400).send({ message: "Please enter all fields" });
  //   return;
  // }

  const result = await loginValidator.validateAsync(req.body);
  const { email, password } = result;

  const existAdmin = await Admin.findOne({ email });
  if (!existAdmin) {
    res.status(400).send({ message: "Invalid Credentials" });
    return;
  }

  const admin = existAdmin;
  // res.status(201).send({ admin });

  // check for password
  const isMatch = await bcrypt.compare(password, buyer.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid Credentials" });
    return;
  }
  //  generate token
  const token = jwt.sign({ id: admin._id }, "secrete", {
    expiresIn: "3hr",
  });
  res.status(200).json({ token });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, "secrete");
    req.admin = decodedToken.id;
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
