const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { errorMessages } = require("../utils/constants");
const { UNAUTHORIZED_CODE } = require("../utils/constants");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_CODE)
      .send({ message: errorMessages.UNAUTHORIZED });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(UNAUTHORIZED_CODE)
      .send({ message: errorMessages.UNAUTHORIZED });
  }
  req.user = payload;

  return next();
};

module.exports = authMiddleware;
