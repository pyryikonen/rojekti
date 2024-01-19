const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateAuthToken = (userId, username, role) => {
  const payload = {
    id: userId,
    username,
    role,
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = { hashPassword, generateAuthToken, verifyAuthToken };
